import { Instance, SnapshotOut, types, applySnapshot } from "mobx-state-tree"
import { Api } from "../../services/api"
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"
import _ from "lodash"
import { type } from "ramda"

interface Assesment {
    providerID: string
    providerName: string
    timeStamp: number
    uid: string | null
    date: Date
    geostamp: any
    symptoms: {
        [symptom: string]: "present" | "absent" | "skip"
    }
    diagnoses: any
    platform: "web" | "providers"
    program: string
}

const CenterAppointment = types.model("CenterAppointment", {
    date: types.optional(types.string, ""),
    hospitalId: types.optional(types.string, ""),
    telephone: types.optional(types.string, ""),
    name: types.optional(types.string, ""),
    timeStamp: types.number,
    time: types.optional(types.string, ""),
    id: types.optional(types.string, ""),
    userId: types.optional(types.string, ""),
    serverTime: types.frozen({}),
})

export const CenterAppointmentsModel = types
    .model("CenterAppointmentsModel", {
        appointmentsList: types.array(CenterAppointment),
        loadingAppointments: true,
    })
    .actions(self => ({
        toggleLoading(state = false) {
            self.loadingAppointments = state
        },
        setAppointments(appointments = []) {
            // @ts-ignore
            self.appointmentsList = [...appointments]
        },
    }))

const CenterModel = types.model("CenterModel", {
    id: types.string,
    address: types.string,
    location: types.frozen({}),
    name: types.string,
    telephone: types.maybeNull(types.string),
    type: types.string,
})

export const CentersModel = types
    .model("CentersModel", {
        centersList: types.array(CenterModel),
        loadingCenters: true,
    })
    .actions(self => ({
        toggleLoading(state = false) {
            self.loadingCenters = state
        },
        setCenters(centers = []) {
            // @ts-ignore
            self.centersList = [...centers]
            self.loadingCenters = false
        },
    }))

export const ApplicationModel = types
    .model("ApplicationModel", {
        loadingAssessments: types.boolean,
    })
    .actions(self => ({
        toggleLoading(state = false) {
            self.loadingAssessments = state
        },
    }))

const PatientModel = types
    .model("PatientModel", {
        sex: types.union(types.literal("male"), types.literal("female")),
        age: types.number,
        location: types.string,
        symptoms: types.frozen({
            string: types.union(
                types.literal("present"),
                types.literal("absent"),
                types.literal("skip"),
            ),
        }),
        riskFactors: types.array(types.string),
    })
    .actions(self => ({
        setSymptom(symptom: string, status: "present" | "absent" | "skip") {
            self.symptoms = { ...self.symptoms, [symptom]: status }
        },
        bulkSetSymptoms(symptoms: { [sym: string]: "present" | "absent" | "skip" }) {
            self.symptoms = { ...self.symptoms, ...symptoms }
        },
        clearSymptoms() {
            self.symptoms = {}
        },
    }))

const DiagnosesModel = types.model("DiagnosesModel", {})

export const AssessmentModel = types
    .model("AssessmentModel", {
        patient: PatientModel,
        diagnoses: types.frozen({}),
        reachedDiagnosis: types.boolean,
        nextNodes: types.array(types.string),

        //Two extra values to be used during initial assessment 
        qrcodeScanComplete:types.boolean,
        qrcode:types.string
    })
    .actions(self => ({
        setNextNodes(nextNodes: string[] = []) {
            // @ts-ignore
            self.nextNodes = nextNodes
        },
        setQrCodeComplete(status:boolean=false){
            self.qrcodeScanComplete=status
        }
        ,
        setQrCode(qrcode:string=""){
            self.qrcode=qrcode
        },
        setDiagnoses(diagnoses = {}) {
            self.diagnoses = diagnoses
        },
        setReachedDiagnosis(value = false) {
            self.reachedDiagnosis = value
        },
        clearDiagnoses() {
            self.reachedDiagnosis = false
            self.diagnoses = {}
        },
        persistAssesment(providerName, providerID) {
            const assessment: Assesment = {
                providerID,
                providerName,
                // @ts-ignore
                date: firestore.FieldValue.serverTimestamp(),
                timeStamp: new Date().getTime(),
                diagnoses: self.diagnoses,
                geostamp: {},
                // @ts-ignore
                symptoms: self.patient.symptoms,
                uid: null,
                platform: "providers",
                program: "tima",
            }

            const tima = new Api()

            tima.setup()

            tima.storeAssesmentInDB(assessment)
        },
    }))
    .views(self => ({
        topDiagnoses(count = 4) {
            const mapping = _.map(self.diagnoses, (result, diag) => {
                // console.log(result, diag)
                return {
                    diag,
                    p: +(result * 100).toFixed(0),
                    name: diag
                        .split(" ")
                        .map(d => _.upperFirst(d))
                        .join(" "),
                }
            })

            return _.sortBy(mapping, "p")
                .reverse()
                .splice(0, count)
        },
    }))

