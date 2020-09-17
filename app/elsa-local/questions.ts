// @ts-check

import { respiratoryQuestions } from "../common/questions"

interface Question {
    sw: string
    eng: string
}

interface QuestionMapping {
    nodes: string[]
    question: Question
}

const questionMaps: QuestionMapping[] = [
    {
        nodes: ["dysuria"],
        question: {
            eng: "Is it painful or burning when the patient urinates?",
            sw: "Anapata maumivu au kuhisi hali ya kuungua wakati wa kukojoa?",
        },
    },
    {
        nodes: ["fever"],
        question: {
            eng: "Does the patient have a fever?",
            sw: "Anahisi homa?",
        },
    },
    {
        nodes: ["back pain"],
        question: {
            eng: "Doe the patient have pain in your back?",
            sw: "Unamaumivu kwenye mgongo?",
        },
    },
    {
        nodes: ["pelvic pain"],
        question: {
            eng: "Do the patient have pain in your pelvis or hips?",
            sw: "Una maumivu kwenye nyonga?",
        },
    },
    {
        nodes: ["frequent micturation"],
        question: {
            eng: "Is he/she urinating more frequently than normal?",
            sw: "Unakojoa kila mara kuliko kawaida?",
        },
    },
    {
        nodes: ["nausea"],
        question: {
            eng: "Is the patient nauseous?",
            sw: "Je, anahisi kichefuchefu",
        },
    },
    {
        nodes: ["vomiting"],
        question: {
            eng: "Is the patient vomiting or has the patient been vomiting?",
            sw: "Mgonjwa anatapika?",
        },
    },
    {
        nodes: ["fatigue"],
        question: {
            eng: "Does the patient feel tired or fatigued?",
            sw: "Unahisi kuchoka au uchovu?",
        },
    },
    {
        nodes: ["vaginal itching", "genital itching"],
        question: {
            eng: "Does the patient have itchiness on or around their genitals?",
            sw: "Una muwasho kwenye ama kuzunguka sehemu zako za siri?",
        },
    },
    {
        nodes: ["vaginal inflammation", "genital inflammation"],
        question: {
            eng: "Do you have inflammation of your genitals?",
            sw: "Unahisi hali ya kuwaka moto kwenye sehemu za siri?",
        },
    },
    {
        nodes: ["curd like vaginal discharge"],
        question: {
            sw: "Kama kuna uchafu au ute unaotoka ukeni, ni mzito?",
            eng: "If there is discharge, is it thick and/or clumpy?",
        },
    },
    {
        nodes: ["dyspareunia"],
        question: {
            eng: "Are you experiencing pain during sexual intercourse?",
            sw: "Unapata maumivu wakati wa kujamiiana?",
        },
    },
    {
        nodes: ["prolonged use of antibiotics"],
        question: {
            sw:
                "Unatumia dawa zozote za antibiotiki kwa muda wa kuzidi mwezi mmoja kwaajili ya ugonjwa mwingine?",
            eng:
                "Have you used antibiotics for a prolonged period of time because of another infection?",
        },
    },
    {
        nodes: ["genital warts"],
        question: {
            eng: "Do you have any bumps or warts on or around your genitals?",
            sw: "Una viuvimbe au vipunye kwenye au kuzunguka sehemu za siri?",
        },
    },
    {
        nodes: ["pins and needles"],
        question: {
            eng: "Do you have the sensation of pins and needles anywhere in your body?",
            sw: "Unahisi hali ya kuchomwa na sindano sehemu yoyote kwenye mwili wako?",
        },
    },
    {
        nodes: ["genital ulcers"],
        question: {
            eng: "Do you have any sores or blisters on or around your genitals?",
            sw: "Una upele au malengelenge kwenye au kuzunguka sehemu za siri?",
        },
    },
    {
        nodes: ["mouth ulcers"],
        question: {
            eng: "Do you have sores or blisters on or around your mouth?",
            sw: "Una upele au malengelenge kwenye au kuzunguka mdomo?",
        },
    },
    {
        nodes: ["multiple vesicle lesions"],
        question: {
            eng: "Do you have blisters, boils, or skin nodules in different parts of your body?",
            sw: "Umetokwa na malenge lenge, au majipu katika sehemu tofauti za mwili wako?",
        },
    },
    {
        nodes: ["pus filled painful sores"],
        question: {
            sw: "Una upele au malengelenge yanye usaa na maumivu?",
            eng: "Do you have painful sores that are filled with pus?",
        },
    },
    {
        nodes: ["genital discharge", "vaginal discharge"],
        question: {
            eng: "Do you have abnormal genital discharge?",
            sw: "Unatokwa na uchafu/ute usio wa kawaida sehemu za siri?",
        },
    },
    {
        nodes: ["fishy vaginal discharge"],
        question: {
            sw: "Uchafu/ ute unaotoka ukeni una harufu ya shombe?",
            eng: "Does your vaginal discharge smell fishy?",
        },
    },
    {
        nodes: ["abdominal pain"],
        question: {
            eng: "Does the patient have abdominal or stomach pain?",
            sw: "Anapata maumivu ya tumbo?",
        },
    },
    {
        nodes: ["painful scrotal swelling"],
        question: {
            eng: "Do you have swelling of your scrotum?",
            sw: "Una uvimbe kwenye mfuko wa korodani?",
        },
    },
    {
        nodes: ["penis opening discomfort"],
        question: {
            eng: "Do you have burning or itching around the opening of the penis?",
            sw: "Unahisi kuwashwa au hisia ya kuungua kwenye modomo wa uume?",
        },
    },
    {
        nodes: ["inflamed foreskin"],
        question: {
            eng: "If not circumcised, do you have inflammation on your foreskin?",
            sw: "Kama haujatahiriwa, unahisi kuungua kwenye govi?",
        },
    },
    {
        nodes: ["painful joints"],
        question: {
            eng: "Do you have painful joints?",
            sw: "Una maumivu ya viungo?",
        },
    },
    {
        nodes: ["metrorrhagia"],
        question: {
            eng: "Have you experienced abnormal bleeding between your periods?",
            sw: "Unatokwa na damu kusiko kawaida katikati ya vipindi vya hedhi?",
        },
    },
    {
        nodes: ["swollen lymph nodes"],
        question: {
            eng:
                "Are your lymph nodes swollen? You have lymph nodes in your neck, under your armpits, and near your genitals.",
            sw:
                "Tezi zako zimevimba? Una tezi kwenye shingo, chini ya makwapa na karibu na sehemu zako za siri.",
        },
    },
    {
        nodes: ["sore throat"],
        question: {
            eng: "Do you have a sore or irritated throat?",
            sw: "Una maumivu au muwasho kwenye koo?",
        },
    },
    {
        nodes: ["foul smelling vaginal discharge"],
        question: {
            sw: "Uchafu/ ute unaotoka ukeni una harufu mbaya isiyo ya shombe?",
            eng: "Does your vaginal discharge smell foul?",
        },
    },
    {
        nodes: ["painless sore on genitals or mouth"],
        question: {
            sw: "Una upele au malengelenge kwenye au kuzunguka mdomo au sehemu za siri?",
            eng: "Do you have painless sores on your mouth or your genitals?",
        },
    },
    {
        nodes: ["copper penny rash"],
        question: {
            eng:
                "Do you have any reddish or brownish rashes on your palms or the soles of your feet? They often have white centers.",
            sw:
                "Una vipele vyenye rangi ya damu ya mzee au inayofanana na kahawa kwenye viganja vya mikono au miguu? Mara nyingi huwa na uweupe katikati ya kipele.",
        },
    },
    {
        nodes: ["arthritis"],
        question: {
            sw: "Je, una ugonjwa wa viungo kuuma uitwao Arthritis?",
            eng: "Do you have arthritis?",
        },
    },
    {
        nodes: ["weight loss"],
        question: {
            eng: "Is the patient experiencing weight loss or have their clothes become loose?",
            sw: "Je amepungua uzito bila ya kutegemea?",
        },
    },
    // HIV related work follows next
    {
        nodes: ["headache"],
        question: {
            eng: "Does the patient have a headache?",
            sw: "Does the patient have a headache?",
        },
    },
    {
        nodes: ["cough"],
        question: {
            eng: "Does the patient have a cough?",
            sw: "Does the patient have a cough?",
        },
    },
    {
        nodes: ["dyspnoea"],
        question: {
            eng:
                "Does the patient have any difficulty breathing or any difference in the way that they breathe?",
            sw:
                "Does the patient have any difficulty breathing or any difference in the way that they breathe?",
        },
    },
    {
        nodes: ["diarrhoea"],
        question: {
            eng: "Does the patient have diarrhoea?",
            sw: "Does the patient have diarrhoea?",
        },
    },
    {
        nodes: ["fatigue"],
        question: {
            eng: "Does the patient get tired very easily or more easily than ususal?",
            sw: "Does the patient get tired very easily or more easily than ususal?",
        },
    },
    {
        nodes: ["jaundice", "yellow eyes"],
        question: {
            eng:
                "Does the patient have any yellowing of the skin or eyes, or has anyone told the patient that their eyes or skin look yellow?",
            sw:
                "Does the patient have any yellowing of the skin or eyes, or has anyone told the patient that their eyes or skin look yellow?",
        },
    },
    {
        nodes: ["skin rash"],
        question: {
            eng: "Does the patient have a skin rash?",
            sw: "Does the patient have a skin rash?",
        },
    },
    {
        nodes: ["urethral discharge"],
        question: {
            eng: "Does the patient have urethral discharge?",
            sw: "Does the patient have urethral discharge?",
        },
    },
    {
        nodes: ["malaise"],
        question: {
            eng: "Does the patient have malaise or does their body feel generally weak?",
            sw: "Does the patient have malaise or does their body feel generally weak?",
        },
    },
    {
        nodes: ["stiff neck"],
        question: {
            eng: "Does the patient have a stiff neck?",
            sw: "Does the patient have a stiff neck?",
        },
    },
    {
        nodes: ["photophobia"],
        question: {
            eng: "Does the patient feel like the lights are too bright?",
            sw: "Does the patient feel like the lights are too bright?",
        },
    },
    {
        nodes: ["coma"],
        question: {
            eng: "Is the patient in a coma?",
            sw: "Is the patient in a coma?",
        },
    },
    {
        nodes: ["visual loss"],
        question: {
            eng:
                "Does the patient have loss of vision or do they feel that their eyesight has changed recently?",
            sw:
                "Does the patient have loss of vision or do they feel that their eyesight has changed recently?",
        },
    },
    {
        nodes: ["hearing loss"],
        question: {
            eng: "Does the patient have hearing loss or difficulty in hearing?",
            sw: "Does the patient have hearing loss or difficulty in hearing?",
        },
    },
    {
        nodes: ["lethargy"],
        question: {
            eng:
                "Does the patient feel like they can't or don't want to move around and work the way they used to?",
            sw:
                "Does the patient feel like they can't or don't want to move around and work the way they used to?",
        },
    },
    {
        nodes: ["confusion"],
        question: {
            eng: "Is the patient confused or experience confusion?",
            sw: "Is the patient confused or experience confusion?",
        },
    },
    {
        nodes: ["altered mental status"],
        question: {
            eng:
                "Does the patient have an altered mental status (do they know where they are and what time it is)?",
            sw:
                "Does the patient have an altered mental status (do they know where they are and what time it is)?",
        },
    },
    {
        nodes: ["focal neurological deficit"],
        question: {
            eng: "Does the patient have a focal neurological deficit?",
            sw: "Does the patient have a focal neurological deficit?",
        },
    },
    {
        nodes: ["diastolic hypertension"],
        question: {
            eng: "Does the patient have diastolic hypertension?",
            sw: "Does the patient have diastolic hypertension?",
        },
    },
    {
        nodes: ["seizures", "seizure"],
        question: {
            eng:
                "Is the patient experiencing seizures ('degedege') or excessive shaking of the entire body?",
            sw:
                "Is the patient experiencing seizures ('degedege') or excessive shaking of the entire body?",
        },
    },
    {
        nodes: ["dry cough"],
        question: {
            eng: "Does the patient have a non-productive cough?",
            sw: "Does the patient have a non-productive cough?",
        },
    },
    {
        nodes: ["eye pain"],
        question: {
            eng: "Does the patient have eye pain?",
            sw: "Does the patient have eye pain?",
        },
    },
    {
        nodes: ["decreased visual acuity"],
        question: {
            eng: "Does the patient feel like they can't read things that are far away?",
            sw: "Does the patient feel like they can't read things that are far away?",
        },
    },
    {
        nodes: ["dark coloured urine"],
        question: {
            eng: "Does the patient have dark colored urine (the color of Coca-cola)?",
            sw: "Does the patient have dark colored urine (the color of Coca-cola)?",
        },
    },
    {
        nodes: ["clay coloured stools"],
        question: {
            eng: "Does the patient have clay colored stool?",
            sw: "Does the patient have clay colored stool?",
        },
    },
    {
        nodes: ["chills"],
        question: {
            eng: "Does the patient have chills?",
            sw: "Does the patient have chills?",
        },
    },
    {
        nodes: ["chest pain"],
        question: {
            eng: "Does the patient have chest pain?",
            sw: "Does the patient have chest pain?",
        },
    },
    {
        nodes: ["tachypneoa"],
        question: {
            eng: "Is the patient breathing abnormally quickly?",
            sw: "Is the patient breathing abnormally quickly?",
        },
    },
    {
        nodes: ["hypoxia after exertion"],
        question: {
            eng:
                "Does the patient find it difficult to breathe after doing simple exercises such as walking?",
            sw:
                "Does the patient find it difficult to breathe after doing simple exercises such as walking?",
        },
    },
    {
        nodes: ["msm"],
        question: {
            eng: "Does the patient identify as MSM?",
            sw: "Does the patient identify as MSM?",
        },
    },
    {
        nodes: ["multiple sexual partners"],
        question: {
            eng: "Is the patient in a sexual or intimate relationship with more than one partner? ",
            sw: "Is the patient in a sexual or intimate relationship with more than one partner? ",
        },
    },
    {
        nodes: ["myalgia"],
        question: {
            eng: "Does the patient have pain or soreness in their muscles?",
            sw: "Does the patient have pain or soreness in their muscles?",
        },
    },
    {
        nodes: ["phobia"],
        question: {
            eng: "Does",
            sw: "Does",
        },
    },
    {
        nodes: ["phobia"],
        question: {
            eng: "Does",
            sw: "Does",
        },
    },
    {
        nodes: ["phobia"],
        question: {
            eng: "Does",
            sw: "Does",
        },
    },
    // ...respiratoryQuestions,
]

export function getQuestion(nodeName: string, language: "eng" | "sw" = "eng"): string {
    const nodeMap = questionMaps.find((qn) => qn.nodes.includes(nodeName))
    if (nodeMap) {
        return nodeMap.question[language]
    }
    return nodeName
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
