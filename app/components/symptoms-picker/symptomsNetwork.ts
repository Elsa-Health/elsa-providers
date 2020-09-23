import _ from "lodash"
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

interface SymptomDependency {
    name: string
    symptom: string
    attributes: string[]
    duration: number
    attributeOptions: any
    visibilityRules: [string, string, "equalsTo" | "notEqualsTo", string][]
}

export const symptomDependencies: SymptomDependency[] = _.concat(
    [
        {
            name: "cough",
            symptom: "cough",
            attributes: ["type", "sputum color", "when"],
            duration: 1,
            type: null,
            "sputum color": null,
            when: [],
            attributeOptions: {
                type: {
                    type: "radio",
                    options: ["dry", "productive"],
                    defaultValue: null,
                },
                "sputum color": {
                    type: "radio",
                    options: ["yellow", "green", "red", "clear", "white"],
                    default: null,
                },
                when: {
                    type: "checkbox",
                    options: ["morning", "afternoon", "night"],
                    defaultValue: [],
                },
            },
            visibilityRules: [["sputum color", "type", "equalsTo", "productive"]],
        },
        {
            name: "fever",
            symptom: "fever",
            attributes: ["grade"],
            duration: 1,
            grade: null,
            attributeOptions: {
                grade: {
                    type: "radio",
                    options: ["low grade", "high grade"],
                    defaultValue: null,
                },
            },
            visibilityRules: [],
        },
        {
            name: "vomiting",
            symptom: "vomiting",
            attributes: ["content"],
            content: [],
            attributeOptions: {
                content: {
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
            attributes: ["content", "when"],
            content: [],
            when: [],
            attributeOptions: {
                content: {
                    type: "checkbox",
                    options: ["epigastric", "umbilical", "hypogastric"],
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
