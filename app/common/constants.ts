import { getYearsFrom, daysInMonth } from "./utils"
import _ from "lodash"

export const SYMPTOM_PRESENCE = [
    { label: "Yes", value: "present" },
    { label: "No", value: "absent" },
]

export const BOOLEAN_OPTIONS = [
    { label: "Yes", value: true },
    { label: "No", value: false },
]

// export const DAY_NUMBERS = Array.from(Array(daysInMonth(8, 2020)), (_, i) => String(i + 1))
export const DAY_NUMBERS = _.times(31, (n) => n + 1)
export const YEAR_NUMBERS = getYearsFrom(1940)

export const ARV_STAGES = ["Stage 1", "Stage 2", "Stage 3", "Stage 4"]

export const SYMPTOMS: string[] = [
    "Dry cough",
    "Yellow eyes",
    "Abdominal pain",
    "Burning",
    "Numb",
    "Tingling",
    "Dizziness",
    "Nightmare ",
    "Cough",
    "Dyspnoea",
    "Diarrhoea",
    "Fatigue",
    "Fever",
    "Headache",
    "Jaundice",
    "Nausea",
    "Skin rash",
    "Urethral discharge",
    "Weight loss",
    "Malaise",
    "Stiff neck",
    "Photophobia",
    "Vomiting",
    "Coma",
    "Visual loss",
    "Hearing loss",
    "Lethargy",
    "Confusion",
    "Altered mental status",
    "Focal neurological deficit",
    "Diastolic hypertension",
    "Seizures",
    "Non productive cough",
    "Eye pain",
    "Decreased visual acuity",
    "Dark coloured urine",
    "Clay coloured stools",
    "Chills",
    "Chest pain",
    "Tachypneoa",
    "Hypoxia after extertion",
    "Dysuria",
    "Frequent micturation",
    "Pelvic pain",
    "Back pain",
    "Vaginal itching",
    "Vaginal inflammation",
    "Curd like vaginal discharge",
    "Dyspareunia",
    "Prolonged use of antibiotics",
    "Genital Warts",
]

export const MONTH_NAMES: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

export const DRUG_ALLERGIES: string[] = [
    "asprin",
    "sulfer drugs",
    "penicillin",
    "ibuprofen",
    "chemotherapy drugs",
]

export const MARITIAL_STATUS: string[] = [
    "Single",
    "Married",
    "Cohabiting",
    "Divorced/ Separated",
    "Widow/ Widowed",
    "Child (<15 years)",
]

export const DISTRICTS: string[] = [
    "Meru",
    "Arusha City",
    "Arusha",
    "Karatu",
    "Longido",
    "Monduli",
    "Ngorongoro",
    "Hai",
    "Moshi",
    "Moshi Municipal",
    "Mwanga",
    "Rombo",
    "Same",
    "Siha",
    "Other",
]

export const COMEDICATIONS: string[] = [
    "Intracranial pressure management",
    "Amphotericin B",
    "Flucytosine",
    "Fluconazole",
    "Sulfadiazine",
    "Leucovorin",
    "Pyrimethamine",
    "Tenofovir",
    "Lamivudine",
    "Trimethoprim + Sulfamethoxale",
    "Primaquin + clindamycin",
    "Corticosteroids",
    "INH Therapy",
]

export const TESTSLIST: string[] = [
    "CD4",
    "Viral Load",
    "CrAg",
    "Sputum GeneXpert",
    "Chest Xray",
    "HbsAg",
    "Creatinine",
    "CT/MRI",
    "CSF culture",
    "Microscopy of CSF - India Ink Staining",
    "HbeAg",
    "INR",
    "Platelet Count",
    "Interferon",
    "LDH",
    "Chest CT",
    "Sputum PCR",
    "Miscroscopy ",
    "1-2-Beta-D-glucan",
    "Liver function Tests",
    "Renal Function Tests",
    "Lumbar Puncture",
    "Full Blood Picture",
].sort()

export const MEDICATIONSNEXTSTEPS: string[] = [
    "Manage intracranial pressure",
    "1 week of Amphotericin B + Flucytosine, followed by 9 weeks of fluconazole. Follow this with a low dose fluconazole for one year until CD4 > 100. ",
    "Review ARVs",
    "Sulfadiazine tabs 1g 6 hourly for 6 weeks ",
    "Pyrimethamine tabs 100mg loading dose, followed by 50mg per day for 6 weeks",
    "Folic acid tabs 10mg/day for 6 weeks",
    "After 6 weeks, medicate for prophylaxis:",
    "Leucovorin",
    "Tenofovir",
    "Lamivudine",
    "TMP-SMX (Trimethoprim + sulfamethoxale) ",
    "Primaquin + clindamycin (if allergic to SMX)",
    "Corticosteroids (if severe) - cotrimoxazole 1920mg 8 hourly for 21 days ",
    "Anti-TB Therapy",
].sort()

