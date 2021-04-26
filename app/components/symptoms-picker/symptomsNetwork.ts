import _ from "lodash"
import {
    symptomsBySystems,
    symptomState,
    SystemSymptom,
    SystemSymptomMapping,
    SystemSymptoms,
} from "../../common/systemSymptoms"
const symptomsNetwork = [
    ["fever", "cough", "headache", "chills", "vomiting", "night sweats", "ear pain"],
    ["cough", "dyspnoea", "chest pain", "fever", "wheezing", "tachypnoea", "rhinorhea", "sneezing"],
    ["vomiting", "nausea", "diarrhoea", "fatigue", "fever", "abdominal pain", "appetite loss"],
    [
        "dyspnoea",
        "chest pain",
        "chest tightness",
        "central cyanosis",
        "wheezing",
        "tachypnoea",
        "cough",
        "nasal flaring",
    ],
    ["fatigue", "diarrhoea", "vomiting", "malaise", "myalgia"],
    ["rhinorhea", "sore throat", "loss of voice", "difficulty swallowing"],
    ["headache", "eye pain", "eye discharge", "decreased visual acuity", "red eyes"],
    ["halitosis", "dental pain"],
    ["ear discharge", "ear pain"],
    ["dysuria", "frequent micturation"],
    ["vaginal itching", "white vaginal discharge", "vaginal discharge", "dysuria", "fishy vaginal discharge"],
    ["vaginal discharge", "menorrhagia", "metrorrhagia", "dysuria", "pelvic pain", "testicular pain", "testicular swelling"],
    ["skin rash", "skin patches", "pruritis"],
    ["stiff neck"],
]

export const symptomsList: string[] = _.uniq(_.flatten(symptomsNetwork))

export const symptomDurationOptions = [
    { label: "1 day", value: 1 },
    { label: "2 days", value: 2 },
    { label: "3 days", value: 3 },
    { label: "4 days", value: 4 },
    { label: "5 days", value: 5 },
    { label: "6 days", value: 6 },
    { label: "7 days", value: 7 },
    { label: "2 weeks", value: 14 },
    { label: "3 weeks", value: 21 },
    { label: "1 month", value: 31 },
    { label: "2 months", value: 62 },
    { label: "3 months", value: 93 },
    { label: "Over 3 months", value: 100 },
]

/**
 * Finds the most relevant related symptoms within a network
 *
 * @param {string[]} presentSymptoms
 * @param {number} relatedCount
 * @return {*}  {string[]}
 */
export function getRelatedSymptoms(presentSymptoms: string[], relatedCount: number): string[] {
    const result = []

    // if there are no present symptoms selected, return the most common symptoms
    if (presentSymptoms.length === 0) {
        const symptomCounts = {}
        symptomsNetwork.forEach((symptomSet) => {
            symptomSet.forEach((symptom) => {
                symptomCounts[symptom]
                    ? (symptomCounts[symptom] += 1)
                    : (symptomCounts[symptom] = 1)
            })
        })
        const symptomOptions = _.keys(symptomCounts)
        _.times(relatedCount, () => {
            const maxSymptom = _.maxBy(symptomOptions, function (o) {
                return symptomCounts[o]
            })
            result.push(maxSymptom)
            symptomOptions.splice(symptomOptions.indexOf(maxSymptom), 1)
        })
        return result
    }

    // if there are some symptoms selected, return the next symptoms that are in the same set as the most populated set
    // things: when the set is all complete and no symptoms left in set?

    // Count the occurances of the already present symptoms
    // Each index of the array contains the number of symptoms in common with the present symptoms
    const setPresenceCounts = _.times(symptomsNetwork.length, (n) => [n, 0])
    symptomsNetwork.forEach((symptomSet, key) => {
        setPresenceCounts[key][1] = _.intersection(symptomSet, presentSymptoms).length
    })

    return _.uniq(
        _.flatten(
            setPresenceCounts
                .sort((a, b) => b[1] - a[1])
                .map((pair) => {
                    return _.differenceWith(symptomsNetwork[pair[0]], presentSymptoms)
                }),
        ),
    ).splice(0, relatedCount)
}

export interface SymptomDependency {
    name: string
    symptom: string
    attributes: string[]
    system:
        | "general system"
        | "gastroentestinal system"
        | "respiratory system"
        | "circulatory system"
        | "central nervous system"
    duration: number
    attributeOptions: any
    visibilityRules: [string, string, "equalsTo" | "notEqualsTo", string][]
}

export const symptomDependencies: SymptomDependency[] = _.concat(
    [
        {
            name: "cough",
            symptom: "cough",
            system: "respiratory",
            attributes: ["cough type", "sputum color", "when"],
            duration: 1,
            "cough type": null,
            "sputum color": null,
            when: [],
            attributeOptions: {
                "cough type": {
                    type: "radio",
                    options: ["dry cough", "productive cough"],
                    defaultValue: null,
                },
                "sputum color": {
                    type: "radio",
                    options: ["yellow sputum", "green sputum", "red sputum", "clear sputum", "white sputum"],
                    default: null,
                },
                when: {
                    type: "checkbox",
                    options: ["morning", "afternoon", "night"],
                    defaultValue: [],
                },
            },
            visibilityRules: [["sputum color", "cough type", "equalsTo", "productive cough"]],
        },
        {
            name: "fever",
            symptom: "fever",
            attributes: ["fever grade"],
            duration: 1,
            "fever grade": null,
            system: "general",
            attributeOptions: {
                "fever grade": {
                    type: "radio",
                    options: ["low grade fever", "high grade fever"],
                    defaultValue: null,
                },
            },
            visibilityRules: [],
        },
        {
            name: "vomiting",
            symptom: "vomiting",
            attributes: ["vomiting content"],
            "vomiting content": [],
            system: "gastroentestinal",
            attributeOptions: {
                "vomiting content": {
                    type: "checkbox",
                    options: ["food", "bile", "blood"],
                    defaultValue: [],
                },
            },
            visibilityRules: [],
        },
        {
            name: "abdominal pain",
            symptom: "abdominal pain",
            system: "gastroentestinal",
            attributes: ["abdominal pain type", "when"],
            "abdominal pain type": [],
            when: [],
            attributeOptions: {
                "abdominal pain type": {
                    type: "checkbox",
                    options: ["epigastric pain", "umbilical pain", "hypogastric pain"],
                    defaultValue: [],
                },
                when: {
                    type: "checkbox",
                    options: ["before meals", "after meals"],
                    defaultValue: [],
                },
            },
            visibilityRules: [["when", "content", "includes", "epigastric"]],
        },
    ],
    _.differenceWith(symptomsList, ["fever", "cough", "vomiting", "abdominal pain"]).map(
        (symptom) => ({
            name: symptom,
            symptom,
            attributes: [],
            duration: 1,
            visibilityRules: [],
            attributeOptions: [],
        }),
    ),
)