export interface UserAccount {
    id: string
    username: string
    telephone: string
    role: "chw" | "clinician" | "addo-dispenser" | "none"
    hospitalId: string
    hospitalName: string
    authenticated: boolean
    loading: boolean
}

export const initialUser: UserAccount = {
    id: "",
    username: "",
    telephone: "",
    role: "none",
    hospitalId: "",
    hospitalName: "",
    authenticated: false,
    loading: true,
}

const AccountModel = types
    .model("AccountModel", {
        id: types.string,
        username: types.string,
        telephone: types.string,
        role: types.union(
            types.literal("chw"),
            types.literal("clinician"),
            types.literal("addo-dispenser"),
            types.literal("none"),
        ),
        hospitalId: types.string,
        hospitalName: types.string,
        authenticated: types.boolean,
        loading: types.boolean,
    })
    .actions(self => ({
        setUser(account: UserAccount) {
            const {
                id="",
                username="",
                telephone="",
                role="chw",
                hospitalId="",
                hospitalName="",
                authenticated = false,
                loading = false,
            } = account
            self.username = username
            self.authenticated = authenticated
            self.loading = loading
            self.hospitalId = hospitalId
            self.hospitalName = hospitalName
            self.id = id
            self.telephone = telephone
            self.role = role
        },

        async initializeAccount() {
            const setAccount = acc => {
                // console.log(self)
                // self.loading = false
            }
            return auth().onAuthStateChanged(user => {
                if (user) {
                    firestore()
                        .collection("providers")
                        .doc(user.uid)
                        .onSnapshot(snap => {
                            if (snap.exists) {
                                const user = { id: snap.id, ...snap.data() }
                                setAccount({ ...initialUser, ...user, loading: false })
                                // self.loading = false
                                // console.log("USER: ", self)
                                // self = { ...initialUser, ...user, loading: false }
                            } else {
                                setAccount({ ...initialUser, loading: false })
                                // auth().signOut()
                            }
                        })
                } else {
                    setAccount({ ...initialUser, loading: false })
                }
            })
        },
    }))

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
    assessment: AssessmentModel,
    application: ApplicationModel,
    account: AccountModel,
    centers: CentersModel,
    centerAppointments: CenterAppointmentsModel,
}).actions(self => ({
    async predictDiagnoses() {
        self.application.toggleLoading(true)
        const tima = new Api()

        tima.setup()
        const result = await tima.predictDiagnoses(self.assessment.patient.symptoms)
        if (result.kind === "ok") {
            self.application.toggleLoading(false)
            self.assessment.setNextNodes(result.assessment.nextNodes)
            self.assessment.setDiagnoses(result.assessment.diagnoses)

            if (result.assessment.nextNodes.length === 0) {
                self.assessment.setReachedDiagnosis(true)
                const { username, id } = self.account
                console.log("STORING CURRENT ASSESMENT")
                self.assessment.persistAssesment(username, id)
            }
            console.log(result.assessment)
        } else {
            console.log("Error: ", result.kind)
        }
    },

    async subscribeToFollowUp(telephone, location, yearOfBirth, symptoms) {
        self.application.toggleLoading(true)
        const tima = new Api()

        tima.setup()
        return tima.registerToFollowUps(telephone, location, yearOfBirth, symptoms).then(res => {
            self.application.toggleLoading(false)
        })
    },

    async referrToHospital({ date, name, hospitalId, telephone, time, symptoms }) {
        self.application.toggleLoading(true)
        const tima = new Api()

        tima.setup()

        const referral = {
            name,
            date,
            hospitalId,
            telephone,
            time,
            symptoms,
            timeStamp: new Date().getTime()
        }
        return tima.referrPatient(referral).then(res => {
            self.application.toggleLoading(false)
        })
    },

    async loadCenters() {
        // self.centers.toggleLoading(true)

        const centersRef = await firestore().collection("centers").get()

        const centersList = centersRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        self.centers.setCenters(centersList)
        self.centers.toggleLoading(false)
    },

    async loadCenterAppointments() {
        const appointmentsRef = await firestore().collection("appointments").get()
        const appList = appointmentsRef.docs.map(doc => ({ ...doc.data(), id: doc.id }))

        self.centerAppointments.setAppointments(appList)
        self.centerAppointments.toggleLoading(false)
    }
}))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
