import _ from "lodash"
interface Translation {
    sw: string
    eng: string
}

interface NextSteps {
    conditions: string[]
    title: Translation
    step: Translation
}

const nextSteps: NextSteps[] = [
    {
        conditions: [
            "covid-19",
            "influenza",
            "pneumonia",
            "tuberculosis",
            "bronchitis",
            "tonsillitis",
            "sinusitis",
            "coryza",
        ],
        title: {
            eng: "Avoid the spread of disease",
            sw: "Epuka kusambaza ugonjwa",
        },
        step: {
            eng:
                "When we are sick, it's important to take measures that help prevent the spread of disease. Wash your hands frequently with soap and water (or using sanitizers when water is not avaiable), cough into your elbow or a tissue, avoid sharing food and drinks, and avoid touching your eyes, nose, and mouth. Additionally, follow social distancing guidelines by maintaining a distance of at least 2 meters from others as often as possible.",
            sw:
                "When we are sick, it's important to take measures that help prevent the spread of disease. Wash your hands frequently with soap and water (or using sanitizers when water is not avaiable), cough into your elbow or a tissue, avoid sharing food and drinks, and avoid touching your eyes, nose, and mouth. Additionally, follow social distancing guidelines by maintaining a distance of at least 2 meters from others as often as possible. ",
        },
    },
    {
        conditions: [
            "pneumonia",
            "covid-19",
            "coryza",
            "influenza",
            "laryngitis",
            "sinusitis",
            "bronchitis",
            "tonsillitis",
        ],
        title: {
            eng: "Rest & drink plenty of fluids",
            sw: "Pumzika na kunywa maji ya kutosha",
        },
        step: {
            eng:
                "Resting allows your body to recover. Take some time to rest and drink plenty of fluids (including water and juice) to stay hydrated.",
            sw:
                "Resting allows your body to recover. Take some time to rest and drink plenty of fluids (including water and juice) to stay hydrated.",
        },
    },
    {
        conditions: ["coryza", "bronchitis"],
        title: {
            eng: "Use a humidifier or vaporizor",
            sw: "Use a humidifier or vaporizor",
        },
        step: {
            eng:
                "Humidifers add moisture to the air to prevent dryness that can cause irritation in many parts of the body. You can use a vaporizor or humidifier to ease the symptoms of congestion.",
            sw:
                "Humidifers add moisture to the air to prevent dryness that can cause irritation in many parts of the body. You can use a vaporizor or humidifier to ease the symptoms of congestion.",
        },
    },
    {
        conditions: ["covid-19"],
        title: {
            eng: "Self Isolate",
            sw: "Self Isolate",
        },
        step: {
            eng:
                "By isolating yourself, you can help protect others and slow the spread of disease, particularly COVID-19. \n\nIf you are experiencing mild symptoms or you have been in contact with someone who might have COVID-19, it is recommended that you stay at home and self-isolate for at least 14 days to limit the spread of infection. Your isolation can end at that time if your symptoms improve significantly and if you have had no fever for at least 72 hours without using medicaiton.",
            sw:
                "By isolating yourself, you can help protect others and slow the spread of disease, particularly COVID-19. \n\nIf you are experiencing mild symptoms or you have been in contact with someone who might have COVID-19, it is recommended that you stay at home and self-isolate for at least 14 days to limit the spread of infection. Your isolation can end at that time if your symptoms improve significantly and if you have had no fever for at least 72 hours without using medicaiton.",
        },
    },
    {
        conditions: ["pneumonia", "covid-19", "tuberculosis"],
        title: {
            eng: "Contact your healthcare provider or make an appointment",
            sw: "Contact your healthcare provider or make an appointment",
        },
        step: {
            eng:
                "If your symptoms are severe or become severe, you should contact your healthcare provider or local hospital to enquire about appropriate medical care and make an appointment. This is an important step to protect others and limit the spread of disease. \n\nNeed an appointment? We can help you set up an appointment with a facility near you, and we will let the healthcare providers know that you are coming. Click here...",
            sw:
                "If your symptoms are severe or become severe, you should contact your healthcare provider or local hospital to enquire about appropriate medical care and make an appointment. This is an important step to protect others and limit the spread of disease. \n\nNeed an appointment? We can help you set up an appointment with a facility near you, and we will let the healthcare providers know that you are coming. Click here...",
        },
    },
    {
        conditions: ["pneumonia", "tuberculosis", "copd", "asthma"],
        title: {
            eng: "Seek medical care",
            sw: "Tembelea kituo cha afya kilichopo karibu yako",
        },
        step: {
            eng:
                "Based on your symptoms, it is recommended that you visit a health facility to get further tests or a physical exam. From there, your healthcare provider or doctor will provide you with the next steps.",
            sw:
                "Based on your symptoms, it is recommended that you visit a health facility to get further tests or a physical exam. From there, your healthcare provider or doctor will provide you with the next steps.",
        },
    },
    {
        conditions: [
            "pneumonia",
            "covid-19",
            "coryza",
            "influenza",
            "laryngitis",
            "sinusitis",
            "bronchitis",
            "tonsillitis",
        ],
        title: {
            eng: "If your symptoms worsen, seek medical attention immediately",
            sw: "Dalili zikiendelea, tembelea kituo cha afya cha karibu yako",
        },
        step: {
            eng:
                "If you symptoms aren't improving, you are in a high-risk group, or your symptoms persist for more than a few weeks, please seek medical attention. If you are having difficulty breathing, seek medical care immediately.",
            sw:
                "If you symptoms aren't improving, you are in a high-risk group, or your symptoms persist for more than a few weeks, please seek medical attention. If you are having difficulty breathing, seek medical care immediately.",
        },
    },
    {
        conditions: ["tonsillitis"],
        title: {
            eng: "Gargle with salt water",
            sw: "Sukutua na maji ya chumvi",
        },
        step: {
            eng:
                "Gargling with salt water can ease sore throat symptoms. Mix 1 teaspoon (5 milliliters) of table salt with 8 ounces (237 milliliters) of warm water, gargle, and then spit out the solution.",
            sw:
                "Gargling with salt water can ease sore throat symptoms. Mix 1 teaspoon (5 milliliters) of table salt with 8 ounces (237 milliliters) of warm water, gargle, and then spit out the solution.",
        },
    },
    {
        conditions: [
            "pneumonia",
            "covid-19",
            "coryza",
            "influenza",
            "laryngitis",
            "sinusitis",
            "bronchitis",
            "asthma",
            "copd",
            "tonsillitis",
        ],
        title: {
            eng: "Treat symptoms with over the counter medication",
            sw: "Treat symptoms with over the counter medication",
        },
        step: {
            eng:
                "Over the counter medications from a pharmacy such as painkillers, decongestant sprays, cough medication, throat lozenges, etc. can help provide relief to your symptoms. Warm compresses can also be used to ease pain in the face or eyes.",
            sw:
                "Over the counter medications from a pharmacy such as painkillers, decongestant sprays, cough medication, throat lozenges, etc. can help provide relief to your symptoms. Warm compresses can also be used to ease pain in the face or eyes.",
        },
    },
    {
        conditions: [
            "pneumonia",
            "asthma",
            "coryza",
            "sinusitis",
            "bronchitis",
            "copd",
            "tuberculosis",
        ],
        title: {
            eng: "Avoid pollutants & irritants",
            sw: "Avoid pollutants & irritants",
        },
        step: {
            eng:
                "Air irritants such as smoke or outdoor pollution can irritate your respiratory tract and make your symptoms worse. It is recommended that you avoid these irritants as much as possible. If you are a smoker, please stop smoking to avoid exacerbating your condition.",
            sw:
                "Air irritants such as smoke or outdoor pollution can irritate your respiratory tract and make your symptoms worse. It is recommended that you avoid these irritants as much as possible. If you are a smoker, please stop smoking to avoid exacerbating your condition.",
        },
    },
    {
        conditions: ["laryngitis"],
        title: {
            eng: "Rest your voice",
            sw: "Pumzisha sauti yako",
        },
        step: {
            eng:
                "It's important to give your voice a break, especially if you are experiencing voice loss or hoarseness. Take time to relax your vocal cords until your condition improves.",
            sw:
                "It's important to give your voice a break, especially if you are experiencing voice loss or hoarseness. Take time to relax your vocal cords until your condition improves.",
        },
    },
    {
        conditions: ["covid-19"],
        title: {
            eng: "Call the COVID-19 hotline",
            sw: "Call the COVID-19 hotline",
        },
        step: {
            eng:
                "It is possible for someone to transmit COVID-19 to someone else, even if they are not showing any symptoms. Please call the Ministry of Health COVID-19 help line if you are experiencing symptoms of COVID-19, know someone who is experiencing symptoms, or have questions about resources.",
            sw:
                "It is possible for someone to transmit COVID-19 to someone else, even if they are not showing any symptoms. Please call the Ministry of Health COVID-19 help line if you are experiencing symptoms of COVID-19, know someone who is experiencing symptoms, or have questions about resources.",
        },
    },
    {
        conditions: ["pneumonia", "tuberculosis", "tonsillitis", "covid-19", "coryza", "influenza"],
        title: {
            eng: "Monitor your symptoms",
            sw: "Monitor your symptoms",
        },
        step: {
            eng:
                "It can be helpful to track your symptoms over time to see whether or not your condition is improving. You can track your symptoms using our Symptom Tracker tool, and we will let you know if our recommendations change.",
            sw:
                "It can be helpful to track your symptoms over time to see whether or not your condition is improving. You can track your symptoms using our Symptom Tracker tool, and we will let you know if our recommendations change.",
        },
    },
]

