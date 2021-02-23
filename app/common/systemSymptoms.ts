import _ from "lodash"

export type symptomState = "absent" | "present" | "unkown"
export type systemName =
    | "integumentary"
    | "psychiatric"
    | "hematology"
    | "renal"
    | "reproductive"
    | "general"
    | "musculoskeletal"
    | "gastroentestinal"
    | "earsnoseandthroat"
    | "ocular"
    | "nervous"
    | "respiratory"
    | "cardiovascular"
export interface SystemSymptom {
    symptom: string
    name: string
    value: symptomState
    system?: systemName
    children: SystemSymptom[]
    title?: string
}

export type SystemSymptoms = SystemSymptom[]

const GISymptoms: SystemSymptoms = [
    {
        symptom: "abdominal pain",
        name: "Abdominal Pain",
        value: "absent",
        system: "gastroentestinal",
        children: [
            {
                title: "Type?",
                name: "abdominal pain type",
                symptom: "abdominal pain type",
                children: [
                    {
                        symptom: "epigastric pain",
                        name: "Epigastric Pain",
                        value: "absent",
                        children: [
                            {
                                title: "When?",
                                name: "when",
                                symptom: "when",
                                children: [
                                    {
                                        symptom: "epigastric pain before meals",
                                        name: "Before Meals",
                                        value: "absent",
                                        children: [],
                                    },
                                    {
                                        symptom: "epigastric pain after meals",
                                        name: "After Meals",
                                        value: "absent",
                                        children: [],
                                    },
                                ],
                            },
                            {
                                title: "Type?",
                                name: "epigastric pain type",
                                symptom: "epigastric pain type",
                                children: [
                                    {
                                        symptom: "burning epigastric pain",
                                        name: "Burning Epigastric Pain",
                                        value: "absent",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        symptom: "umbilical pain",
                        name: "Umbilical Pain",
                        value: "absent",
                        children: [],
                    },
                    {
                        symptom: "hypogastric pain",
                        name: "Hypogastric Pain",
                        value: "absent",
                        children: [],
                    },
                    {
                        symptom: "abdominal pain radiates to back",
                        name: "Radiates to back",
                        value: "absent",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "abdominal tenderness",
        name: "Abdominal Tenderness",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "nausea",
        name: "Nausea",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "vomiting",
        name: "Vomiting",
        value: "absent",
        system: "gastroentestinal",
        children: [
            {
                title: "Type?",
                name: "vomiting content",
                symptom: "vomiting content",
                children: [
                    {
                        symptom: "food",
                        name: "Food",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                    {
                        symptom: "bile",
                        name: "Bile",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                    {
                        symptom: "blood",
                        name: "Blood",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "diarrhoea",
        name: "Diarrhoea",
        value: "absent",
        system: "gastroentestinal",
        children: [
            {
                title: "Consistency?",
                name: "diarrhoea consistency",
                symptom: "diarrhoea consistency",
                children: [
                    {
                        symptom: "normal",
                        name: "Normal",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                    {
                        symptom: "hard",
                        name: "Hard",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                    {
                        symptom: "watery diarrhoea",
                        name: "Watery",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                    {
                        symptom: "rice water diarrhoea",
                        name: "Rice Water",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                    {
                        symptom: "bloody diarrhoea",
                        name: "Bloody",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "indigestion",
        name: "Indigestion/ Upset Stomach",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "bloating",
        name: "Bloating",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "belching",
        name: "Belching",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "difficulty swallowing",
        name: "Difficulty swallowing",
        value: "absent",
        system: "gastroentestinal",
        children: [
            {
                title: "Complications?",
                name: "difficulty swallowing complications",
                symptom: "difficulty swallowing complications",
                children: [
                    {
                        symptom: "pain when swallowing",
                        name: "Pain when swallowing",
                        value: "absent",
                        system: "gastroentestinal",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "heartburn",
        name: "Heartburn",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "constipation",
        name: "Constipation",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "flatulence",
        name: "Flatulence",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
    {
        symptom: "fecal incontinence",
        name: "Fecal Incontinence",
        value: "absent",
        system: "gastroentestinal",
        children: [],
    },
]

const RespiratorySymptoms: SystemSymptoms = [
    {
        symptom: "cough",
        name: "Cough",
        value: "absent",
        system: "respiratory",
        children: [
            {
                title: "Type?",
                name: "cough type",
                symptom: "cough type",
                children: [
                    {
                        symptom: "dry cough",
                        name: "Dry Cough",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                    {
                        symptom: "productive cough",
                        name: "Productive Cough",
                        value: "absent",
                        system: "respiratory",
                        children: [
                            {
                                title: "Sputum Color",
                                name: "sputum color",
                                symptom: "sputum color",
                                children: [
                                    {
                                        symptom: "white sputum",
                                        name: "White",
                                        value: "absent",
                                        children: [],
                                    },
                                    {
                                        symptom: "clear sputum",
                                        name: "Clear",
                                        value: "absent",
                                        children: [],
                                    },
                                    {
                                        symptom: "green sputum",
                                        name: "Green",
                                        value: "absent",
                                        children: [],
                                    },
                                    {
                                        symptom: "yellow sputum",
                                        name: "Yellow",
                                        value: "absent",
                                        children: [],
                                    },
                                    {
                                        symptom: "red sputum",
                                        name: "Red",
                                        value: "absent",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: "Time of Day?",
                name: "when",
                symptom: "when",
                children: [
                    {
                        symptom: "morning",
                        name: "Morning",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                    {
                        symptom: "afternoon",
                        name: "Afternoon",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                    {
                        symptom: "night",
                        name: "Night",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "chest pain",
        name: "Chest Pain",
        value: "absent",
        system: "respiratory",
        children: [],
    },
    {
        symptom: "bradypnea",
        name: "Bradypnea (Slow breathing)",
        value: "absent",
        system: "respiratory",
        children: [],
    },
    {
        symptom: "tachypnoea",
        name: "Tachypneoa (Fast breathing)",
        value: "absent",
        system: "respiratory",
        children: [],
    },
    {
        symptom: "hypopnea",
        name: "Hypopnea (Shallow Breathing)",
        value: "absent",
        system: "respiratory",
        children: [],
    },
    {
        symptom: "dyspnoea",
        name: "Dyspnoea (Shortness of breath)",
        value: "absent",
        system: "respiratory",
        children: [
            {
                title: "When",
                name: "dyspnoea when",
                symptom: "dyspnoea when",
                children: [
                    {
                        symptom: "at rest",
                        name: "At rest",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                    {
                        symptom: "upon exertion",
                        name: "Upon exertion",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "hypoxia",
        name: "Hypoxia",
        value: "absent",
        system: "respiratory",
        children: [],
    },
    {
        symptom: "abnormal breath sounds",
        name: "Abnormal Breath Sounds",
        value: "absent",
        system: "respiratory",
        children: [
            {
                title: "Type?",
                name: "breathing sounds type",
                symptom: "breathing sounds type",
                children: [
                    {
                        symptom: "wheezing",
                        name: "Wheezing",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                    {
                        symptom: "rales",
                        name: "Rales",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                    {
                        symptom: "rhonchi",
                        name: "Rhonchi",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                    {
                        symptom: "stridor",
                        name: "Stridor",
                        value: "absent",
                        system: "respiratory",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "cyanosis",
        name: "Cyanosis",
        value: "absent",
        system: "respiratory",
        children: [
            {
                symptom: "central",
                name: "Central",
                value: "absent",
                system: "respiratory",
                children: [],
            },
            {
                symptom: "peripheral",
                name: "Peripheral",
                value: "absent",
                system: "respiratory",
                children: [],
            },
        ],
    },
]

const EarsNoseAndThroat: SystemSymptoms = [
    {
        symptom: "epistaxis",
        name: "Epistaxis / Nose Bleed",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
    {
        symptom: "nasal discharge",
        name: "Nasal Discharge",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
    {
        symptom: "hearing impairment",
        name: "Hearing impairment",
        value: "absent",
        system: "earsnoseandthroat",
        children: [
            {
                title: "Type?",
                name: "hearing impairment type",
                symptom: "hearing impairment type",
                children: [
                    {
                        symptom: "left side",
                        name: "Left side",
                        value: "absent",
                        system: "earsnoseandthroat",
                        children: [],
                    },
                    {
                        symptom: "right side",
                        name: "Right side",
                        value: "absent",
                        system: "earsnoseandthroat",
                        children: [],
                    },
                    {
                        symptom: "both side",
                        name: "Both side",
                        value: "absent",
                        system: "earsnoseandthroat",
                        children: [],
                    },
                ],
            },
            {
                title: "Severity?",
                name: "severity",
                symptom: "severity",
                children: [
                    {
                        symptom: "mild",
                        name: "Mild",
                        value: "absent",
                        system: "earsnoseandthroat",
                        children: [],
                    },
                    {
                        symptom: "moderate",
                        name: "Moderate",
                        value: "absent",
                        system: "earsnoseandthroat",
                        children: [],
                    },
                    {
                        symptom: "severe",
                        name: "Severe",
                        value: "absent",
                        system: "earsnoseandthroat",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "ear pain",
        name: "Ear Pain/ Earache",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },

    {
        symptom: "tinnitus",
        name: "Tinnitus / Ringing in the Ear",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },

    {
        symptom: "trismus",
        name: "Trismus/ Lockjaw",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },

    {
        symptom: "tooth pain",
        name: "Toothache",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },

    {
        symptom: "facial pain",
        name: "Facial Pain",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },

    {
        symptom: "facial numbness",
        name: "Facial Numbness",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
    {
        symptom: "oral thrush",
        name: "White Patches Inside Mouth",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
    {
        symptom: "mouth sores",
        name: "Mouth sores/ ulcers",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
    {
        symptom: "sore throat",
        name: "Sore throat",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
    {
        symptom: "halitosis",
        name: "Halitosis",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
    {
        symptom: "dry mouth",
        name: "Dry Mouth",
        value: "absent",
        system: "earsnoseandthroat",
        children: [],
    },
]

const Ocular: SystemSymptoms = [
    {
        symptom: "eye pain",
        name: "Eye Pain",
        value: "absent",
        system: "ocular",
        children: [],
    },
    {
        symptom: "eye discharge",
        name: "Eye discharge",
        value: "absent",
        system: "ocular",
        children: [],
    },
    {
        symptom: "visual impairment",
        name: "Visual Impairment",
        value: "absent",
        system: "ocular",
        children: [
            {
                title: "Type?",
                name: "visual impairment type",
                symptom: "visual impairment type",
                children: [
                    {
                        symptom: "central vision loss",
                        name: "Central Vision Loss",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                    {
                        symptom: "peripheral vision loss",
                        name: "Peripheral Vision Loss",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                    {
                        symptom: "blurred vision",
                        name: "Blurred Vision",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                    {
                        symptom: "extreme light sensitivity",
                        name: "Extreme light sensitivity",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                    {
                        symptom: "night blindness",
                        name: "Night Blindness",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                    {
                        symptom: "complete blindness",
                        name: "Complete Blindness",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "red eyes",
        name: "Red Eyes",
        value: "absent",
        system: "ocular",
        children: [],
    },
    {
        symptom: "sunken eyes",
        name: "Sunken Eyes",
        value: "absent",
        system: "ocular",
        children: [],
    },
    {
        symptom: "pupil change",
        name: "Changes in Pupils",
        value: "absent",
        system: "ocular",
        children: [
            {
                title: "Type?",
                name: "change type",
                symptom: "change type",
                children: [
                    {
                        symptom: "mydriasis",
                        name: "Mydriasis (Dilation of pupil)",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                    {
                        symptom: "myosis",
                        name: "Myosis (Constriction of pupil)",
                        value: "absent",
                        system: "ocular",
                        children: [],
                    },
                ],
            },
        ],
    },
]

const CNS: SystemSymptoms = [
    {
        symptom: "headache",
        name: "Headache",
        value: "absent",
        system: "nervous",
        children: [
            {
                title: "Type?",
                name: "headache type",
                symptom: "headache type",
                children: [
                    {
                        symptom: "dull",
                        name: "Dull pain",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                    {
                        symptom: "severe",
                        name: "Severe or Stabbing pain",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                    {
                        symptom: "throbbing pain",
                        name: "Throbbing pain",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                ],
            },
            {
                title: "Frequency?",
                name: "headache frequency",
                symptom: "headache frequency",
                children: [
                    {
                        symptom: "chronic headache",
                        name: "Chronic (Recurring regularly)",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "seizures",
        name: "Seizures",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "dizziness",
        name: "Dizziness",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "photophobia",
        name: "Photophobia (light sensitivity)",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "focal neurological deficit",
        name: "Focal neurological deficit",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "altered mental status",
        name: "Altered mental status",
        value: "absent",
        system: "nervous",
        children: [
            {
                title: "Type?",
                name: "altered mental status type",
                symptom: "altered mental status type",
                children: [
                    {
                        symptom: "confusion",
                        name: "Confusion",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                    {
                        symptom: "memory loss",
                        name: "Memory Loss (Amnesia)",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                    {
                        symptom: "disorientation",
                        name: "Disorientation (not aware of time or place)",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                    {
                        symptom: "unusual behavior",
                        name: "Unusual behavior",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "stiff neck",
        name: "Stiff neck",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "neck pain",
        name: "Neck Pain",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "nightmares",
        name: "Nightmares",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "abnormal posturing",
        name: "Abnormal Posturing",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "tremors",
        name: "Tremor",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "insomnia",
        name: "Insomnia",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "loss of consiousness",
        name: "Loss of Consiousness",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "coma",
        name: "Coma",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "fainting",
        name: "Fainting",
        value: "absent",
        system: "nervous",
        children: [],
    },
    {
        symptom: "paralysis",
        name: "Paralysis",
        value: "absent",
        system: "nervous",
        children: [],
    },
]

const MusculoskeletalSymptoms: SystemSymptoms = [
    {
        symptom: "joint pain",
        name: "Joint Pain",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "swollen joints",
        name: "Joint Swelling",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "muscle aches",
        name: "Aching Muscles",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "muscle weakness",
        name: "Muscle Weakness",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "myalgia",
        name: "Myalgia/ muscle pain",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "back pain",
        name: "Back Pain",
        value: "absent",
        system: "musculoskeletal",
        children: [
            {
                title: "Complications?",
                name: "back pain complications",
                symptom: "back pain complications",
                children: [
                    {
                        symptom: "sciatica",
                        name: "Sciatica",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                ],
            },
        ],
    },
]

const GeneralSymptoms: SystemSymptoms = [
    {
        symptom: "fever",
        name: "Fever",
        value: "absent",
        system: "general",
        children: [
            {
                title: "Grade?",
                name: "fever grade",
                symptom: "fever grade",
                children: [
                    {
                        symptom: "high grade fever",
                        name: "High grade",
                        value: "absent",
                        system: "general",
                        children: [],
                    },
                    {
                        symptom: "low grade fever",
                        name: "Low grade",
                        value: "absent",
                        system: "general",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "weight loss",
        name: "Weight Loss",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "weight gain",
        name: "Weight Gain",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "chills",
        name: "Chills",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "night sweats",
        name: "Night Sweats",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "jaundice",
        name: "Jaundice",
        value: "absent",
        system: "eyesandears",
        children: [
            {
                title: "Time of observation?",
                name: "observationTime",
                symptom: "observationTime",
                children: [
                    {
                        symptom: "observed now",
                        name: "Observed  now",
                        value: "absent",
                        system: "eyesandears",
                        children: [],
                    },
                    {
                        symptom: "patient reported",
                        name: "Patient Reported",
                        value: "absent",
                        system: "eyesandears",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "loss of appetite",
        name: "loss of appetite",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "fatigue",
        name: "Fatigue (extreme tiredness)",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "lethargy",
        name: "Lethargy (low energy)",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "malaise",
        name: "Malaise (lack of well-being)",
        value: "absent",
        system: "musculoskeletal",
        children: [],
    },
    {
        symptom: "convulsions",
        name: "Convulsions",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "hypothermia",
        name: "Hypothermia",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "swollen lymph nodes",
        name: "Swollen Lymph Nodes",
        value: "absent",
        system: "general",
        children: [],
    },
    {
        symptom: "insomnia",
        name: "Difficulty Sleeping (insomnia)",
        value: "absent",
        system: "general",
        children: [],
    },
]

const ReproductiveSymptoms: SystemSymptoms = [
    {
        symptom: "abnormal vaginal bleeding",
        name: "Abnormal Vaginal Bleeding (Women)",
        value: "absent",
        system: "reproductive",
        children: [
            {
                title: "Type?",
                name: "abnormal vaginal bleeding type",
                symptom: "abnormal vaginal bleeding type",
                children: [
                    {
                        symptom: "abnormal vaginal bleeding in early pregnancy",
                        name: "Vaginal bleeding in early pregnancy",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "abnormal vaginal bleeding in late pregnancy",
                        name: "Vaginal bleeding in late pregnancy",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "postcoital bleeding",
                        name: "Vaginal bleeding after intercourse",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "amenorrhea",
                        name: "Amenorrhea",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "menorrhagia",
                        name: "Menorrhagia (Spotting)",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "vaginal discharge",
        name: "Vaginal Discharge (Women)",
        value: "absent",
        system: "reproductive",
        children: [
            {
                title: "Type?",
                name: "vaginal discharge type",
                symptom: "vaginal discharge type",
                children: [
                    {
                        symptom: "watery vaginal discharge",
                        name: "Watery",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "white vaginal discharge",
                        name: "White",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "thick vaginal discharge",
                        name: "Thick",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },

            {
                title: "Smell?",
                name: "vaginal discharge smell",
                symptom: "vaginal discharge smell",
                children: [
                    {
                        symptom: "foul vaginal discharge",
                        name: "Foul Smelling",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "fishy vaginal discharge",
                        name: "Fishy Smelling",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },
            {
                title: "Color?",
                name: "vaginal discharge color",
                symptom: "vaginal discharge color",
                children: [
                    {
                        symptom: "green vaginal discharge",
                        name: "Green",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "yellow vaginal discharge",
                        name: "Yellow",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "white vaginal discharge",
                        name: "White",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "grey vaginal discharge",
                        name: "Grey",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "penile discharge",
        name: "Penile Discharge (Men)",
        value: "absent",
        system: "reproductive",
        children: [
            {
                title: "Type?",
                name: "penile discharge type",
                symptom: "penile discharge type",
                children: [
                    {
                        symptom: "penile discharge thick",
                        name: "Thick",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "penile discharge watery",
                        name: "Watery",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },
            {
                title: "Color?",
                name: "penile discharge color",
                symptom: "penile discharge color",
                children: [
                    {
                        symptom: "penile discharge white",
                        name: "White",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "penile discharge clear",
                        name: "Clear",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "genital sores",
        name: "Sores or Ulcers",
        value: "absent",
        system: "reproductive",
        children: [
            {
                title: "Type?",
                name: "genital sores type",
                symptom: "genital sores type",
                children: [
                    {
                        symptom: "painless sores",
                        name: "Painless (chancres)",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "painful sores",
                        name: "Painful",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },
            {
                title: "Location?",
                name: "genital sores location",
                symptom: "genital sores location",
                children: [
                    {
                        symptom: "genital sores",
                        name: "Genitals",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                    {
                        symptom: "rectal sores",
                        name: "Rectum",
                        value: "absent",
                        system: "reproductive",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "urethral discharge",
        name: "Urethral discharge",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    // {
    //     symptom: "genital burning",
    //     name: "Genital burning or tingling",
    //     value: "absent",
    //     system: "reproductive",
    //     children: [],
    // },

    {
        symptom: "genital warts",
        name: "Warts on Genitals",
        value: "absent",
        system: "reproductive",
        children: [],
    },

    {
        symptom: "pelvic pain",
        name: "Pelvic Pain",
        value: "absent",
        system: "reproductive",
        children: [],
    },

    {
        symptom: "painful intercourse",
        name: "Painful Intercourse",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    {
        symptom: "genital burning",
        name: "Genital Burning or Tingling",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    {
        symptom: "genital itching",
        name: "Genital Itching",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    {
        symptom: "genital inflammation",
        name: "Genital Inflammation/ Swelling",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    {
        symptom: "retrograde ejaculation",
        name: "Retrograde Ejaculation",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    {
        symptom: "impotence",
        name: "Impotence",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    {
        symptom: "testicular pain",
        name: "Testicular Pain",
        value: "absent",
        system: "reproductive",
        children: [],
    },
    {
        symptom: "testicular swelling",
        name: "Testicular Swelling",
        value: "absent",
        system: "reproductive",
        children: [],
    },
]

const RenalSymptoms: SystemSymptoms = [
    {
        symptom: "dark urine",
        name: "Dark coloured urine",
        value: "absent",
        system: "renal",
        children: [],
    },
    {
        symptom: "dysuria",
        name: "Dysuria (Painful Urination)",
        value: "absent",
        system: "renal",
        children: [],
    },
    {
        symptom: "polyuria",
        name: "Polyuria (Excessive Urination)",
        value: "absent",
        system: "renal",
        children: [],
    },
    {
        symptom: "hematuria",
        name: "Hematuria (Blood in Urine)",
        value: "absent",
        system: "renal",
        children: [],
    },
    {
        symptom: "frequent micturation",
        name: "Frequent Urination",
        value: "absent",
        system: "renal",
        children: [
            {
                title: "When?",
                name: "frequent micturation time",
                symptom: "frequent micturation time",
                children: [
                    {
                        symptom: "nocturia",
                        name: "Nighttime (Nocturia)",
                        value: "absent",
                        system: "renal",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "urinary incontinence",
        name: "Urinary Incontinence",
        value: "absent",
        system: "renal",
        children: [],
    },
    {
        symptom: "urinary retention",
        name: "Urinary Retention",
        value: "absent",
        system: "renal",
        children: [],
    },
]

const HematologicSymptoms: SystemSymptoms = [
    {
        symptom: "anaemia",
        name: "Anemia",
        value: "absent",
        system: "hematology",
        children: [],
    },
    {
        symptom: "easy bleeding",
        name: "Easy Bleeding",
        value: "absent",
        system: "hematology",
        children: [],
    },
    {
        symptom: "easy bruising",
        name: "Easy Bruising",
        value: "absent",
        system: "hematology",
        children: [],
    },
]

const PsychiatricSymptoms: SystemSymptoms = [
    {
        symptom: "anhedonia",
        name: "Anhedonia (Reduced Motivation)",
        value: "absent",
        system: "psychiatric",
        children: [],
    },
    {
        symptom: "anxiety",
        name: "Anxiety",
        value: "absent",
        system: "psychiatric",
        children: [],
    },
    {
        symptom: "apathy",
        name: "Apathy",
        value: "absent",
        system: "psychiatric",
        children: [],
    },
    {
        symptom: "depression",
        name: "Depression",
        value: "absent",
        system: "psychiatric",
        children: [],
    },
    {
        symptom: "irritability",
        name: "Irritability",
        value: "absent",
        system: "psychiatric",
        children: [],
    },
    {
        symptom: "mood swings",
        name: "Mood Swings/ Changes in Mood",
        value: "absent",
        system: "psychiatric",
        children: [],
    },
    {
        symptom: "hallucinations",
        name: "Hallucinations",
        value: "absent",
        system: "psychiatric",
        children: [],
    },
]

const IntegumentarySymptoms: SystemSymptoms = [
    {
        symptom: "alopecia",
        name: "Alopecia/ Hair Loss",
        value: "absent",
        system: "integumentary",
        children: [],
    },
    {
        symptom: "nail changes",
        name: "Nail Changes",
        value: "absent",
        system: "integumentary",
        children: [
            {
                title: "Pliability?",
                name: "nail pliability",
                symptom: "nail pliability",
                children: [
                    {
                        symptom: "brittle nails",
                        name: "Brittle Nails",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "nail splitting",
                        name: "Splitting Nails",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "abnormally thick nails",
                        name: "Abnormal Thickness",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
            {
                title: "Shape?",
                name: "nail shape",
                symptom: "nail shape",
                children: [
                    {
                        symptom: "nail clubbing",
                        name: "Nail clubbing",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "nail pitting",
                        name: "Pitting of the nails",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
            {
                title: "Color?",
                name: "nail color",
                symptom: "nail color",
                children: [
                    {
                        symptom: "yellow nails",
                        name: "Yellow",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "brown nails",
                        name: "Brown or Copper",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "red nails",
                        name: "Redness",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "skin rash",
        name: "Skin Rash",
        value: "absent",
        system: "integumentary",
        children: [
            {
                title: "Features?",
                name: "skin rash features",
                symptom: "skin rash features",
                children: [
                    {
                        symptom: "itchy skin rash",
                        name: "Itching",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "bumpy skin rash",
                        name: "Bumpy",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "dry skin rash",
                        name: "Chapped/ Dry",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "blistered skin rash",
                        name: "Cracked/ Blistered",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "painful skin rash",
                        name: "Painful",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "swollen skin rash",
                        name: "Swollen",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "coper penny skin rash",
                        name: "Copper Penny",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
            {
                title: "Location?",
                name: "skin rash location",
                symptom: "skin rash location",
                children: [
                    {
                        symptom: "entire body skin rash",
                        name: "Entire body",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "extremities skin rash",
                        name: "Hands and Feets",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "limb skin rash",
                        name: "Arms/ Legs",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "chest skin rash",
                        name: "Trunk/ Chest",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "head skin rash",
                        name: "Head",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "skin lesion",
        name: "Skin Lesion",
        value: "absent",
        system: "integumentary",
        children: [
            {
                title: "Type?",
                name: "skin lesion type",
                symptom: "skin lesion type",
                children: [
                    {
                        symptom: "weal skin lesion",
                        name: "Weal ",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "bump skin lesion",
                        name: "Bump",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "ringworm skin lesion",
                        name: "Ringworm",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "rose spots skin lesion",
                        name: "Rose spots",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
            {
                title: "Margins?",
                name: "skin lesion margins",
                symptom: "skin lesion margins",
                children: [
                    {
                        symptom: "defined",
                        name: "Defined",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "undefined",
                        name: "Undefined",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "burn",
        name: "Burn",
        value: "absent",
        system: "integumentary",
        children: [],
    },
    {
        symptom: "laceration",
        name: "Open Wound/ Laceration",
        value: "absent",
        system: "integumentary",
        children: [],
    },
    {
        symptom: "edema",
        name: "Edema",
        value: "absent",
        system: "integumentary",
        children: [
            {
                title: "Location?",
                name: "edema location",
                symptom: "edema location",
                children: [
                    {
                        symptom: "leg edema",
                        name: "Legs or Feet",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "hand edema",
                        name: "Hands",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "face edema",
                        name: "Face",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                    {
                        symptom: "body edema",
                        name: "Trunk or Body",
                        value: "absent",
                        system: "integumentary",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "bruises",
        name: "Bruises",
        value: "absent",
        system: "integumentary",
        children: [],
    },
    {
        symptom: "blisters",
        name: "Blisters",
        value: "absent",
        system: "integumentary",
        children: [],
    },
    {
        symptom: "pruritus",
        name: "Itchiness",
        value: "absent",
        system: "integumentary",
        children: [],
    },
    {
        symptom: "urticaria",
        name: "Urticaria/ Hives",
        value: "absent",
        system: "integumentary",
        children: [],
    },
]

const CardiovascularSymptoms: SystemSymptoms = [
    {
        symptom: "arrhythmia",
        name: "Arrhythmia",
        value: "absent",
        system: "cardiovascular",
        children: [
            {
                title: "Type?",
                name: "arrhythmia type",
                symptom: "arrhythmia type",
                children: [
                    {
                        symptom: "irregular heartbeat",
                        name: "Irregular Heartbeat",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                    {
                        symptom: "tachycardia",
                        name: "Tachycardia (Fast Heart Rate)",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                    {
                        symptom: "bradycardia",
                        name: "Bradycardia (Slow Heart Rate)",
                        value: "absent",
                        system: "nervous",
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        symptom: "edema",
        name: "Swelling of Feet or Legs",
        value: "absent",
        system: "cardiovascular",
        children: [],
    },
    {
        symptom: "claudication",
        name: "Pain in legs with walking",
        value: "absent",
        system: "cardiovascular",
        children: [],
    },
]

export interface SystemSymptomMapping {
    system: systemName
    name: string
    mapping: SystemSymptoms
}

export const symptomsBySystems: SystemSymptomMapping[] = _.sortBy(
    [
        {
            system: "general",
            name: "General Symptoms",
            mapping: [...GeneralSymptoms],
        },
        {
            system: "cardiovascular",
            name: "Cardiovascular Symptoms",
            mapping: [...CardiovascularSymptoms],
        },
        {
            system: "gastroentestinal",
            name: "Gastroentestinal Symptoms",
            mapping: [...GISymptoms],
        },
        {
            system: "respiratory",
            name: "Respiratory System",
            mapping: [...RespiratorySymptoms],
        },
        {
            system: "earsnoseandthroat",
            name: "Ears, Nose and Throat",
            mapping: [...EarsNoseAndThroat],
        },
        {
            system: "ocular",
            name: "Eyes/ Ocular",
            mapping: [...Ocular],
        },
        {
            system: "nervous",
            name: "Central Nervous System",
            mapping: [...CNS],
        },
        {
            system: "musculoskeletal",
            name: "Musculoskeletal Symptoms",
            mapping: [...MusculoskeletalSymptoms],
        },
        {
            system: "reproductive",
            name: "Reproductive Symptoms",
            mapping: [...ReproductiveSymptoms],
        },
        {
            system: "renal",
            name: "Renal Symptoms",
            mapping: [...RenalSymptoms],
        },
        {
            system: "hematology",
            name: "Hematologic Symptoms",
            mapping: [...HematologicSymptoms],
        },
        {
            system: "psychiatric",
            name: "Psychiatric Symptoms",
            mapping: [...PsychiatricSymptoms],
        },
        {
            system: "integumentary",
            name: "Integumentary - Hair, Nails, Skin",
            mapping: [...IntegumentarySymptoms],
        },
    ],
    ["name"],
)

export const getSystemWithPresentSymptom = (
    systemsTree: SystemSymptomMapping[],
): SystemSymptomMapping[] => {
    const filteredSystems = systemsTree.filter((system) => {
        return JSON.stringify(system).includes(`"value":"present"`)
    })
    return filteredSystems
}

// FIXME: add a way to bring systems whose symptoms are of interest to us
export const getRelevantSystems = (systemsTree: SystemSymptomMapping[]): SystemSymptomMapping[] => {
    const filteredSystems = getSystemWithPresentSymptom(systemsTree)

    return filteredSystems
}

// FIXME: Add support for dropdowns (durations)
// FIXME: Add clay colored stool