export const MEDICATIONSLIST: string[] = [
    "Intracranial pressure management",
    "Amphotericin B",
    "Flucytosine",
    "Fluconazole",
    "Sulfadiazine",
    "Leucovorin",
    "Pyrimethamine",
    "Tenofovir",
    "Lamivudine",
    "Trimethoprim + Sulfamethoxale",
    "Primaquin + clindamycin",
    "Corticosteroids",
    "Anti-TB therapy",
    "Folic acid tabs",
    "Benzyl benzoate emulsion",
    "Cloxacillin",
    "Erythromycin",
    "Cetrizine",
    "Antihistamine",
    "Ketaconazole",
    "Hydrocortisone cream",
    "Loratadine/cetrizine",
    "Acyclovir",
    "Nyastatin oral suspension",
    "Anti-fungal pessaries",
    "Salicylic acid ointment",
    "Amoxicillin",
    "Azithromycin",
    "Amoxicillin/Clavulanate",
    "Clindamycin",
    "Cephalexin",
    "Ciprofloxacin",
    "Metronidazole",
    "Levofloxacin",
    "Doxycycline",
    "Sulfadoxine–pyrimethamine",
    "Diuretics",
    "Paracetamol",
    "Acetaminophen",
    "Ibuprofen",
]

export const ARVRECOMMENDATIONOPTIONS: string[] = [
    "Not start ARV",
    "Start ARV",
    "Continue ARV",
    "Stop ARV",
    "Restart ARV",
    "Subsitute ARV",
    "Switch to second line",
    "Switch to third line",
]

const changeOrStop = [
    "Start TB treatment",
    "Nausea/vomiting",
    "Diarrhea",
    "Headache",
    "Fever",
    "Rash",
    "Periperal neuropathy",
    "Hepatitis",
    "Jaundice",
    "Dementia",
    "Anaemia",
    "Pancreatitis",
    "CNS adverse event",
    "Other adverse event",
    "Treatment Failure, clinical",
    "Treatment Failure, immunological",
    "Poor adherence",
    "Patient decision",
    "Pregnancy",
    "End of PMTCT",
    "Stock out",
    "Other reason",
]

export const ARVRECOMMENDATIONREASONS: { [key: string]: string[] } = {
    "no-arvs": [
        "Does not fulfill criteria",
        "Fulfills criteria but counseling for ARVs ongoing",
        "Fulfills criteria but no ARVs available",
        "Fulfills criteria but is not willing",
        "Fulfills criteria but is on TB Rx",
        "Fulfills criteria but awaits lab results",
        "Fulfills criteria but has OI and is too sick to start",
        "Fulfills criteria but no start - other",
    ],
    "start-arvs": ["Restart ARV after 3 or more months not on ARV"],
    "continue-arvs": [],
    "change-arvs": [...changeOrStop],
    "stop-arvs": [...changeOrStop],
    "": [],
}

export const medicationReasons = [
    // this is the parent or 'item'
    {
        name: "No Start Reasons",
        id: 0,
        children: ARVRECOMMENDATIONREASONS["no-arvs"].map((child, index) => ({
            name: child,
            id: `${child.split(" ")[0]}-${index}`,
        })),
    },
    {
        name: "Change / Stop ARV Reasons",
        id: 1,
        children: ARVRECOMMENDATIONREASONS["change-arvs"].map((child, index) => ({
            name: child,
            id: `${child.split(" ")[0]}-${index}`,
        })),
    },
    {
        name: "Restart ARV Reasons",
        id: 2,
        children: ARVRECOMMENDATIONREASONS["start-arvs"].map((child, index) => ({
            name: child,
            id: `${child.split(" ")[0]}-${index}`,
        })),
    },
]

export const COUNSELINGTOPICS: string[] = [
    "HIV Transmission, presentation, treatment, disease progression & prevention",
    "Disclosure and identifying treatment supporter",
    "Promoting testing within household",
    "Adolescent and youth friendly services (Adherence, retention, etc)",
    "Prevention of diseases, use of bed nets, environmental and personal hygiene",
    "CPT and IPT",
    "Importance of adherence, how to remind, plan, what to do when traveling, sick, etc. ",
    "Importance of CBHS and PLHIV support group",
    "Importance of appointments, dates and time, planning transport",
    "STIs/RTIs Syndromes",
    "Non-communicable diseases prevention (Nutrition, Expercise, Lifestyle, etc.)",
    "EAC Session (HVL > 1000 Copies/ ML)",
].sort()

