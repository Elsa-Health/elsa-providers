import create from "zustand"
import _, { Function, Partial } from "lodash"
import { educationLevels } from "../common/constants"
import { firebase } from "@react-native-firebase/auth"
import { Api } from "../services/api"
import { useSystemSymptomStore } from "./symptoms-store"
// or for IE compatibility
// import create from 'zustand/index.cjs.js'

type WHOStage = "stage 1" | "stage 2" | "stage 3" | "stage 4"
export type treatmentSupportType = "family" | "friends" | "partner" | "community-group" | "none"
export type maritalStatus = "single" | "married" | "cohabiting" | "divorced" | "widow"

// TODO: Register facility details add
export interface CTCPatientFile {
    id?: string
    code: string
    sex: "male" | "female"
    dateOfBirth: Date
    maritalStatus: maritalStatus
    district: string
    allergies: string[]
    treatmentSupport: boolean
    treatmentSupportType: treatmentSupportType
    firstHIVTestDate: Date
    HIVConfirmDate: Date | null
    HIVConfirmed: boolean
    ARTNaive: boolean
    WHOStageAtDiagnosis: WHOStage
    ARTStartDate: Date
    WHOStageAtARTStart: WHOStage
    currentARTUse: boolean
    CTCID?: string
    complete: boolean
    createdAt?: Date | any
    updatedAt?: Date | any
}

export interface CTCVisit {
    id?: string
    dateOfVisit: Date | any
    visitType: "medication" | "checkup"
    registerdFacility: string
    CTCNumber: string
    isTransiting: boolean
    attendanceFacility: string
    clinicalStage: string
    pregnant: boolean
    height: string
    weight: string
    systolic: number
    diastolic: number
    ARTCombination: string
    functionalStage: string
    conditions: string[]
    currentARTUse: boolean
    additionalMedication: boolean
    coMedications: string[]
    deliveryDate: Date | any
    presentingSymptoms: string[]
    investigationsOrdered: string[]
    newSymptoms: boolean
    dispensedMedications: string[]
    ARTDecision: string
    ARTDecisionReason: string
    counseling: string[]
    presentSymptoms: string[]
    absentSymptoms: string[]
    // weight: number
    // height: number
    // WHOStage: WHOStage
    // functionalStatus: "working" | "ambulatory" | "bedridden"
    // pregnant: boolean
    // expectedDeliveryDate: Date | null
    // knownCurrentConditions: string[]
    // currentMedications: string[]
    // cotrimUse: boolean
    // diflucanUse: boolean
    // ARTRegime: string
    // ARTDaysDispensed: number
    // ARTAdherenceStatus: "good" | "poor" | "unknown"
    // presentingSymptoms: string[] // symptoms a patient walks in with
    // presentSymptoms: string[] // positive symptoms from QA
    // absentSymptoms: string[] // negative symptoms from QA
}

export interface Appointment {
    appointmentAttended: boolean
    appointmentDate: Date
    createdAt: Date
    dateAttended: Date | null | undefined
    facilityAttended: string | null | undefined
    attendanceFacility: string
    patientId: string
    updatedAt: Date
    id?: string
    type: "art-appointment" | "follow-up" | "visit"
}

export interface AssesmentSummary {
    nonAdherenceSore: number
    diseaseLikelihoods: { [key: string]: number }
    resistanceScore: number
}

interface AssesmentFeedback {}

const patient: CTCPatientFile = {
    id: "",
    code: "73409",
    sex: "male",
    dateOfBirth: new Date(),
    maritalStatus: "single",
    district: "",
    allergies: [],
    treatmentSupport: false,
    ARTStartDate: new Date(),
    ARTNaive: false,
    HIVConfirmDate: null,
    HIVConfirmed: false,
    CTCID: "",
    WHOStageAtARTStart: "stage 1",
    firstHIVTestDate: new Date(),
    treatmentSupportType: "none",
    complete: false,
}

const initialVisit: CTCVisit = {
    dateOfVisit: new Date(),
    clinicalStage: "",
    CTCNumber: "",
    attendanceFacility: "",
    registerdFacility: "",
    visitType: "medication",
    isTransiting: false,
    pregnant: false,
    height: "",
    weight: "",
    systolic: 0,
    diastolic: 0,
    ARTCombination: "ARV Combination Program",
    functionalStage: "working",
    conditions: [],
    currentARTUse: false,
    additionalMedication: false,
    coMedications: [],
    deliveryDate: null,
    presentingSymptoms: [],
    investigationsOrdered: [],
    newSymptoms: false,
    dispensedMedications: [],
    ARTDecision: "",
    ARTDecisionReason: "",
    counseling: [],
    presentSymptoms: [],
    absentSymptoms: [],
}

export interface AdherenceAudit {
    education: educationLevels
    pastMonthMissedCount: number
    employed: boolean
    frequentAlcoholUse: boolean // More than 4 times per week
    shareDrugs: boolean // Whether the patient shares drugs or not
    sideEffects: boolean // Whether the patient is experiencing some side effects
    understandRegimen: boolean // Whether the paient understands their regimen
}

export type adherenceAuditVariables = keyof AdherenceAudit

const initialAdherenceAudit: AdherenceAudit = {
    education: "no-education",
    employed: false,
    pastMonthMissedCount: 0,
    frequentAlcoholUse: false,
    shareDrugs: false,
    sideEffects: false,
    understandRegimen: true,
}

// const [useStore] = create((set) => ({
//     patient: patient,
//     visit: visit,
//     updatePatient: (name, value) =>
//         set((state) => _.cloneDeep({ ...state, patient: { ...state.patient, [name]: value } })),
//     increase: () => set((state) => ({ count: state.count + 1 })),
//     reset: () => set({ count: 0 }),
// }))

