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

export const symptomDependencies = [
    {
        name: "cough",
        symptom: "cough",
        attributes: ["duration", "type", "sputum color", "time of day"],
        duration: 1,
        type: null,
        "sputum color": null,
        "time of day": null,
        attributeOptions: {
            // NOTE: Are durations a must for everything??
            // duration: {
            //     type: "picker",
            //     options: symptomDurationOptions,
            //     defaultValue: symptomDurationOptions[0].value,
            // },
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
            "time of day": {
                type: "checkbox",
                options: ["morning", "afternoon", "night"],
                defaultValue: [],
            },
        },
        visibilityRules: [["sputum color", "type", "equalsTo", "productive"]],
    },
]
