import { useSystemSymptomStore } from "../../models/symptoms-store"
import {
    findAllSymptomsWithValue,
    getRelatedSymptoms,
    updateSystemSymptomNode,
} from "./symptomsNetwork"

test("getRelatedSymptoms works", () => {
    const relatedSymptoms = getRelatedSymptoms(["fever"], 5)

    expect(relatedSymptoms.length).toBe(5)
    expect(relatedSymptoms.indexOf("cough")).toBeGreaterThan(-1)
})

test("findAllSymptomsWithValue works", () => {
    const systemStore = useSystemSymptomStore.getState().systemsSymptoms
    const presentSymptoms = findAllSymptomsWithValue(systemStore, "present")
    const absentSymptoms = findAllSymptomsWithValue(systemStore, "absent")

    expect(presentSymptoms.length).toBe(0)
    expect(absentSymptoms.length).toBeGreaterThan(10)
})

test("updateSystemSymptomNode works", () => {
    const systemStore = useSystemSymptomStore.getState().systemsSymptoms

    const mapping = updateSystemSymptomNode(systemStore, "fever", "present")
    expect(mapping.length === systemStore.length).toBe(true)
})
