// @ts-check
// SEXUAL & REPORDUCTIVE HEALTH CURIOSITY MODELS

import { getQuestion } from "./questions"
import { ruleCheckResult, nodePresenceDependence } from "./rules"

interface NBItemDistributions {
    [symptom: string]: number
}

interface CuriosityNBMapping {
    [key: string]: NBItemDistributions
}

interface GenderDistributionMap {
    male: number
    female: number
}

export interface Observations {
    [evidence: string]: "present" | "absent" | "skip"
}

interface DiseaseProbabilities {
    [disease: string]: number
}

type Sex = "female" | "male"
type SymptomsList = string[]

const femaleOnlyDiseases: string[] = [
    "candidiasis - vaginal yeast infection",
    "bacterial vaginosis",
    "human papiloma virus (HPV)",
]

const maleOnlyDiseases: string[] = []

const maleOnlySymptoms: string[] = [
    "painful scrotal swelling",
    "inflamed foreskin",
    "penis opening discomfort",
]

const femaleOnlySymptoms: string[] = [
    "abdominal pain",
    "vaginal itching",
    "vaginal inflammation",
    "dyspareunia",
    "curd like vaginal discharge",
    "foul smelling vaginal discharge",
    "metrorrhagia",
]

function onlyUnique(value, index, self): boolean {
    return self.indexOf(value) === index
}

const flatten = (list: any[]) => list.reduce((acc, val) => acc.concat(val), [])

export const curiosityMappings: CuriosityNBMapping = {
    // "urinary tract infection": {
    //     dysuria: 96,
    //     "frequent micturation": 95,
    //     "pelvic pain": 50,
    //     "back pain": 55,
    //     nausea: 25,
    //     vomiting: 20,
    //     fever: 50,
    //     fatigue: 30,
    // },
    "candidiasis - vaginal yeast infection": {
        "vaginal itching": 90,
        "vaginal inflammation": 90,
        "curd like vaginal discharge": 95,
        dyspareunia: 50,
        "prolonged use of antibiotics": 80,
    },
    "human papilomavirus (HPV)": {
        "genital warts": 85,
    },
    // "genital herpes": {
    //     fever: 20,
    //     dysuria: 60,
    //     headache: 20,
    //     malaise: 20,
    //     myalgia: 20,
    //     "pins and needles": 40,
    //     "genital ulcers": 80,
    //     "mouth ulcers": 80,
    //     "multiple vesicle lesions": 80,
    //     "pus filled painful sores": 80,
    //     "genital itching": 80,
    // },
    // "bacterial vaginosis": {
    //     "vaginal itching": 85,
    //     "genital discharge": 85,
    //     dysuria: 90,
    //     "fishy vaginal discharge": 98,
    // },
    // chlamydia: {
    //     "genital discharge": 90,
    //     "abdominal pain": 80,
    //     "painful scrotal swelling": 85,
    //     dysuria: 55,
    //     dyspareunia: 45,
    //     "penis opening discomfort": 45,
    // },
    // gonorrhea: {
    //     "genital discharge": 90,
    //     "painful scrotal swelling": 65,
    //     "inflamed foreskin": 60,
    //     "painful joints": 50,
    //     dyspareunia: 40,
    //     dysuria: 75,
    //     metrorrhagia: 50,
    //     "swollen lymph nodes": 40,
    //     fever: 25,
    //     "frequent micturation": 15,
    //     "sore throat": 15,
    // },
    // trichomoniasis: {
    //     "foul smelling vaginal discharge": 98,
    //     "genital itching": 55,
    //     dysuria: 55,
    //     metrorrhagia: 60,
    //     "abdominal pain": 40,
    //     dyspareunia: 44,
    //     "genital inflammation": 50,
    //     "frequent micturation": 65,
    // },
    // syphilis: {
    //     "painless sore on genitals or mouth": 95,
    //     "copper penny rash": 98,
    //     "genital ulcers": 88,
    //     "genital warts": 40,
    //     "vaginal discharge": 50,
    //     fatigue: 50,
    //     "genital itching": 50,
    //     fever: 50,
    //     "sore throat": 45,
    //     "swollen lymph nodes": 40,
    //     "weight loss": 35,
    //     arthritis: 5,
    // },
    // HIV
    "cryptococcal meningitis": {
        fever: 99,
        malaise: 80,
        headache: 99,
        "stiff neck": 100,
        photophobia: 40,
        vomiting: 90,
        coma: 90,
        cough: 3,
        dyspnoea: 1,
        "skin rash": 1,
        "visual loss": 80,
        "hearing loss": 80,
        lethargy: 80,
        confusion: 60,
        "altered mental status": 80,
        "focal neural deficit": 50,
        "diastolic hypertension": 40,
    },
    toxoplasmosis: {
        headache: 80,
        fever: 30,
        seizures: 80,
        dyspnoea: 30,
        "dry cough": 50,
        "eye pain": 80,
        confusion: 30,
        "altered mental status": 50,
        "focal neurological deficit": 90,
        "decreased visual acuity": 80,
    },
    "hepatitis b": {
        fever: 40,
        fatigue: 60,
        "dark coloured urine": 60,
        "clay coloured stools": 10,
        nausea: 20,
        vomiting: 20,
        "yellow eyes": 80,
        jaundice: 5,
        msm: 40,
        "multiple sexual partners": 30,
    },
    "pneumocystis pneumonia": {
        fever: 80,
        cough: 80,
        dyspnoea: 90,
        fatigue: 90,
        chills: 50,
        "chest pain": 80,
        tachypnoea: 60,
        "hypoxia after extertion": 74,
    },
}

