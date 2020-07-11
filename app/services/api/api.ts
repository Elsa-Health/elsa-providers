import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import { trackSymptoms } from "../../common/dangerSigns"

interface Location {
    address: string
    lat: number
    lng: number
}

/**
 * Manages all requests to the API.
 */
export class Api {
    /**
     * The underlying apisauce instance which performs the requests.
     */
    apisauce: ApisauceInstance

    /**
     * Configurable options.
     */
    config: ApiConfig

    /**
     * Creates the api.
     *
     * @param config The configuration to use.
     */
    constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
        this.config = config
    }

    /**
     * Sets up the API.  This will be called during the bootup
     * sequence and will happen before the first React component
     * is mounted.
     *
     * Be as quick as possible in here.
     */
    setup() {
        // construct the apisauce instance
        this.apisauce = create({
            baseURL: this.config.url,
            timeout: this.config.timeout,
            headers: {
                Accept: "application/json",
            },
        })
    }

    /**
     * persist a patients assesment
     */
    storeAssesmentInDB(assesment): Promise<any> {
        return firestore()
            .collection("assesments")
            .add(assesment)
    }

    /**
     * make a referral for a patient
     */
    sendPhoneAuthCode(telephone): Promise<any> {
        return auth().signInWithPhoneNumber(telephone)
    }

    /**
     *
     * register patient to daily follow ups
     */
    // FIXME: Ensure that this function does not run if a patient is already in follow up
    registerToFollowUps(
        telephone: string,
        location: Location,
        yearOfBirth: number,
        symptoms: { [symptom: string]: any } | null,
    ): Promise<any> {
        const date = new Date().getTime()
        const userId = auth().currentUser?.uid
        const serverTime = firestore.FieldValue.serverTimestamp()
        const followUpRef = firestore()
            .collection("follow-ups")
            .doc()
        const progressRef = firestore()
            .collection("follow-ups")
            .doc(followUpRef.id)
            .collection("progression")
            .doc()

        const batch = firestore().batch()

        //  create new follow up
        batch.set(followUpRef, {
            service: "providers-tool",
            userId: userId,
            symptoms: trackSymptoms,
            completed: false,
            createdAt: serverTime,
            updatedAt: serverTime,
            timeStamp: date,
            telephone,
        })

        if (symptoms !== null) {
            // insert the first progress report
            batch.set(progressRef, {
                evidence: { ...symptoms },
                createdAt: serverTime,
                timeStamp: date,
            })
        }

        return batch.commit()
    }

    /**
     * make a referral for a patient
     */
    referrPatient(referral): Promise<any> {
        const userId = auth().currentUser?.uid
        const serverTime = firestore.FieldValue.serverTimestamp()
        // make the api call
        return firestore()
            .collection("appointments")
            .add({ ...referral, userId, serverTime })
    }

    /**
     * send the current evidence and return diagnoses
     */
    async predictDiagnoses(symptoms = {}): Promise<Types.GetSymptomAssessment> {
        // make the api call
        const response: ApiResponse<any> = await this.apisauce.post(`/predict-condition`, symptoms)

        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        try {
            const result: Types.SymptomAssessment = response.data
            return { kind: "ok", assessment: result }
        } catch {
            return { kind: "bad-data" }
        }
    }

    /**
     * Gets a list of users.
     */
    async getUsers(): Promise<Types.GetUsersResult> {
        // make the api call
        const response: ApiResponse<any> = await this.apisauce.get(`/users`)

        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        const convertUser = raw => {
            return {
                id: raw.id,
                name: raw.name,
            }
        }

        // transform the data into the format we are expecting
        try {
            const rawUsers = response.data
            const resultUsers: Types.User[] = rawUsers.map(convertUser)
            return { kind: "ok", users: resultUsers }
        } catch {
            return { kind: "bad-data" }
        }
    }

    /**
     * Gets a single user by ID
     */

    async getUser(id: string): Promise<Types.GetUserResult> {
        // make the api call
        const response: ApiResponse<any> = await this.apisauce.get(`/users/${id}`)

        // the typical ways to die when calling an api
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        // transform the data into the format we are expecting
        try {
            const resultUser: Types.User = {
                id: response.data.id,
                name: response.data.name,
            }
            return { kind: "ok", user: resultUser }
        } catch {
            return { kind: "bad-data" }
        }
    }
}