export function getStep(name: string): NextSteps[] {
    return nextSteps.filter((st) => st.conditions.includes(name))
}

export function getMultiStep(names: string[]): NextSteps[] {
    // @ts-ignore
    return _.uniqBy(_.flatten(names.map((name) => getStep(name))), "title.eng")
}

const testRecommendations = {
    "cryptococcal meningitis": [
        "CrAG",
        "Albumin",
        "FBP",
        "CT/MRI",
        "Lumbar puncture",
        "CSF culture",
        "Microscopy of CSF (India Ink Staining)",
        "CD4",
    ],
    toxoplasmosis: ["CD4", "Anti-toxoplasma", "CT/MRI"],
    "pneumocystis pneumonia": [
        "CD4",
        "LDH",
        "Chest X Ray",
        "Chest CT",
        "Sputum PCR",
        "Miscroscopy ",
        "1-2-Beta-D-glucan",
    ],
    tuberculosis: ["Sputum smear microscopy", "Chest X Ray", "Sputum PCR"],
    pneumonia: ["Complete Blood Count", "Blood culture", "C-Reactive Protein (CRP)", "Arterial Blood Gas", "CHEST X-ray"],
}

export function getTests(conditions: string[]): string[] {
    return _.uniq(
        _.flattenDeep(conditions.map((condition) => testRecommendations[condition] || [])),
    )
}

