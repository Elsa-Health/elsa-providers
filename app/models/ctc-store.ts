import create from "zustand"
import _ from "lodash"
// or for IE compatibility
// import create from 'zustand/index.cjs.js'

type WHOStage = "stage 1" | "stage 2" | "stage 3" | "stage 4"

// TODO: Register facility details add
export interface PatientFile {
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
    HIVConfirmDate: Date
    ARTNaive: boolean
    artStartDate: Date
    WHOStageAtARTStart: WHOStage
    createdAt?: Date | any
    updatedAt?: Date | any
}

interface CTCVisit {
    id?: string
    dateOfVisit: Date | any
    weight: number
    height: number
    WHOStage: WHOStage
    functionalStatus: "working" | "ambulatory" | "bedridden"
    pregnant: boolean
    expectedDeliveryDate: Date | null
    knownCurrentConditions: string[]
    currentMedications: string[]
    cotrimUse: boolean
    diflucanUse: boolean
    ARTRegime: string
    ARTDaysDispensed: number
    ARTAdherenceStatus: "good" | "poor" | "unknown"
    presentingSymptoms: string[] // symptoms a patient walks in with
    presentSymptoms: string[] // positive symptoms from QA
    absentSymptoms: string[] // negative symptoms from QA
}

export interface AssesmentSummary {
    nonAdherenceSore: number
    diseaseLikelihoods: { [key: string]: number }
    resistanceScore: number
}

interface AssesmentFeedback {}

const patient: PatientFile = {
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
    HIVConfirmDate: new Date(),
    WHOStageAtARTStart: "stage 1",
    firstHIVTestDate: new Date(),
    treatmentSupportType: "none",
}

const visit: CTCVisit = {
    dateOfVisit: new Date(),
    weight: 80,
    height: 160,
    WHOStage: "stage 1",
    functionalStatus: "working",
    pregnant: false,
    expectedDeliveryDate: null,
    knownCurrentConditions: [],
    currentMedications: [],
    cotrimUse: false,
    diflucanUse: false,
    ARTRegime: "",
    ARTDaysDispensed: 20,
    ARTAdherenceStatus: "unknown",
    presentingSymptoms: [],
    presentSymptoms: [],
    absentSymptoms: [],
}

const [useStore] = create((set) => ({
    patient: patient,
    visit: visit,
    updatePatient: (name, value) =>
        set((state) => _.cloneDeep({ ...state, patient: { ...state.patient, [name]: value } })),
    increase: () => set((state) => ({ count: state.count + 1 })),
    reset: () => set({ count: 0 }),
}))

const [usePatientState] = create((set) => ({
    ...patient,
    updatePatient: (name, value) => set((state) => _.cloneDeep({ ...state, [name]: value })),
}))

export { usePatientState }
export default useStore