// type Disease = keyof typeof curiosityMappings;
// const disease: Disease = "";

const diagnosesList: string[] = Object.keys(curiosityMappings)

const p_diagnoses: DiseaseProbabilities = {}
diagnosesList.forEach((diagnosis: string) => (p_diagnoses[diagnosis] = 50))

const symptomsList: SymptomsList = flatten(
    Object.values(curiosityMappings).map((mapping) => Object.keys(mapping)),
).filter(onlyUnique)

interface CalculateResults {
    [disease: string]: number
}

/**
 * Calculate the risk of all the conditions using a simple variant of Naive Bayes Algorithm.
 * TODO: Add support for the bayesian framework calculations including the p(evidence) as the denominator
 * @export
 * @param {Observations} [observations={}]
 * @param {Sex} sex
 * @param {number} alpha
 * @param {string | undefined} diseaseName
 * @returns
 */
export function calculate(
    observations: Observations = {},
    sex: Sex,
    alpha = 0.1,
    diseaseName: string | undefined = undefined,
): { [disease: string]: number } {
    const results: CalculateResults = {}
    diagnosesList
        .filter((disease: string) => {
            // Filter out gender specific diagnoses
            // console.log(diseaseName)
            if (sex === "female") {
                //   filter out female conditions
                return !maleOnlyDiseases.find((d) => d === disease)
            }
            if (sex === "male") {
                //   filter out male conditions
                return !femaleOnlyDiseases.find((d) => d === disease)
            }
            //   default to true
            return true
        })
        .filter((disease) => {
            // Support the possibility to pass in a custom disease by name
            if (diseaseName !== undefined && diseaseName !== disease) {
                return false
            }
            return true
        })
        .forEach((diag) => {
            const relevantSymptoms = Object.keys(curiosityMappings[diag]).filter((symptom) =>
                symptomSexFilter(symptom, sex),
            )
            const relevantValues = relevantSymptoms.map(
                (symptom) => curiosityMappings[diag][symptom],
            )
            const symptoms = relevantSymptoms.filter(
                (symptom: string) => observations[symptom] === "present",
            )

            const absentSymptoms = relevantSymptoms.filter(
                (symptom: string) => observations[symptom] === "absent",
            )

            const maxProduct: number = relevantValues.reduce((a, b) => a + b, alpha)

            const min = 10 // returnDiseaseMinimum(diag, minThresholdRules, observations);

            const p_diag = symptoms
                .map((symptom) => curiosityMappings[diag][symptom])
                .reduce((prev, curr) => curr + prev, Math.log10(p_diagnoses[diag]))

            const abs_p_diag = absentSymptoms
                .map((symptom) => curiosityMappings[diag][symptom])
                .reduce((prev, curr) => curr * prev, 1)

            const prob = (p_diag * 100) / maxProduct
            results[diag] = Math.min(ruleCheckResult(diag, prob, symptoms), 98.3)
            // console.log("Minimum: ", diag, min, prob, Math.max(min, prob));
            // results[diag] = Math.min(Math.max(min, prob), 99);
        })
    return results
}