interface MedicationListItem {
    condition: string
    title: string
    options: {
        medication: string
        concentration?: string
        days?: number
        dailyFrequency?: number
    }[]
}

export const medicationsList: MedicationListItem[] = [
    {
        condition: "hepatitis b",
        title: "To treat Hepatitis B",
        options: [
            {
                medication: "Tenofovir",
                concentration: "300mg",
                days: 12,
                dailyFrequency: 3,
            },
            {
                medication: "Lamivudine",
            },
        ],
    },
    {
        condition: "cough",
        title: "To treat cough",
        options: [
            {
                medication: "Liquid cough medicine",
            },
        ],
    },
    {
        condition: "pain",
        title: "To treat pain",
        options: [
            {
                medication: "Paracetamol",
                concentration: "300mg",
            },
        ],
    },
    {
        condition: "cryptococcal meningitis",
        title: "To treat Cryptococcal Meningitis",
        options: [
            {
                medication: "Manage Intracranial Pressure",
            },
            {
                medication:
                    "1 week of Amphotericin B + Flucytosine, followed by 9 weeks of fluconazole. Follow this with a low dose fluconazole for one year until CD4 > 100.",
            },
        ],
    },
    {
        condition: "pneumocystis pneumonia",
        title: "To treat Pneumocystis Pneumonia",
        options: [
            {
                medication: "Trimethoprim IV",
                days: 21,
                dailyFrequency: 3,
                concentration: "15-20mg",
            },
            {
                medication: "Sulfamethoxale IV",
                days: 21,
                dailyFrequency: 3,
                concentration: "75-100mg",
            },
        ],
    },
]

export function getTreatments(conditions: string[]): MedicationListItem[] {
    return medicationsList.filter((medicationObj) => conditions.includes(medicationObj.condition))
}