// export const COUNSELINGTOPICS: string[] = [
//     "Basic HIV education, transmission",
//     "Prevention: abstience, safer sex, condoms",
//     "Prevention: household precautions, what is safe",
//     "Post-test coundeslling: implications of results ",
//     "Positive living",
//     "Testing partners",
//     "Disclosure",
//     "To whom disclosed (list) ",
//     "Family/ living situation",
//     "Shared confientiality ",
//     "Reproductive choices, prevention MTCT",
//     "Child's blood test",
//     "Progress of disease",
//     "Available treatment/ prophylaxis",
//     "Follow-up appointments, care and treatment team",
//     "CTX, INH prophylaxis ",
//     "ART - education on essentials (locally adapted) ",
//     "Why complete adherece needed",
//     "Adherence preparation, indicate visits",
//     "Indicate when READY for ART: DATE/result, Care and treatment-team discussion",
//     "Explain dose, when to take",
//     "What can occur, how to manage side effects",
//     "What to do if one forgets dose",
//     "What to do when travelling",
//     "Adherence plan (schedule, aids, explain diary)",
//     "Treatment-supporter preparation",
//     "Which doses, why missed",
//     "ARV support group",
//     "How to contact clinic",
//     "Symptom management/ palliateive care at home",
//     "Caregiver booklet",
//     "Home-based care - specify",
//     "Support groups",
//     "Community support",
// ]

export type educationLevels =
    | "no-education"
    | "primary-school"
    | "secondary-school"
    | "higher-education"

export const EDUCATION_LEVELS: educationLevels[] = [
    "no-education",
    "primary-school",
    "secondary-school",
    "higher-education",
]

export const ARVCOMBINATIONREGIMENS: { [regimen: string]: string[] } = {
    "first-line-adults": [
        "1g-A = TDF+3TC+EFV",
        "1b-A = AZT+3TC+NVP",
        "1c-A = AZT+3TC+EFV",
        "1e-A = TDF+FTC+EFV",
        "1k-A = ABC+3TC+EFV",
        "1p-A = ABC+3TC+DTG",
        "1q-A = TDF+FTC+DTG",
        "1r-A = TDF+3TC+DTG",
        "1u-A = AZT+3TC+DTG",
        "1x-A = Other 1st line",
    ],
    "first-line-pediatrics": [
        "1g-P = TDF+3TC+EFV",
        "1b-P = AZT+3TC+NVP",
        "1n-P = ABC+3TC+LPV/r",
        "1c-P = AZT+3TC+EFV",
        "1e-P = TDF+FTC+EFV",
        "1k-P = ABC+3TC+EFV",
        "1x-P = Other 1st line",
    ],
    "second-line-adults": [
        "2f-A = TDF+FTC+LPV/r",
        "2h-A = TDF+FTC+ATV/r",
        "2s-A = AZT+3TC+ATV/r",
        "2g-A = ABC+3TC+LPV/r",
        "2k-A = ABC+3TC+ATV/r",
        "2n-A = AZT+3TC+LPV/r",
        "2u-A = DTG+ABC+3TC+ATV/r",
        "2x-A = Other 2nd line",
    ],
    "second-line-pediatrics": [
        "2g-P = ABC+3TC+LPV/r",
        "2w-P = TDF+3TC+EFV",
        "2n-P = AZT+3TC+LPV/r",
        "2t-P = AZT+3TC+LPV/r",
        "2c-P = AZT+3TC+EFV",
        "2k-P = ABC+3TC+EFV",
        "2x-P = Other 2nd line",
    ],
    "third-line-adults": [
        "3y-A = DTG+DRV/r+ETV",
        "3z-A = DTG+ATV/r+ETV",
        "3w-A = RAL+DRV/r+ETV",
        "3u-A = DTG+ETV+AZT+3TC",
        "3j-A = RAL+ETV+AZT+3TC",
        "3x-A = Other 3rd line",
    ],
    "third-line-pediatrics": [
        "3y-P = DTG+DRV/r+ETV",
        "3w-P = RAL+DRV/r+ETV",
        "3u-P = DTG+ETV+AZT+3TC",
        "3j-P = RAL+ETV+AZT+3TC",
        "3x-P = Other 3rd line",
    ],
}