// export function returnDiseaseMinimum(
//   diseaseName: string,
//   minThresholdRules: MinThresholdRule[],
//   observations: Observations
// ): number {
//   const rules = minThresholdRules
//     .filter(rule => rule.disease === diseaseName)
//     .filter(
//       rule =>
//         Object.keys(observations).includes(rule.symptom) &&
//         observations[rule.symptom] === rule.state
//     );
//   if (rules.length > 0) {
//     return rules.sort((a, b) => b.threshold - a.threshold)[0].threshold;
//   }
//   return 0;
// }

/**
 * Get the most relevant (curiosity driven) nodes based off of the current hypotheses
 *
 * @export
 * @param {DiseaseProbabeilities} [diagnsosesLikelihoods=p_diagnoses]
 * @param {Sex} sex
 * @param {Observations} [observations={}]
 * @param {number} [questionsCount=1]
 * @param {("top3" | "most-relevant")} [scheme="top3"]
 * @returns
 */
export function getRelevantNextNodes(
    diagnsosesLikelihoods: DiseaseProbabilities = p_diagnoses,
    sex: Sex,
    observations: Observations = {},
    questionsCount = 1,
    diagnosesToConsider = 3,
    scheme: "top3" | "most-relevant" = "top3",
): string[] {
    if (scheme === "top3") {
        const entries = Object.entries(diagnsosesLikelihoods).sort((a, b) => b[1] - a[1])
        const relevantDiagnoses = entries.splice(0, diagnosesToConsider) // only return the top 3 diagnoses
        const skipSymptoms = flatten(
            Object.keys(nodePresenceDependence)
                .filter((node) => {
                    if (observations[node] && observations[node] === "present") {
                        return false
                    }
                    return true
                })
                .map((symptom) => nodePresenceDependence[symptom]),
        )
        // const dependentSymptoms = flatten(Object.values(nodePresenceDependence));
        // console.log("DEPE: ", skipSymptoms)
        const curiousSymptoms = relevantDiagnoses.map((diag) => {
            const hiddenSymptoms: string[] = Object.keys(curiosityMappings[diag[0]])
                .filter((symptom) => {
                    return !observations[symptom]
                })
                .filter((symptom) => symptomSexFilter(symptom, sex))
                .filter((symptom) => {
                    // completely disregard symptoms that depend on the presence of other symptoms
                    return !skipSymptoms.includes(symptom)
                })

            return Object.entries(curiosityMappings[diag[0]]).filter((symptom) =>
                hiddenSymptoms.includes(symptom[0]),
            )
        })
        const sortedSymptoms = flatten(curiousSymptoms).sort((a, b) => b[1] - a[1])
        return sortedSymptoms
            .map((a) => a[0])
            .filter(onlyUnique)
            .splice(0, questionsCount)
    }
    return []
}

function symptomSexFilter(symptom: string, sex: Sex | undefined) {
    if (sex === "female") {
        return !maleOnlySymptoms.find((sym: string) => sym === symptom)
    }
    if (sex === "male") {
        return !femaleOnlySymptoms.find((sym: string) => sym === symptom)
    }
    return true
}

export function getDiseaseEffects(diseaseName: string, sex: Sex | undefined): string[] {
    if (curiosityMappings[diseaseName]) {
        return Object.keys(curiosityMappings[diseaseName]).filter((symptom) =>
            symptomSexFilter(symptom, sex),
        )
    }
    return []
}

export function getRelevantNextQuestions(
    nodes: string[] = [],
    language: "eng" | "sw" = "eng",
): string[] {
    console.log("relevant", nodes)
    return nodes.map((nodeName) => getQuestion(nodeName, language))
}

export function getObservationsFromLists(present: string[], absent: string[]): Observations {
    const observations: Observations = {}
    present.forEach((symptom) => (observations[symptom] = "present"))
    absent.forEach((symptom) => (observations[symptom] = "absent"))
    return observations
}

// FIXME:
// 1. missing white patches in mouth from syphillis
// 2. enlargement of lymph nodes

// TODO:
// 1. Factor out all "other" gender symptoms when computing the probabilities of a condition
// 2. support getting similar nodes from the questions file -> use these nodes to compute vaginal discharge and genital discharge
// 3. Enumerate over all the possible diagnoses as the types for the calculate arguement
// 4. FIXME: Support multiplier maps for symptoms with a maximum of 100%
