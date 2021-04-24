/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import _ from "lodash"
import * as Types from "./api.types"
import firestore from "@react-native-firebase/firestore"
import auth, { firebase } from "@react-native-firebase/auth"
import { trackSymptoms } from "../../common/dangerSigns"
import { CTCVisit, AdherenceAudit, CTCPatientFile, Appointment } from "../../models/ctc-store"
import Axios from "axios"
import ElsaDB from "../../models/db"
import { shallowTypeCoerce } from "../../common/utils"
import { logitRegressor, normal } from "bayesian-logistic-regressor"

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
        return firestore().collection("assesments").add(assesment)
    }

    /**
     * make a referral for a patient
     */
    sendPhoneAuthCode(telephone): Promise<any> {
        return auth().signInWithPhoneNumber(telephone)
    }

    /**
     * HIV/AIDS SPECIFIC API CALLS
     */

    /**
     * make a referral for a patient
     */
    // FIXME: move the request for this calculation to actually use this API and do this calculation locally while offline
    requestHIVSymptomAssessment(visit: CTCVisit): any | Promise<any> {
        return _.sortBy(
            [
                {
                    diag: "Cryptococcal Meningitis",
                    p: (Math.random() * 100).toFixed(2),
                    name: "Cryptococcal Meningitis",
                },
                {
                    diag: "Toxoplasmosis",
                    p: (Math.random() * 100).toFixed(2),
                    name: "Toxoplasmosis",
                },
                {
                    diag: "Pneumocystis Pneumonia",
                    p: (Math.random() * 100).toFixed(2),
                    name: "Pneumocystis Pneumonia",
                },
                {
                    diag: "Hepatitis B",
                    p: (Math.random() * 100).toFixed(2),
                    name: "Hepatitis B",
                },
                {
                    diag: "Tuberculosis",
                    p: (Math.random() * 100).toFixed(2),
                    name: "Tuberculosis",
                },
            ],
            ["p"],
        ).reverse()
    }

    /**
     * Get the Adherence Score/Audit for a patient
     */
    storeCTCPatientVisit(
        patientId: string,
        visit: CTCVisit,
        diagnoses: { [key: string]: any }[],
        attendanceFacility: string,
    ): Promise<any> {
        const serverTime = firestore.FieldValue.serverTimestamp()
        return firebase
            .firestore()
            .collection("ctc-patient-files")
            .doc(patientId)
            .collection("visits")
            .add({
                ...visit,
                diagnoses,
                attendanceFacility,
                createdAt: serverTime,
                updatedAt: serverTime,
            })
    }

    /**
     * Get the Adherence Score/Audit for a patient (local)
     */
    storeLocalCTCPatientVisit(
        patientId: string,
        code: string,
        visit: CTCVisit,
        diagnoses: { [key: string]: any }[],
        attendanceFacility: string,
    ): CTCVisit {
        const serverTime = new Date()
        const { CTCVisits } = ElsaDB

        const ptVisit = {
            ...visit,
            code,
            patientId,
            attendanceFacility,
            diagnoses,
            height: Number(visit.height),
            weight: Number(visit.weight),
            deliveryDate: visit.deliveryDate || undefined,
            absentSymptoms: [],
            createdAt: serverTime,
            updatedAt: serverTime,
        }

        // Coerce all numbers to be of type number
        const ptVisitNumbers = shallowTypeCoerce(
            ptVisit,
            ["systolic", "diastolic", "height", "weight"],
            "number",
        )
        // Coerce all booleans to be of type boolean
        const ptVisitBooleans = shallowTypeCoerce(
            ptVisitNumbers,
            ["isTransiting", "pregnant", "currentARTUse", "additionalMedication", "newSymptoms"],
            "boolean",
        )

        console.log("Visit: ", _.keys(ptVisitBooleans), JSON.stringify(ptVisitBooleans, null, 2))

        return CTCVisits.insert({ ...ptVisitBooleans, data: JSON.stringify(ptVisitBooleans) })[0]

        // return CTCVisits.insert({
        //     dateOfVisit: new Date(),
        //     clinicalStage: "",
        //     CTCNumber: "",
        //     attendanceFacility: "",
        //     visitType: "medication",
        //     isTransiting: false,
        //     pregnant: false,
        //     systolic: 0,
        //     diastolic: 0,
        //     ARTCombination: "ARV Combination Program",
        //     functionalStage: "working",
        //     conditions: [],
        //     currentARTUse: false,
        //     additionalMedication: false,
        //     coMedications: [],
        //     presentingSymptoms: [],
        //     investigationsOrdered: [],
        //     newSymptoms: false,
        //     dispensedMedications: [],
        //     ARTDecision: "",
        //     ARTDecisionReason: "",
        //     counseling: [],
        //     presentSymptoms: [],
        //     code: "GH90-48244BDQ26",
        //     patientId: "5fa0a243ZkHtRftO000CdV3g",
        //     diagnoses: [],
        //     height: 0,
        //     weight: 0,
        //     absentSymptoms: [],
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // })[0]
    }

    /**
     * Get the Adherence Score/Audit for a patient
     */
    async requestHIVAdherenceAudit(
        adherenceAudit: AdherenceAudit,
        age: number,
        sex: "male" | "female",
    ): any | Promise<any> {
        const educationLevels = [
            "no-education",
            "primary-school",
            "secondary-school",
            "higher-education",
        ]
        // format into something the server is requireing
        const body = {
            occupation: adherenceAudit.employed ? 2 : 0,
            age: age,
            share_drugs: Number(adherenceAudit.shareDrugs),
            side_effect: Number(adherenceAudit.sideEffects),
            understand_reg: adherenceAudit.understandRegimen ? 0 : 1, // this is an opposite thing in the server
            edu_lev: educationLevels.findIndex((ed) => ed === adherenceAudit.education),
            sex: sex === "male" ? 1 : 0,
            alc_drinks: Number(adherenceAudit.frequentAlcoholUse),
        }

        try {
            const result = await Axios.post(
                "https://elsa-models-api.herokuapp.com/adherence-score",
                {
                    ...body,
                },
            )
            // console.warn("RESULST: ", result.data.mapping)
            return result.data.mapping
        } catch (error) {
            console.warn("ERROR: ", error)
            return {}
        }

        // const riskData = [0, 0, 0, 0, 0, 0, 2, 80, 0, 5, 2]
        // return { data: riskData, mean: _.mean(riskData) / 10 }
    }

    requestLocalHIVAdherenceAudit(
        adherenceAudit: AdherenceAudit,
        age = 45,
        sex: "male" | "female" = "female",
    ): any | Promise<any> {
        const educationLevels = [
            "no-education",
            "primary-school",
            "secondary-school",
            "higher-education",
        ]
        // format into something the server is requireing
        // const body = {
        //     occupation: adherenceAudit.employed ? 2 : 0,
        //     age: age,
        //     share_drugs: Number(adherenceAudit.shareDrugs),
        //     side_effect: Number(adherenceAudit.sideEffects),
        //     understand_reg: adherenceAudit.understandRegimen ? 0 : 1, // this is an opposite thing in the server
        //     edu_lev: educationLevels.findIndex((ed) => ed === adherenceAudit.education),
        //     sex: sex === "male" ? 1 : 0,
        //     alc_drinks: Number(adherenceAudit.frequentAlcoholUse),
        // }

        const intercept = normal(0.6508878758727246, 0.2264982936096282)
        // const age_r = normal(-0.21962766469973202, 0.03269431515510608)
        const age_r = normal(-0.11962766469973202, 0.09269431515510608)
        // const edu_lev = normal(-0.5272945932107651, 0.05905121110792727)
        const edu_lev = normal(-0.4072945932107651, 0.05905121110792727)
        const share_drugs = normal(1.2688017000378393, 0.8698750752572072)
        const occupation = normal(-0.3442870769761993, 0.03766084731176981)
        const side_effect = normal(0.954476056820323, 0.25315211689704664)
        const understand_reg = normal(1.1073743170216346, 0.4689712444172365)
        const alc_drinks = normal(0.297833433932746, 0.2612879518029633)
        const sex_r = normal(0.1267616891927831, 0.11690499307270034)

        const variables = [
            occupation,
            age_r,
            share_drugs,
            understand_reg,
            side_effect,
            edu_lev,
            alc_drinks,
            sex_r,
        ]

        const coefficients = [
            adherenceAudit.employed ? 2 : 0,
            (age - 43.587878787878786) / 11.06300574359333, // hard coded rescale
            Number(adherenceAudit.shareDrugs),
            adherenceAudit.understandRegimen ? 0 : 1,
            Number(adherenceAudit.sideEffects),
            educationLevels.findIndex((ed) => ed === adherenceAudit.education),
            Number(adherenceAudit.frequentAlcoholUse),
            sex === "male" ? 1 : 0,
        ]

        // const patientRisks = [[0.8014045652351326]];
        const terms = coefficients.map((val, idx) => [val, variables[idx]])

        // const terms = coefficients.map((patient) =>
        // )[0]

        // console.log("Terms: ", terms)

        // @ts-ignore
        const answer = logitRegressor(8000, ...terms, intercept)

        const mapping = {
            "0.0": 0,
            "0.1": 0,
            "0.2": 0,
            "0.3": 0,
            "0.4": 0,
            "0.5": 0,
            "0.6": 0,
            "0.7": 0,
            "0.8": 0,
            "0.9": 0,
            "1.0": 0,
        }

        answer.forEach((ans) => {
            mapping[ans.toFixed(1)] += 1
        })

        return mapping
    }

    /**
     * Set next CTC appointment
     */
    setPatientNextCTCAppointment(
        patientId: string,
        date: Date,
        attendanceFacility: string,
    ): Promise<any> {
        const serverTime = firestore.FieldValue.serverTimestamp()
        return firestore().collection("ctc-appointments").add({
            patientId,
            appointmentDate: date,
            attendanceFacility,
            createdAt: serverTime,
            updatedAt: serverTime,
            facilityAttended: null,
            appointmentAttended: false,
            dateAttended: null,
        })
    }

    /**
     * Set next CTC appointment (local)
     */
    setLocalPatientNextCTCAppointment(
        patientId: string,
        code: string,
        date: Date,
        attendanceFacility: string,
    ): Appointment {
        const serverTime = new Date()
        const { Appointments } = ElsaDB

        const apt = {
            code,
            patientId,
            currentAppointmentDate: date,
            attendanceFacility,
            type: "art-appointment",
            createdAt: serverTime,
            updatedAt: serverTime,
            appointmentAttended: false,
        }

        return Appointments.insert({ ...apt, data: JSON.stringify(apt) })[0]
    }

    /**
     * Update an appointment date (reschedule appointment)
     * @param patientId
     * @param count
     */
    updateAppointmentDate(
        appointmentId: string,
        newDate: Date,
        attendanceFacility: string,
    ): Promise<any> {
        const serverTime = firestore.FieldValue.serverTimestamp()
        return firestore().collection("ctc-appointments").doc(appointmentId).update({
            appointmentDate: newDate,
            attendanceFacility,
            updatedAt: serverTime,
        })
    }

    /**
     * Update an appointment date (reschedule appointment) - local
     * @param patientId
     * @param count
     */
    updateLocalAppointmentDate(
        appointmentId: string,
        newDate: Date,
        attendanceFacility: string,
    ): Appointment {
        const serverTime = new Date()
        const { Appointments } = ElsaDB

        return Appointments.update(appointmentId, {
            currentAppointmentDate: newDate,
            attendanceFacility,
            updatedAt: serverTime,
        })
    }

    /**
     * Set the date and facility of the appointment keeping
     * @param appointmentId
     * @param dateAttended
     * @param facilityAttended
     */

    setCTCAppointmentCompleteStatus(
        appointmentId: string,
        dateAttended: Date,
        status: boolean,
        facilityAttended: string,
    ): Promise<any> {
        const serverTime = firestore.FieldValue.serverTimestamp()
        const updates = status
            ? {
                  dateAttended,
                  facilityAttended,
                  appointmentAttended: status,
              }
            : {
                  dateAttended: null,
                  facilityAttended: null,
                  appointmentAttended: status,
              }
        return firestore()
            .collection("ctc-appointments")
            .doc(appointmentId)
            .update({ ...updates, updatedAt: serverTime })
    }

    /**
     * Get the last n CTC appointments for a given patient ID
     * @param appointmentsCount
     */
    getPatientAppointments(patientId: string, count: 6): Promise<any> {
        return firestore()
            .collection("ctc-appointments")
            .where("patientId", "==", patientId)
            .where("appointmentAttended", "==", false)
            .orderBy("appointmentDate", "desc")
            .limitToLast(count)
            .get()
            .then((snap) => {
                return snap.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                    createdAt: doc.data().createdAt.toDate(),
                    updatedAt: doc.data().updatedAt.toDate(),
                    appointmentDate: doc.data().appointmentDate.toDate(),
                    dateAttended: doc.data().dateAttended?.toDate() || null,
                }))
            })
            .catch((error) => {
                console.warn("Error here", error)
                return error
                // FIXME: add server error logger here.
            })
    }

    getLocalPatientAppointments(patientId: string, count: 6): Promise<Appointment[]> {
        const { Appointments } = ElsaDB

        return Appointments.filter({ patientId }).data().splice(0, count)
    }

    getLocalPatientVisits(patientId: string, count: 10): Promise<any> {
        const { CTCVisits } = ElsaDB

        // console.log("Visits: ", CTCVisits.filter({ patientId }).data())

        // TODO: fix the order
        return CTCVisits.filter({ patientId })
            .order("createdAt", true)
            .data()
            .splice(0, count)
            .reverse()
    }

    /**
     * Fetch a CTC patient file
     */
    getCTCPatientFile(code: string): Promise<CTCPatientFile | null> {
        return firestore()
            .collection("ctc-patient-files")
            .where("code", "==", code)
            .get()
            .then((res) => {
                const { docs, empty } = res
                if (empty) {
                    return null
                }

                if (docs.length > 1) {
                    // TODO: add crashylitics and log this event
                    throw new Error("There is more than one patient with this code.")
                    return null
                }

                const data = docs[0].data()
                // There is only one patient file with this code
                return {
                    ...data,
                    id: docs[0].id,
                    dateOfBirth: data.dateOfBirth?.toDate() || null,
                    HIVConfirmDate: data.HIVConfirmDate?.toDate() || null,
                    ARTStartDate: data.ARTStartDate?.toDate() || null,
                }
            })
            .catch((error) => {
                console.warn("Error", error)
                return null
            })
    }

    /** Get the local CTC patient file */
    getLocalCTCPatientFile(code: string) {
        // @ts-ignore
        const { CTCPatientFiles } = ElsaDB

        const ptFile = CTCPatientFiles.get({ code })

        // console.log("Raw Patient File: ", JSON.stringify(ptFile, null, 2))

        if (!ptFile) {
            return undefined
        }

        if (ptFile.data) {
            // Return the JSON object that we are parsing from its string format
            return { ...JSON.parse(ptFile.data), id: ptFile.id }
        } else {
            CTCPatientFiles.update(ptFile.id, { data: JSON.stringify(ptFile) })
            return { ...ptFile }
        }
    }

    /** Create a local CTC patient file */
    createLocalCTCPatientFile(code: string): Partial<CTCPatientFile> {
        // @ts-ignore
        const { CTCPatientFiles } = ElsaDB

        // Check and see if the file exists with this code
        const file = CTCPatientFiles.get({ code })

        if (file) {
            console.log("exists")
            return file
        }

        const ptFile = {
            code,
            allergies: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            complete: false,
        }

        // console.log(CTCPatientFiles.get({ code }))
        // FIXME: first create the file then update it with the data object to contain the ID
        return CTCPatientFiles.insert({ ...ptFile, data: JSON.stringify(ptFile) }, true)[0]
    }

    /**
     * Update patient CTC File information
     */
    updateCTCFileInformation(patientId: string, updates: { [key: string]: any }): Promise<any> {
        const serverTime = firestore.FieldValue.serverTimestamp()
        return firestore()
            .collection("ctc-patient-files")
            .doc(patientId)
            .update({ ...updates, updatedAt: serverTime })
    }

    /**
     * Update patient CTC File information (Local)
     */
    updateLocalCTCFileInformation(
        patientId: string,
        updates: { [key: string]: any },
    ): CTCPatientFile | false {
        const serverTime = new Date()
        const { CTCPatientFiles } = ElsaDB

        // FIXME: Persist the same data to the patient file JSON object

        // const ptFile = CTCPatientFiles.get({ id: patientId })
        // const fileData = JSON.parse(ptFile.data)
        // const fileUpdates = { ...updates, data: JSON.stringify({ ...fileData, ...updates }) }

        console.log("Updates API:", updates)

        return CTCPatientFiles.update(patientId, updates)
    }

    /**
     * Create a MINIMAL CTC patient file
     */
    createMinimalCTCFile(code: string): Promise<any> {
        const serverTime = firestore.FieldValue.serverTimestamp()
        return firestore().collection("ctc-patient-files").add({
            code,
            createdAt: serverTime,
            updatedAt: serverTime,
            complete: false,
        })
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
        const followUpRef = firestore().collection("follow-ups").doc()
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

        const convertUser = (raw) => {
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
