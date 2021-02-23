import create from "zustand"

type Diagnosis = {
    p: number
    diag: string
    name: string
}

type VisitState = {
    sex: "male" | "female"
    recentVisit: boolean
    similarPresentation: boolean
    patientConsent: boolean
    patientPresent: boolean
    elsaVisit: boolean
    years: number
    months: number
    isPregnant: boolean
    presentingSymptoms: string[]
    presentSymptoms: string[]
    absentSymptoms: string[]
    diagnosis: Diagnosis[]
    referred: boolean
    referredForTesting: boolean
    prescribedMedications: boolean
    investigationsOrdered: string[]
    dispensedMedications: string[]
    recommendations: string
    dispenserDifferentialDiagnosis: string
    updateVisit: (updates: any) => any
    setDiagnoses: (diagnoses: any[]) => any
    resetVisit: () => any
}
// expert opinions

const initialVisit: Omit<VisitState, "updateVisit" | "setDiagnoses" | "resetVisit"> = {
    sex: "female",
    recentVisit: false,
    similarPresentation: false,
    patientConsent: false,
    patientPresent: false,
    elsaVisit: false,
    years: 0,
    months: 0,
    isPregnant: false,
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
    dispenserDifferentialDiagnosis: ""
}

// FIXME: add helpfulness score
const useVisitStore = create<VisitState>((set, get) => ({
    ...initialVisit,
    updateVisit: (updates) => set((state) => ({ ...state, ...updates })),
    setDiagnoses: (diagnoses) => set((state) => ({ ...state, diagnoses })),
    resetVisit: () =>
        set((state) => ({
            ...state,
            ...initialVisit,
        })),
}))

export { useVisitStore }