// const usePatientVisits = create((set) => ({
//     visits: [],
//     updatePatient: (name, value) => set((state) => _.cloneDeep({ ...state, [name]: value })),
// }))

type VisitState = {
    visit: any
    diagnoses: any[]
    patientFile: null | CTCPatientFile
    patientVisits: any[]
    patientAppointments: any[]
    updateVisit: (updates: any) => any
    updatePatientFile: (updates: any, syncChanges?: boolean) => any
    setPatientFile: (file: any) => any
    resetVisitStore: () => void
    resetPatientFile: () => void
    setDiagnoses: (diagnoses: any[]) => any
    persistVisit: () => any
    setAppointments: (appointments: any[]) => any
}

const useVisitStore = create<VisitState>((set, get) => ({
    visit: { ...initialVisit },
    diagnoses: [],
    patientFile: null,
    patientVisits: [],
    patientAppointments: [],
    updateVisit: (updates) => {
        // console.log("Calling an update", JSON.stringify(updates))
        set((state) => ({ ...state, visit: { ...state.visit, ...updates } }))
    },
    updatePatientFile: (updates, syncChanges = false) => {
        const patientFile = get().patientFile
        const newPatientFile = { ...patientFile, ...updates }

        set((state) => ({ ...state, patientFile: newPatientFile }))

        if (syncChanges === true) {
            const api = new Api()
            const patientFile = get().patientFile
            const patientId = patientFile.id

            // TODO: If there are no changed fileds then ignore everything
            // const changedFields = _.keys(updates).filter(
            //     (updateKey) => patientFile[updateKey] !== updates[updateKey],
            // )
            // if (changedFields.length === 0) return

            console.log("Updating Patient File: ", patientId, {
                ...newPatientFile,
                data: JSON.stringify(newPatientFile),
            })

            patientId &&
                api.updateLocalCTCFileInformation(patientId, {
                    ...newPatientFile,
                    data: JSON.stringify(newPatientFile),
                })

            // api.updateCTCFileInformation(patientId, { ...updates }).catch((error) => {
            //     // FIXME: add error logger here
            //     console.warn("Error: ", error)
            // })
        }
    },
    setPatientFile: (file) => {
        let patVisits = []
        let appointments: Appointment[] = []
        if (file) {
            // file exists
            const api = new Api()
            appointments = api.getLocalPatientAppointments(file.id, 6)
            patVisits = api.getLocalPatientVisits(file.id, 10)
        }

        console.log("WARNING: ", appointments, file, patVisits)
        set((state) => ({
            ...state,
            patientFile: file,
            patientVisits: patVisits,
            patientAppointments: appointments,
        }))
    },
    resetVisitStore: () => {
        console.log("Resetting the visit store...")
        set((state) => ({
            ...state,
            visit: { ...initialVisit },
            diagnoses: [],
            patientFile: null,
        }))
    },
    resetPatientFile: () => {
        console.log("Resetting the patient store...")

        // Reset the symptoms state for this patient
        const resetSystemSymptomsStore = useSystemSymptomStore.getState().resetSystemSymptomsStore
        resetSystemSymptomsStore()

        // set the patient file to null
        set((state) => ({ ...state, patientFile: null }))
    },
    setDiagnoses: (diagnoses) => set((state) => ({ ...state, diagnoses })),
    persistVisit: () => {
        const api = new Api()
        const visit = get().visit
        const patientFile = get().patientFile
        const diagnoses = get().diagnoses
        const facilityName = useAuthenticationStore.getState().facilityName

        console.log("diagnoses: ", diagnoses)
        // return

        if (!patientFile) {
            console.warn("ERROR: there is no patient file")
            throw new Error("Error: There is no Patient File")
            // FIXME: Add handler and logger for this error
        }

        return api.storeLocalCTCPatientVisit(
            patientFile.id,
            patientFile.code,
            visit,
            diagnoses,
            facilityName,
        )
    },
    setAppointments: (appointments) =>
        set((state) => ({ ...state, patientAppointments: appointments })),
}))

type AdherenceStoreState = {
    updateAdherenceFactor: (updates: any) => any
    resetAdheranceStore: () => any
} & AdherenceAudit

const useAdherenceStore = create<AdherenceStoreState>((set) => ({
    education: "no-education",
    employed: false,
    pastMonthMissedCount: 0,
    frequentAlcoholUse: false,
    shareDrugs: false,
    sideEffects: false,
    understandRegimen: true,
    updateAdherenceFactor: (updates) => set((state) => ({ ...state, ...updates })),
    resetAdheranceStore: () => set((state) => ({ ...initialAdherenceAudit })),
}))

// version|id|firstname|lastname|role|telephone|facilityname|city|facilityid
type AuthenticationStoreState = {
    authenticated: boolean
    facilityName: string
    facilityId: string
    firstName: string
    lastName: string
    telephone: string
    city: string
    role: "none" | "clinician" | "clinical officer" | "nurse"
    setAuthenticated: (authStatus: boolean, name: any) => any
}

const useAuthenticationStore = create<AuthenticationStoreState>((set) => ({
    authenticated: false,
    facilityName: "none",
    facilityId: "",
    firstName: "",
    lastName: "",
    telephone: "",
    city: "",
    role: "none",
    setAuthenticated: (authStatus: boolean, updates: any) =>
        set((state) => ({ ...state, authenticated: authStatus, ...updates })),
}))

export { useVisitStore, useAdherenceStore, useAuthenticationStore }
// export default useStore

// FIXME: Potentially add a UI state for the CTC workflow to keep track of UI variables
