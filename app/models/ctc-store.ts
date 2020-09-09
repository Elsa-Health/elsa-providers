import create from "zustand"
import _ from "lodash"
import { educationLevels } from "../common/constants"
// or for IE compatibility
// import create from 'zustand/index.cjs.js'

type WHOStage = "stage 1" | "stage 2" | "stage 3" | "stage 4"

// TODO: Register facility details add
export interface CTCPatientFile {
    id?: string
    code: string
    sex: "male" | "female"
    dateOfBirth: Date
    maritalStatus: "single" | "married" | "cohabiting" | "divorced" | "widow"
    district: string
    allergies: string[]
    treatmentSupport: boolean
    treatmentSupportType: "family" | "friends" | "partner" | "community-group" | "none"
    firstHIVTestDate: Date
    HIVConfirmDate: Date | null
    ARTNaive: boolean
    artStartDate: Date
    WHOStageAtARTStart: WHOStage
    complete: boolean
    createdAt?: Date | any
    updatedAt?: Date | any
}

export interface CTCVisit {
    id?: string
    dateOfVisit: Date | any
    clinicalStage: string
    pregnant: boolean
    height: string
    weight: string
    systolic: number
    diastolic: number
    combination: string
    functionalStage: string
    conditions: string[]
    currentARVUse: boolean
    additionalMedication: boolean
    coMedications: string[]
    deliveryDate: Date | any
    presentingSymptoms: string[]
    investigationsOrdered: string[]
    newSymptoms: boolean
    dispensedMedications: string[]
    arvDecision: string
    arvDecisionReason: string
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
    artStartDate: new Date(),
    ARTNaive: false,
    HIVConfirmDate: null,
    WHOStageAtARTStart: "stage 1",
    firstHIVTestDate: new Date(),
    treatmentSupportType: "none",
    complete: false,
}

const initialVisit: CTCVisit = {
    dateOfVisit: new Date(),
    clinicalStage: "",
    pregnant: false,
    height: "",
    weight: "",
    systolic: 0,
    diastolic: 0,
    combination: "ARV Combination Program",
    functionalStage: "working",
    conditions: [],
    currentARVUse: false,
    additionalMedication: false,
    coMedications: [],
    deliveryDate: null,
    presentingSymptoms: [],
    investigationsOrdered: [],
    newSymptoms: false,
    dispensedMedications: [],
    arvDecision: "",
    arvDecisionReason: "",
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

// const [usePatientState] = create((set) => ({
//     ...patient,
//     updatePatient: (name, value) => set((state) => _.cloneDeep({ ...state, [name]: value })),
// }))

const [useVisitStore] = create((set) => ({
    visit: { ...initialVisit },
    patientFile: null,
    updateVisit: (updates) => set((state) => ({ ...state, visit: { ...state.visit, ...updates } })),
    updatePatientFile: (updates) =>
        set((state) => ({ ...state, patientFile: { ...state.patientFile, ...updates } })),
    setPatientFile: (file) => set((state) => ({ ...state, patientFile: file })),
    resetVisitStore: () => set((state) => ({ ...state, visit: { ...initialVisit } })),
    resetPatientFile: () => set((state) => ({ ...state, patientFile: null })),
}))

const [useAdherenceStore] = create((set) => ({
    ...initialAdherenceAudit,
    updateAdherenceFactor: (updates) => set((state) => ({ ...state, ...updates })),
    resetAdheranceStore: () => set((state) => ({ ...initialAdherenceAudit })),
}))

export { useVisitStore, useAdherenceStore }
// export default useStore

// FIXME: Potentially add a UI state for the CTC workflow to keep track of UI variables
