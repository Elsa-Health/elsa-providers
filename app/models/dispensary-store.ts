import create from "zustand"

type sex = "male" | "female"

interface PatientFile {
    sex: sex
    dateOfBirth: Date
    residenceDistrict: string
    allergies: string[]
}

const initialFile: PatientFile = {
    sex: "male",
    dateOfBirth: new Date(),
    residenceDistrict: "Other",
    allergies: [],
}

interface PatientFileStore extends PatientFile {
    updateFile: (updates: any) => any
    resetFile: () => any
}

const usePatientFile = create<PatientFileStore>((set, get) => ({
    ...initialFile,
    updateFile: (updates) => set((state) => ({ ...state, ...updates })),
    resetFile: () =>
        set((state) => ({
            ...state,
            ...initialFile,
        })),
}))

interface PatientVisit {
    weight: number
    height: number
    temperature: number
    respiratoryRate: number
    heartRate: number
    oxygen: number
    systolic: number
    diastolic: number
    pregnant: boolean
    deliveryDate?: Date
    coMorbidities?: string[]
    presentingSymptoms: string[]
    presentSymptoms: string[]
    absentSymptoms: string[]
    diagnosis: []
    referred: boolean
    referredForTesting: boolean
    prescribedMedications: boolean
    investigationsOrdered: []
    dispensedMedications: []
    recommendations: ""
    dispenserDifferentialDiagnosis: ""
}

interface PatientVisitStore extends PatientVisit {
    updateVisit: (updates: any) => any
    setDiagnoses: (diagnoses: any[]) => any
    resetVisit: () => any
}

const initialVisit: PatientVisit = {
    weight: 0,
    height: 0,
    temperature: 0,
    respiratoryRate: 0,
    heartRate: 0,
    oxygen: 0,
    systolic: 0,
    diastolic: 0,
    pregnant: false,
    deliveryDate: new Date(),
    coMorbidities: [],
    presentingSymptoms: [],
    presentSymptoms: [],
    absentSymptoms: [],
    diagnosis: [],
    referred: false,
    referredForTesting: false,
    prescribedMedications: false,
    investigationsOrdered: [],
    dispensedMedications: [],
    recommendations: "",
    dispenserDifferentialDiagnosis: "",
}

const useVisitStore = create<PatientVisitStore>((set, get) => ({
    ...initialVisit,
    updateVisit: (updates) => set((state) => ({ ...state, ...updates })),
    setDiagnoses: (diagnoses) => set((state) => ({ ...state, diagnoses })),
    resetVisit: () =>
        set((state) => ({
            ...state,
            ...initialVisit,
        })),
}))

export { useVisitStore, usePatientFile }
