// @ts-check

import { respiratoryQuestions } from "../common/questions"
import _, { upperFirst } from "lodash"
interface Question {
    sw: string
    en: string
}

interface QuestionMapping {
    nodes: string[]
    system?: string
    question: Question
}

const QNnodes = [
    "testicular pain",
    "testicular swelling",
    "postcoital bleeding",
    "penile discharge",
    "lethargy",
    "confusion",
    "altered mental status",
    "focal neurological deficit",
    "diastolic hypertension",
    "loss of consiousness",
    "paralysis",
    "motor paralysis",
    "cranial nerve palsy",
    "abnormal posturing",
    "clay coloured stools",
    "msm",
    "multiple sexual partners",
    "tachypnoea",
    "hypoxia after exertion",
    "night sweats",
    "burning epigastric pain",
    "epigastric pain before meals",
    "epigastric pain after meals",
    "irritability",
    "dehydration",
    "abdominal tenderness",
    "convulsions",
    "hypoglycemia",
    "anaemia",
    "white patches on tonsils",
    "tender anterior neck",
]

// Method used to clean up text from the spreadsheet
// text.map(textRow => textRow.split(",").map(textRowItem => textRowItem.trim())).map(textRow => ({ nodes: [textRow[1]], system: textRow[0], question: { en: textRow[textRow.length - 2], sw: textRow[textRow.length - 1] } }))

