import { Observations } from "./curiosity.nb"

interface Minimum {
    symptom: string
    state: "present" | "absent" | "skip"
    threshold: number
}

interface Multiplier {
    symptom: string
    state: "present" | "absent" | "skip"
    multiplier: number
}

interface Rules {
    [disease: string]: {
        minimums: Minimum[]
        multipliers: Multiplier[]
    }
}

interface NodePresenceDependence {
    [nodeName: string]: string[]
}

export const nodePresenceDependence: NodePresenceDependence = {
    "genital discharge": [
        "curd like vaginal discharge",
        "fishy vaginal discharge",
        "foul smelling vaginal discharge",
    ],
}

const MIN_VAL = 10
const MAX_DISEASE_CONFIDENCE = 98.5

const rules: Rules = {
    syphilis: {
        minimums: [
            {
                symptom: "copper penny rash",
                state: "present",
                threshold: 75,
            },
            {
                symptom: "painless sore on genitals or mouth",
                state: "present",
                threshold: 70,
            },
        ],
        multipliers: [
            {
                symptom: "copper penny rash",
                state: "present",
                multiplier: 1.2,
            },
            {
                symptom: "painless sore on genitals or mouth",
                state: "present",
                multiplier: 1.05,
            },
        ],
    },
    "bacterial vaginosis": {
        minimums: [
            {
                symptom: "fishy vaginal discharge",
                state: "present",
                threshold: 75,
            },
        ],
        multipliers: [
            {
                symptom: "fishy vaginal discharge",
                state: "present",
                multiplier: 1.2,
            },
        ],
    },
    "urinary tract infection": {
        minimums: [],
        multipliers: [
            {
                symptom: "dysuria",
                state: "present",
                multiplier: 1.1,
            },
            {
                symptom: "frequent micturation",
                state: "present",
                multiplier: 1.1,
            },
        ],
    },
    gonorrhea: {
        minimums: [],
        multipliers: [
            {
                symptom: "menorrhagia",
                state: "present",
                multiplier: 1.25,
            },
            {
                symptom: "inflamed foreskin",
                state: "present",
                multiplier: 1.25,
            },
            {
                symptom: "genital discharge",
                state: "present",
                multiplier: 1.25,
            },
        ],
    },
    trichomoniasis: {
        minimums: [],
        multipliers: [
            {
                symptom: "foul smelling vaginal discharge",
                state: "present",
                multiplier: 1.25,
            },
        ],
    },
}

export function ruleCheckResult(
    disease: string,
    p_disease: number,
    presentSymptoms: string[],
): number {
    if (rules[disease] === undefined) {
        return Math.max(MIN_VAL, p_disease)
    }
    const { minimums, multipliers } = rules[disease]

    const minimum = minimums
        .filter((min) => presentSymptoms.includes(min.symptom))
        .reduce((a, b) => (a > b.threshold ? a : b.threshold), MIN_VAL)

    const multiplier = multipliers
        .filter((min) => presentSymptoms.includes(min.symptom))
        .reduce((a, b) => a * b.multiplier, 1)

    //   console.log(
    //     p_disease,
    //     Math.min(p_disease * multiplier, 100),
    //     Math.max(Math.min(p_disease * multiplier, 100), minimum)
    //   );

    return Math.max(Math.min(p_disease * multiplier, MAX_DISEASE_CONFIDENCE), minimum)
}

export default rules
