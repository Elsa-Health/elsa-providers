import create from "zustand"
import { symptomState, symptomsBySystems, SystemSymptomMapping } from "../common/systemSymptoms"
import { updateSystemSymptomNode } from "../components/symptoms-picker/symptomsNetwork"
import _ from "lodash"

const useSymptomFeatures = create((set) => ({
    updateSymptomFeatures: (updates) => set((state) => ({ ...state, ...updates })),
}))

interface SystemSymptomStore {
    systemsSymptoms: SystemSymptomMapping[]
    setSystemsSymptoms: (systemSymptoms: any) => any
    updateNodeBySymptom: (symptom: string, status: symptomState) => any
    resetSystemSymptomsStore: () => any
}

const useSystemSymptomStore = create<SystemSymptomStore>((set) => ({
    systemsSymptoms: [...symptomsBySystems],
    setSystemsSymptoms: (systemsSymptoms) => set((state) => ({ ...state, systemsSymptoms })),
    updateNodeBySymptom: (symptom: string, value: symptomState) =>
        set((state) => {
            const _state = _.cloneDeep(state.systemsSymptoms)
            updateSystemSymptomNode(_state, symptom, value)
            // console.log("_STATE_____ \n")
            // console.log(JSON.stringify(_state, null, 2))
            return { ...state, systemsSymptoms: _state }
        }),
    resetSystemSymptomsStore: () => set(() => ({ systemsSymptoms: [...symptomsBySystems] })),
}))

export { useSymptomFeatures, useSystemSymptomStore }