export function RENAME_findNode(systemMapping = symptomsBySystems, symptom: string) {
    return _.flattenDeep(
        systemMapping.map((symptomSystem) => {
            // General mappings
            return symptomSystem.mapping
                .map((systemMapping) => {
                    // inside the individual system (general, GE, Resp, etc)
                    // systemMapping.map(systemMap => systemMap)
                    // console.log("Recursively", recursivelyFindNode(systemMapping, symptom))
                    return recursivelyFindNode(systemMapping, symptom)
                })
                .filter((node) => node !== null)
        }),
    )
}

// HACK: This is a hack to work with the offline naive causal modes which just map cause to effect
export function findAllSymptomsWithValue(systemMapping: SystemSymptom, value: symptomState) {
    const presentSymptoms = []
    function recursivelyFindNodeByValue(systemMapping: SystemSymptom, value: string) {
        // check if this is the node we are looking for based on the value
        if (systemMapping.value === value) {
            presentSymptoms.push(systemMapping.symptom)
            // return systemMapping
        }
        // check if this node has children
        if (systemMapping.children?.length > 0) {
            // Check if the node has a matchink value or value
            // recursivelyFindNodeByValue(systemMapping.children[0])
            const results = systemMapping.children.map((systemMap) =>
                recursivelyFindNodeByValue(systemMap, value),
            )
            const flatResults = _.flattenDeep(results)
            if (flatResults.every((res) => res === null)) {
                return null
            }
            return flatResults.find((res) => res !== null)
        }
        // If there are no children
        return null
    }

    _.flattenDeep(
        systemMapping.map((symptomSystem) => {
            // General mappings
            return symptomSystem.mapping
                .map((systemMapping) => {
                    // inside the individual system (general, GE, Resp, etc)
                    // systemMapping.map(systemMap => systemMap)
                    // recursivelyFindNodeByValue(systemMapping, value)
                    // console.log("Recursively", recursivelyFindNodeByValue(systemMapping, value))
                    // console.log(presentNodes)
                    return recursivelyFindNodeByValue(systemMapping, value)
                })
                .filter((node) => node !== null)
        }),
    )

    return presentSymptoms
}

function recursivelyFindNode(systemMapping: SystemSymptom, symptom: string) {
    // check if this is the node we are looking for based on the symptom
    if (systemMapping.symptom === symptom) {
        return systemMapping
    }
    // check if this node has children
    if (systemMapping.children?.length > 0) {
        // Check if the node has a matchink symptom or value
        // recursivelyFindNode(systemMapping.children[0])
        const results = systemMapping.children.map((systemMap) =>
            recursivelyFindNode(systemMap, symptom),
        )
        const flatResults = _.flattenDeep(results)
        if (flatResults.every((res) => res === null)) {
            return null
        }
        return flatResults.find((res) => res !== null)
    }
    // If there are no children
    return null
}

export function updateSystemSymptomNode(
    systemsList: SystemSymptomMapping[],
    symptom: string,
    value: symptomState,
): any {
    return systemsList.map((symptomSystem) => {
        // General mappings
        return symptomSystem.mapping.map((systemMapping) => {
            // inside the individual system (general, GE, Resp, etc)
            // console.log("RecFoundursively", recursivelyUpdateNode(systemMapping, symptom, value))
            return recursivelyUpdateNode(systemMapping, symptom, value)
        })
    })
}

export function recursivelyUpdateNode(
    systemMapping: SystemSymptom,
    symptom: string,
    value: symptomState,
): SystemSymptom {
    // check if this is the node we are looking for based on the symptom
    if (systemMapping.symptom === symptom) {
        systemMapping.value = value

        // HACK: If the parent is set to absent, stringify all the children and replace all occurances of present with absent
        // Why: So that if a parent symptom is set to absent, we want to make sure things that depend on it are also set to absent
        if (value === "absent") {
            systemMapping.children = JSON.parse(
                JSON.stringify(systemMapping.children).replace(
                    /"value":"present"/g,
                    `"value":"absent"`,
                ),
            )
        }

        return systemMapping
    }
    // check if this node has children
    if (systemMapping.children?.length > 0) {
        // Check if the node has a matchink symptom or value
        // recursivelyFindNode(systemMapping.children[0])
        const results = systemMapping.children.map((systemMap) =>
            recursivelyUpdateNode(systemMap, symptom, value),
        )
        const flatResults = _.flattenDeep(results)
        if (flatResults.every((res) => res === null)) {
            return null
        }
        return flatResults.find((res) => res !== null)
    }
    // If there are no children
    return null
}
