import { curiosityMappings, diseaseName } from "../../elsa-local/curiosity.nb"

type triageLevel =
    | "refer immediately"
    | "home based care"
    | "refer within 24 hours"
    | "refer within 2 weeks"
    | "refer within 2 days"

export interface NextStep {
    diagnosis: diseaseName
    triageLevel: triageLevel
    triageDescription: string
    refer: boolean
    medications: string[]
    tests: string[]
    recommendations: string
}

const nextSteps: NextStep[] = [
    {
        diagnosis: "pneumonia",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        medications: [],
        refer: true,
        tests: ["Chest X-Ray (CXR)", "Full Blood Picture (FBP)"],
        recommendations: "If the patient is a smoker, recommend that they stop smoking.",
    },
    {
        diagnosis: "pnuemocystis pneumonia",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        medications: [],
        refer: true,
        tests: ["Chest X-Ray (CXR)", "Full Blood Picture (FBP)"],
        recommendations: "If the patient is a smoker, recommend that they stop smoking.",
    },
    {
        diagnosis: "tuberculosis",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        refer: true,
        medications: [],
        tests: ["Chest X-Ray (CXR)", "Full Blood Picture (FBP)", "GeneXpert", "Sputum Culture"],
        recommendations: "",
    },
    {
        diagnosis: "gastritis",
        triageLevel: "refer immediately",
        triageDescription:
            "Refer the patient to a health facility. They should seek care within 2 days.",
        refer: true,
        medications: ["Oral rehydration salts"],
        tests: ["Full Blood Picture (FBP)"],
        recommendations:
            "Recommend that the patient avoid acidic foods or foods that aggravate the pain. Patient should drink a lot of fluids.",
    },
    {
        diagnosis: "gastroenteritis",
        triageLevel: "home based care",
        triageDescription:
            "The patient can recieve home based care. They should seek medical attention if they experience excessive pain, excessive vomiting or diarrhoea, if there are any emergency signs, or if the patient is pregnant.",
        refer: false,
        medications: ["Oral Rehydration Salts or Fluids (if dehydrated)"],
        tests: ["Full Blood Picture (FBP)"],
        recommendations: "Recommend that the patient rests and avoids eating milk-based foods.",
    },
    {
        diagnosis: "chlamydia",
        triageLevel: "refer within 2 days",
        triageDescription:
            "Refer the patient to a health facility. They should seek care within 2 days.",
        refer: true,
        medications: ["Azithromycin"],
        tests: [],
        recommendations:
            "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
    },
    {
        diagnosis: "cryptococcal meningitis",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        refer: true,
        medications: [],
        tests: ["Full Blood Picture (FBP)", "Spinal Fluid Tap"],
        recommendations: "",
    },
    {
        diagnosis: "tuberculosis meningitis",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        refer: true,
        medications: [],
        tests: ["Full Blood Picture (FBP)", "Spinal Fluid Tap"],
        recommendations: "",
    },
    {
        diagnosis: "bacterial meningitis",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        refer: true,
        medications: [],
        tests: ["Full Blood Picture (FBP)", "Spinal Fluid Tap"],
        recommendations: "",
    },
    {
        diagnosis: "urinary tract infection",
        triageLevel: "home based care",
        triageDescription:
            "The patient can recieve home based care. They should seek medical attention if they experience a worsening of their symptoms or if their symptoms do not resolve.",
        refer: false,
        medications: ["Amoxicillin"],
        tests: ["Full Blood Picture (FBP)", "Urinalysis"],
        recommendations:
            "Provide counseling to patient on prevention menthods and recommend a follow-up after 5 months at a higher facility.",
    },
    {
        diagnosis: "gonorrhea",
        triageLevel: "refer within 24 hours",
        triageDescription:
            "Refer the patient to a health facility. They should seek care within 24 hours.",
        refer: true,
        medications: [],
        tests: [],
        recommendations:
            "Provide counseling to the patient on prevention methods, infection, and continuation of treatment.",
    },
    {
        diagnosis: "bacterial vaginosis",
        triageLevel: "home based care",
        triageDescription:
            "The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
        refer: false,
        medications: ["Metronidazole"],
        tests: [],
        recommendations: "",
    },
    {
        diagnosis: "human papilomavirus (HPV)",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        refer: true,
        medications: ["HPV Screening"],
        tests: [],
        recommendations: "",
    },
    {
        diagnosis: "coryza",
        triageLevel: "home based care",
        triageDescription:
            "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
        refer: false,
        medications: ["Antihistamines (If available)", "Paracetamol (Syrup for children)"],
        tests: [],
        recommendations:
            "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids.",
    },
    {
        diagnosis: "malaria",
        triageLevel: "refer immediately",
        triageDescription: "Refer the patient to a health facility immediately.",
        refer: true,
        medications: ["ALU", "Diazepam"],
        tests: ["MRDT"],
        recommendations:
            "Begin patient on ALU/Quinine and document with patient. Give diazepam if convulsing and document.",
    },
    {
        diagnosis: "influenza",
        triageLevel: "home based care",
        triageDescription:
            "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
        refer: false,
        medications: ["Paracetamol", "Nasal decongestants"],
        tests: ["Full Blood Picture (FBP)"],
        recommendations:
            "Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids.",
    },
    {
        diagnosis: "tonsillitis",
        triageLevel: "home based care",
        triageDescription:
            "The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, if they cannot eat, if their symptoms come back, or if this is the second time with this condition.",
        refer: false,
        medications: ["Ampiclox", "Paracetamol"],
        tests: ["Full Blood Picture (FBP)"],
        recommendations: "Recommend that the patient rests at home.",
    },
    {
        diagnosis: "laryngitis",
        triageLevel: "refer within 24 hours",
        triageDescription:
            "Refer the patient to a health facility. They should seek care within 24 hours.",
        refer: true,
        medications: [],
        tests: [],
        recommendations: "Recommend that the patient rests their voice.",
    },
    {
        diagnosis: "bronchitis",
        triageLevel: "refer within 24 hours",
        triageDescription:
            "Refer the patient to a health facility. They should seek care within 24 hours.",
        refer: true,
        medications: ["Nonsteroidal anti-inflammatory drug (NSAIDs)"],
        tests: ["Chest X-Ray (CXR)"],
        recommendations: "",
    },
    // {
    //     diagnosis: "gorhea",
    //     triageLevel: "refer within 24 hours",
    //     triageDescription: "",
    //     refer: true,
    //     medications: [],
    //     tests: [],
    //     recommendations: "",
    // },
    // {
    //     diagnosis: "gorhea",
    //     triageLevel: "refer within 24 hours",
    //     triageDescription: "",
    //     refer: true,
    //     medications: [],
    //     tests: [],
    //     recommendations: "",
    // },
    {
        diagnosis: "default",
        triageLevel: "refer within 24 hours",
        triageDescription: "",
        refer: true,
        medications: [],
        tests: [],
        recommendations: "",
    },
]
// End here

export function getDiagnosisNextSteps(diagnosis: string): NextStep {
    return (
        nextSteps.find((steps) => steps.diagnosis === diagnosis) ||
        nextSteps.find((steps) => steps.diagnosis === "default")
    )
}