const questionMaps: QuestionMapping[] = [
    {
        nodes: ["dysuria"],
        system: "Renal",
        question: { en: "Discomfort when urinating?", sw: "Usumbufu wakati wa kukojoa?" },
    },
    {
        nodes: ["frequent micturation"],
        system: "Renal",
        question: {
            en: "Urinating more frequently than normal?",
            sw: "Kukojoa mara kwa mara kuliko kawaida?",
        },
    },
    {
        nodes: ["pelvic pain"],
        system: "Musculoskeletal",
        question: { en: "Pain in their pelvis?", sw: "Maumivu katika pelvis yao?" },
    },
    {
        nodes: ["back pain"],
        system: "Musculoskeletal",
        question: { en: "Back pain?", sw: "Maumivu ya mgongo?" },
    },
    {
        nodes: ["nausea"],
        system: "Gastrointestinal",
        question: { en: "Nausea or upset stomach?", sw: "Kichefuchefu au tumbo kujaa gesi?" },
    },
    {
        nodes: ["vomiting"],
        system: "Gastrointestinal",
        question: { en: "Vomitting?", sw: "Kutapika?" },
    },
    { nodes: ["fever"], system: "Immune", question: { en: "Fever?", sw: "Homa" } },
    { nodes: ["fatigue"], system: "", question: { en: "Fatigue?", sw: "Uchovu" } },
    {
        nodes: ["genital warts"],
        system: "Reproductive",
        question: { en: "Warts on their genitals?", sw: "Viupele sehemu zao za siri?" },
    },
    {
        nodes: ["vaginal itching"],
        system: "Reproductive",
        question: { en: "Vaginal itching?", sw: "Kuwashwa uke?" },
    },
    {
        nodes: ["white vaginal discharge"],
        system: "Reproductive",
        question: { en: "White vaginal discharge?", sw: "Utokwaji na majimaji meupe ukeni?" },
    },
    {
        nodes: ["vaginal discharge"],
        system: "Reproductive",
        question: {
            en: "Abnormal discharge from the vagina?",
            sw: "Utokwaji na majimaji kusikokuwa kwa kawaida kutoka kwenye uke?",
        },
    },
    {
        nodes: ["fishy vaginal discharge"],
        system: "Reproductive",
        question: {
            en: "Vaginal discharge that is fishy smelling?",
            sw: "Maji maji Kutoka ukeni ambayo yana harufu ya samaki?",
        },
    },
    {
        nodes: ["genital discharge"],
        system: "Reproductive",
        question: {
            en: "Abnormal discharge from the genitals?",
            sw: "Utokwaji na majimaji usiokuwa wa kawaida kutoka kwenye sehemu za siri?",
        },
    },
    {
        nodes: ["abdominal pain"],
        system: "Gastrointestinal",
        question: { en: "Abdominal pain?", sw: "Maumivu ya tumbo?" },
    },
    {
        nodes: ["painful scrotal swelling"],
        system: "Reproductive",
        question: {
            en: "Pain or swelling in their scrotum?",
            sw: "Maumivu au uvimbe kwenye kibofu?",
        },
    },
    {
        nodes: ["dyspareunia"],
        system: "Reproductive",
        question: {
            en: "Pain in their genitals during or after sexual intercourse?",
            sw: "Maumivu katika sehemu zao za siri wakati au baada ya kujamiiana?",
        },
    },
    {
        nodes: ["penis opening discomfort"],
        system: "Reproductive",
        question: {
            en: "Pain at the opening of the penis?",
            sw: "Maumivu wakati wa ufunguzi wa uume?",
        },
    },
    {
        nodes: ["menorrhagia"],
        system: "Reproductive",
        question: {
            en: "Heavy periods (more than normal)?",
            sw: "Vipindi vizito vya hedhi (zaidi ya kawaida)?",
        },
    },
    {
        nodes: ["metrorrhagia"],
        system: "Reproductive",
        question: { en: "Abnormal vaginal bleeding?", sw: "Damu isiyo ya kawaida ukeni?" },
    },
    {
        nodes: ["testicular pain"],
        system: "Reproductive",
        question: { en: "Pain in the testicles", sw: "Maumivu kwenye korodani" },
    },
    {
        nodes: ["testicular swelling"],
        system: "Reproductive",
        question: { en: "Swelling of the testicles?", sw: "Uvimbe wa korodani?" },
    },
    {
        nodes: ["foul vaginal discharge"],
        system: "Reproductive",
        question: {
            en: "Vaginal discharge that is foul smelling?",
            sw: "Kutokwa na uke ambayo ni harufu mbaya?",
        },
    },
    {
        nodes: ["postcoital bleeding"],
        system: "Reproductive",
        question: {
            en: "Bleeding after sexual intercourse?",
            sw: "Kutokwa na damu baada ya kujamiiana?",
        },
    },
    {
        nodes: ["yellow vaginal discharge"],
        system: "Reproductive",
        question: {
            en: "Yellow vaginal discharge?",
            sw: "Utokwaji wa majimaji ya manjano ukeni?",
        },
    },
    {
        nodes: ["penile discharge"],
        system: "Reproductive",
        question: {
            en: "Abnormal discharge from the penis?",
            sw: "Utokwaji majimaji usiokuwa wa kawaida kutoka kwenye uume?",
        },
    },
    {
        nodes: ["genital itching"],
        system: "Reproductive",
        question: { en: "Genital itching?", sw: "Kuwashwa sehemu za siri?" },
    },
    {
        nodes: ["malaise"],
        system: "",
        question: {
            en: "General discomfort or body malaise?",
            sw: "Usumbufu wa jumla au ugonjwa wa malaise?",
        },
    },
    {
        nodes: ["headache"],
        system: "Neurological",
        question: { en: "A headache?", sw: "Maumivu ya kichwa?" },
    },
    {
        nodes: ["stiff neck"],
        system: "Musculoskeletal",
        question: { en: "A stiff neck?", sw: "Shingo ngumu?" },
    },
    {
        nodes: ["photophobia"],
        system: "Neurological",
        question: { en: "Sensitivity to light?", sw: "Unyeti kwa mwanga?" },
    },
    {
        nodes: ["coma"],
        system: "Neurological",
        question: {
            en: "Prolonged unconciousness (in a coma)?",
            sw: "Kupoteza fahamu kwa muda mrefu (katika coma)?",
        },
    },
    { nodes: ["cough"], system: "Respiratory", question: { en: "A cough?", sw: "Kikohozi?" } },
    {
        nodes: ["dyspnoea"],
        system: "Respiratory",
        question: { en: "Difficulty breathing?", sw: "Ugumu wa kupumua" },
    },
    {
        nodes: ["skin rash"],
        system: "Integumentary",
        question: { en: "A skin rash?", sw: "A skin rash?" },
    },
    {
        nodes: ["visual impairment"],
        system: "Ocular",
        question: {
            en: "Vision loss or a sudden change in their vision?",
            sw: "Kupoteza uono au mabadiliko ya ghafla katika uono wao?",
        },
    },
    {
        nodes: ["hearing impairment"],
        system: "Hearing",
        question: {
            en: "Hearing loss or a sudden change in their hearing?",
            sw: "Kupoteza usikivu au mabadiliko ya ghafla katika kusikia kwao?",
        },
    },
    {
        nodes: ["lethargy"],
        system: "",
        question: { en: "Lethargy or a lack of energy?", sw: "Ulevi au ukosefu wa nguvu?" },
    },
    {
        nodes: ["confusion"],
        system: "Central Nervous System",
        question: { en: "Confusion?", sw: "Mkanganyiko?" },
    },
    {
        nodes: ["altered mental status"],
        system: "Central Nervous System",
        question: {
            en: "A siginificant change in mental status?",
            sw: "Mabadiliko makubwa katika hali ya akili?",
        },
    },
    {
        nodes: ["focal neurological deficit"],
        system: "Central Nervous System",
        question: { en: "Abnormal function of a body area (such as their face, arms, tongue, or eyes)?", sw: "Kazi isiyo ya kawaida ya eneo la mwili (kama vile uso, mikono, ulimi, au macho)?" },
    },
    {
        nodes: ["diastolic hypertension"],
        system: "",
        question: { en: "High diastolic blood pressure?", sw: "Shinikizo la damu la juu?" },
    },
    {
        nodes: ["low grade fever"],
        system: "Immune",
        question: { en: "A low grade fever?", sw: "Homa ya kiwango cha chini?" },
    },
    {
        nodes: ["weight loss"],
        system: "",
        question: {
            en: "Sudden weight loss (or have their clothes become loose)?",
            sw: "Kupunguza uzito ghafla (au punguza nguo zao ili kuwa huru)?",
        },
    },
    {
        nodes: ["loss of consiousness"],
        system: "Neurological",
        question: { en: "Loss of consiousness?", sw: "Kupoteza mazungumzo?" },
    },
    {
        nodes: ["paralysis"],
        system: "Neurological",
        question: {
            en: "Paralysis or inability to move parts of their body?",
            sw: "Kupooza au kukosa uwezo wa kusogeza sehemu za mwili wao?",
        },
    },
    {
        nodes: ["motor paralysis"],
        system: "Central Nervous System",
        question: { en: "Loss of motor function?", sw: "Kupoteza kazi ya motor?" },
    },
    {
        nodes: ["cranial nerve palsy"],
        system: "Central Nervous System",
        question: {
            en: "Loss of eye function or double vision?",
            sw: "Kupoteza kazi ya macho au kuona mara mbili?",
        },
    },
    {
        nodes: ["abnormal posturing"],
        system: "Central Nervous System",
        question: {
            en: "Involuntary flexion or extension of the arms and legs?",
            sw: "Kupunguka kwa uhiari au kupanua mikono na miguu?",
        },
    },
    {
        nodes: ["history of tb"],
        system: "//",
        question: { en: "A history of tuberculosis", sw: "Historia ya kifua kikuu" },
    },
    { nodes: ["seizures"], system: "Neurological", question: { en: "Seizures?", sw: "Mshtuko?" } },
    {
        nodes: ["dry cough"],
        system: "Respiratory",
        question: { en: "A dry cough?", sw: "Kikohozi kikavu" },
    },
    {
        nodes: ["eye pain"],
        system: "Ocular",
        question: { en: "Eye pain?", sw: "maumivu ya jicho" },
    },
    {
        nodes: ["blurred vision"],
        system: "Ocular",
        question: { en: "Blurred vision?", sw: "uono hafifu" },
    },
    {
        nodes: ["dark urine"],
        system: "Renal",
        question: {
            en: "Dark-colored urine (like Coca-Cola)?",
            sw: "Mkojo wenye rangi nyeusi (kama Coca-Cola)?",
        },
    },
    {
        nodes: ["clay coloured stools"],
        system: "Renal",
        question: {
            en: "Light-colored stool (the color of clay)?",
            sw: "Kinyesi cha rangi iliyopauka (rangi ya udongo)?",
        },
    },
    {
        nodes: ["jaundice"],
        system: "Gastrointestinal",
        question: { en: "Yellow skin or eyes?", sw: "Ngozi ya manjano au macho?" },
    },
    {
        nodes: ["men who have sex with men"],
        system: "//",
        question: { en: "Je", sw: "unafanya ngono na watu wa jinsia moja?" },
    },
    {
        nodes: ["multiple sexual partners"],
        system: "//",
        question: {
            en: "Have multiple sexual partners?",
            sw: "Je! Una washirika wengi wa ngono?",
        },
    },
    { nodes: ["chills"], system: "", question: { en: "Chills?", sw: "Baridi?" } },
    {
        nodes: ["chest pain"],
        system: "Respiratory",
        question: { en: "Chest pain?", sw: "Maumivu ya kifua?" },
    },
    {
        nodes: ["tachypnoea"],
        system: "Respiratory",
        question: { en: "Fast breathing?", sw: "Kupumua haraka?" },
    },
    {
        nodes: ["hypoxia after exertion"],
        system: "Respiratory",
        question: {
            en: "Reduced oxygen (hypoxia) after moderate exercising",
            sw: "Kupungua kwa oksijeni (hypoxia) baada ya mazoezi ya wastani",
        },
    },
    {
        nodes: ["productive cough"],
        system: "Respiratory",
        question: { en: "A productive cough?", sw: "Kikohozi zalishi?" },
    },
    {
        nodes: ["night sweats"],
        system: "",
        question: { en: "Night sweats?", sw: "Kutokwa na jasho nyakati za usiku?" },
    },
    {
        nodes: ["burning epigastric pain"],
        system: "Gastrointestinal",
        question: {
            en: "Burning pain in their abdomen?",
            sw: "Kuungua maumivu ndani ya tumbo?",
        },
    },
    {
        nodes: ["epigastric pain before meals"],
        system: "Gastrointestinal",
        question: { en: "Abdominal pain before meals?", sw: "Maumivu ya tumbo kabla ya kula?" },
    },
    {
        nodes: ["epigastric pain after meals"],
        system: "Gastrointestinal",
        question: { en: "Abdominal pain after meals?", sw: "Maumivu ya tumbo baada ya kula?" },
    },
    {
        nodes: ["diarrhoea"],
        system: "Gastrointestinal",
        question: { en: "Diarrhoea?", sw: "kuhara?" },
    },
    {
        nodes: ["sore throat"],
        system: "",
        question: { en: "A sore throat?", sw: "Koo lenye vidonda" },
    },
    {
        nodes: ["rhinorrhea"],
        system: "Respiratory",
        question: { en: "A runny nose?", sw: "mafua makali" },
    },
    {
        nodes: ["irritability"],
        system: "Central Nervous System",
        question: { en: "Irritability?", sw: "Kuwashwa?" },
    },
    {
        nodes: ["dehydration"],
        system: "",
        question: { en: "Dehydration?", sw: "Ukosefu wa maji mwilini?" },
    },
    {
        nodes: ["abdominal tenderness"],
        system: "Gastrointestinal",
        question: { en: "Tenderness in the abdomen?", sw: "Utulivu ndani ya tumbo?" },
    },
    {
        nodes: ["convulsions"],
        system: "Central Nervous System",
        question: {
            en: "Machafuko (sudde",
            sw: "harakati isiyo ya kawaida ya kiungo au ya mwili)?",
        },
    },
    {
        nodes: ["hypoglycemia"],
        system: "",
        question: { en: "Low blood sugar?", sw: "Sukari ya chini ya damu?" },
    },
    { nodes: ["anaemia"], system: "", question: { en: "Anaemia?", sw: "Upungufu wa damu?" } },
    {
        nodes: ["sneezing"],
        system: "Respiratory",
        question: { en: "Sneezing?", sw: "Kupiga chafya?" },
    },
    {
        nodes: ["myalgia"],
        system: "Musculoskeletal",
        question: { en: "Muscle pain?", sw: "Kupiga chafya?" },
    },
    {
        nodes: ["loss of appetite"],
        system: "",
        question: { en: "Loss of appetite?", sw: "Kupoteza hamu ya kula?" },
    },
    {
        nodes: ["loss of smell"],
        system: "Respiratory",
        question: { en: "Loss of smell?", sw: "Kupoteza harufu?" },
    },
    {
        nodes: ["high grade fever"],
        system: "Immune",
        question: { en: "A high grade fever?", sw: "Homa ya kiwango cha juu?" },
    },
    {
        nodes: ["difficulty swallowing"],
        system: "Digestive",
        question: { en: "Difficulty swallowing?", sw: "Ugumu kumeza?" },
    },
    {
        nodes: ["hoarseness"],
        system: "Digestive",
        question: {
            en: "Hoarseness (inability to use their voice)?",
            sw: "Hoarseness (kutokuwa na uwezo wa kutumia sauti yao)?",
        },
    },
    {
        nodes: ["halitosis"],
        system: "Digestive",
        question: { en: "Bad breath?", sw: "Harufu mbaya kinywani?" },
    },
    {
        nodes: ["swollen lymph nodes"],
        system: "Immune",
        question: { en: "Swollen lymph nodes?", sw: "uvimbe" },
    },
    {
        nodes: ["white patches on tonsils"],
        system: "Digestive",
        question: { en: "White patches on their tonsils?", sw: "Vipande vyeupe kwenye toni zao?" },
    },
    {
        nodes: ["voice loss"],
        system: "",
        question: { en: "Loss of voice?", sw: "Kupoteza sauti?" },
    },
    {
        nodes: ["tender anterior neck"],
        system: "Immune",
        question: { en: "Tenderness in the back of the neck?", sw: "Upole nyuma ya shingo?" },
    },
    {
        nodes: ["nasal congestion"],
        system: "Respiratory",
        question: { en: "Nasal congestion?", sw: "Msongamano ndani ya pua?" },
    },
    {
        nodes: ["vaginal inflammation"],
        system: "Reproductive",
        question: { en: "Inflammation of the vagina?", sw: "Kuvimba kwa uke?" },
    },
    {
        nodes: ["curd like vaginal discharge"],
        system: "Reproductive",
        question: {
            en: "Vaginal discharge that is curd-like?",
            sw: "Kutokwa na majimaji  ukeni ambayo ni kama jibini?",
        },
    },
    {
        nodes: ["prolonged use of antibiotics"],
        system: "//",
        question: {
            en: "Prolonged use of antibiotics?",
            sw: "Matumizi ya muda mrefu ya antibiotics?",
        },
    },
    {
        nodes: ["pins and needles"],
        system: "Central Nervous System",
        question: {
            en: "Feeling of pins and needles in their body?",
            sw: "Kuhisi pini na sindano katika mwili wao?",
        },
    },
    {
        nodes: ["genital ulcers"],
        system: "Reproductive",
        question: {
            en: "Bumps or sores around the genitals?",
            sw: "Mabonge au vidonda karibu na sehemu za siri?",
        },
    },
    {
        nodes: ["mouth ulcers"],
        system: "Reproductive",
        question: {
            en: "Bumps or sores around the mouth?",
            sw: "Mabonge au vidonda kuzunguka mdomo?",
        },
    },
    {
        nodes: ["multiple vesicle lesions"],
        system: "Reproductive",
        question: {
            en: "Multiple lesions or bumps with fluid inside of them?",
            sw: "Vidonda vingi au matuta yenye maji ndani yao?",
        },
    },
    {
        nodes: ["pus filled painful sores"],
        system: "Reproductive",
        question: { en: "Pus-filled painful sores?", sw: "Vidonda vikali vilivyojazwa?" },
    },
    {
        nodes: ["inflamed foreskin"],
        system: "Reproductive",
        question: { en: "Inflamed foreskin?", sw: "Ngozi iliyokunjamana?" },
    },
    {
        nodes: ["painful joints"],
        system: "Musculoskeletal",
        question: { en: "Painful joints?", sw: "Viungo vyenye maumivu?" },
    },
    {
        nodes: ["painless sore on genitals or mouth"],
        system: "Reproductive",
        question: {
            en: "Painless sores on the genitals or the mouth?",
            sw: "Vidonda visivyo na maumivu kwenye sehemu za siri au kinywa?",
        },
    },
    {
        nodes: ["copper penny rash"],
        system: "Reproductive",
        question: {
            en: "A rose-colored rash on the palms of their hands or soles of their feet?",
            sw: "Upele wa rangi ya waridi kwenye mitende ya mikono yao au nyayo za miguu yao?",
        },
    },
    {
        nodes: ["arthritis"],
        system: "Musculoskeletal",
        question: { en: "Swelling or tenderness of their joints?", sw: "Uvimbe wa viungo vyao?" },
    },
    {
        nodes: ["urethral discharge"],
        system: "Reproductive",
        question: {
            en: "Abnormal discharge from the urethra?",
            sw: "Utoaji usiokuwa wa kawaida kutoka kwenye mrija wa uume",
        },
    },
    {
        nodes: ["decreased visual acuity"],
        system: "Neurological",
        question: { en: "Reduced ability to see?", sw: "Kupunguza uwezo wa kuona?" },
    },
]

export function getQuestion(nodeName: string, language: "sw" | "en" = "en"): string {
    const nodeMap = questionMaps.find((qn) => qn.nodes.includes(nodeName))
    if (nodeMap) {
        return upperFirst(nodeMap.question[language])
    }
    return _.upperFirst(nodeName)
}

// export function getNodesFromQuestion(question: string) {
//     const nodeMap = questionMaps.find(qn => qn.question === question);
//     if (nodeMap) {
//       return nodeMap.nodes;
//     }
//     return [];
//   }

export function getNodeGroup(nodeName: string) {
    const nodeMap = questionMaps.find((qn) => qn.nodes.includes(nodeName))
    if (nodeMap) {
        return nodeMap.nodes
    }
    return [nodeName]
}

// TODO: Create a question orders template dictating the order in which questions are asked
// TODO: Create a question order logic template dictating which next questions should not be shown given other responses
