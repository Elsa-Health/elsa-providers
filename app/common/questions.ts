// @ts-check
// PAGE NOT IN USE!!

interface Question {
    sw: string
    en: string
}

interface QuestionMapping {
    nodes: string[]
    question: Question
}

const questionMaps: QuestionMapping[] = [
    {
        nodes: ["fever"],
        question: { en: "Do you have a fever?", sw: "Una homa?" },
    },
    {
        nodes: ["vomiting"],
        question: { en: "Are you vomiting?", sw: "Unatakipa?" },
    },
    {
        nodes: ["low grade fever"],
        question: {
            en:
                "Do you have a low-grade fever? This means that your temperature is only slightly elevated. ",
            sw:
                "Una homa ya kiwango cha chini? Hii inamaanisha joto lako la mwili limeongezeka kidogo.",
        },
    },
    {
        nodes: ["fever > 38c"],
        question: {
            en: "Do you have a high fever (greater than 38 degrees Celcius)?",
            sw: "Una homa kali (zaidi ya nyuzi joto 38)?",
        },
    },
    {
        nodes: ["fatigue"],
        question: {
            en: "Are you feeling tired or fatigued more than usual? ",
            sw: "Unahisi kuchoka au uchovu usio wa kawaida?",
        },
    },
    {
        nodes: ["cough"],
        question: { en: "Do you have a cough? ", sw: "Una kikohozi?" },
    },
    {
        nodes: ["dry cough"],
        question: { en: "Is your cough dry? ", sw: "Kikohozi chako ni kikavu?" },
    },
    {
        nodes: ["productive cough"],
        question: {
            en:
                "Is your cough productive? This is when you are producing mucus when you are coughing.",
            sw:
                "Kikohozi chako kimeambatana na makohozi? Hii ni pale unapotoa makohozi wakati unakohoa.",
        },
    },
    {
        nodes: ["2 weeks cough"],
        question: {
            en: "Have you had a cough for 2 or more weeks? ",
            sw: "Umekua na kikohozi kwa wiki 2 au zaidi?",
        },
    },
    {
        nodes: ["5 days cough"],
        question: {
            en: "Have you had a cough for 5 or more days?",
            sw: "Umekua na kikohozi kwa siku 5 au zaidi?",
        },
    },
    {
        nodes: ["sputum production"],
        question: {
            en:
                "Are you producing sputum? Sputum is mucus or phlegm from your respiratory tract, especially when you cough.",
            sw: "Unatoa makohozi? Makohozi ni ute unaotoka kwenye mfumo wa hewa.",
        },
    },
    {
        nodes: ["reddish sputum"],
        question: {
            en: "Is your sputum pink or red? ",
            sw: "Makohozi yako yana rangi nyekundu au damu?",
        },
    },
    {
        nodes: ["redish sputum"],
        question: {
            en: "Is your sputum pink or red? ",
            sw: "Makohozi yako yana rangi au damu?",
        },
    },
    {
        nodes: ["myalgia"],
        question: {
            en: "Do you have muscle aches or pains?",
            sw: "Una maumivu ya misuli?",
        },
    },
    {
        nodes: ["rhinorrhea"],
        question: {
            en: "Do you have a runny or stuffy nose?",
            sw: "Pua zako zinatoa makamasi au zimebana?",
        },
    },
    {
        nodes: ["sore throat"],
        question: { en: "Do you have a sore throat?", sw: "Una vidonda kooni?" },
    },
    {
        nodes: ["diarrhea"],
        question: { en: "Do you have diarrhea?", sw: "Una harisha?" },
    },
    {
        nodes: ["shortness of breath"],
        question: {
            en: "Do you have shortness of breath?",
            sw: "Huwa unaishiwa pumzi?",
        },
    },
    {
        nodes: ["headaches"],
        question: {
            en: "Do you have a headache?",
            sw: "Una maumivu ya kichwa?",
        },
    },
    {
        nodes: ["respiratory rate > 24 per minute "],
        question: {
            en: "Are you breathing more than 24 times per minute? ",
            sw: "Unapuma zaidi ya mara 24 kwa dakika?",
        },
    },
    {
        nodes: ["respiratory rate > 40 per minute (tachypnoea)"],
        question: {
            en: "Are you breathing more than 40 times per minute? ",
            sw: "Unapuma zaidi ya mara 40 kwa dakika?",
        },
    },
    {
        nodes: ["tachypnoea"],
        question: {
            en: "Are you breathing more quickly than normal? ",
            sw: "Unapuma haraka kuliko kawaida?",
        },
    },
    {
        nodes: ["loss of appetite"],
        question: {
            en: "Are you experiencing a loss of appetite? ",
            sw: "Unakosa hamu ya kula?.",
        },
    },
    {
        nodes: ["sneezing"],
        question: { en: "Are you sneezing? ", sw: "Unapiga chafya?" },
    },
    {
        nodes: ["chills"],
        question: { en: "Do you have chills? ", sw: "Unahisi baridi?" },
    },
    {
        nodes: ["difficulty swallowing"],
        question: {
            en: "Are you having difficulty swallowing? ",
            sw: "Unapata ugumu wakati wa kumeza?",
        },
    },
    {
        nodes: ["swollen lymph nodes"],
        question: {
            en: "Do you have swollen lymph nodes?",
            sw: "Una tezi zilizovimba?",
        },
    },
    {
        nodes: ["white patches on tonsils"],
        question: {
            en: "Do you have white patches on your tonsils? ",
            sw: "Una mabaka meupe kwenye mafindofindo?",
        },
    },
    {
        nodes: ["swollen tonsils"],
        question: {
            en: "Do you have swollen tonsils? ",
            sw: "Una mafindofindo yaliyo vimba?",
        },
    },
    {
        nodes: ["hoarseness"],
        question: {
            en: "Is your voice hoarse sounding? ",
            sw: "Sauti yako inafifia?",
        },
    },
    {
        nodes: ["voice loss"],
        question: { en: "Do you have voice loss? ", sw: "Sauti yako inapotea?" },
    },
    {
        nodes: ["facial pain or pressure", "facial discomfort"],
        question: {
            en: "Do you have pain or pressure in your face?",
            sw: "Una maumivu usoni?",
        },
    },
    {
        nodes: ["loss of smell", "smell loss"],
        question: {
            en: "Are you unable to smell? ",
            sw: "Unashindwa kusikia harufu?",
        },
    },
    {
        nodes: ["congestion", "nasal congestion"],
        question: {
            en: "Do you have congestion in your breathing pathways? ",
            sw: "Unabanwa kwenye njia zako za kupumua?",
        },
    },
    {
        nodes: ["halitosis"],
        question: {
            en: "Do you have bad breath? ",
            sw: "Unatoa harufu mbaya kinywani?",
        },
    },
    {
        nodes: ["dental pain"],
        question: {
            en: "Do you have pain in your teeth?",
            sw: "Una maumivu ya meno?",
        },
    },
    {
        nodes: ["night sweats"],
        question: {
            en: "Do you have night sweats? ",
            sw: "Unatokwa na jasho wakati wa usiku?",
        },
    },
    {
        nodes: ["weight loss"],
        question: {
            en: "Have you experienced recent weight loss? ",
            sw: "Umekua ukipungukiwa na uzito hivi karibuni?",
        },
    },
    {
        nodes: ["chest pain"],
        question: {
            en: "Do you have chest pain? ",
            sw: "Una maumivu ya kifua?",
        },
    },
    {
        nodes: ["malaise"],
        question: {
            en: "Do you have general body weakness? ",
            sw: "Unahisi mwili wote kuwa dhaifu?",
        },
    },
    {
        nodes: ["central cyanosis"],
        question: {
            en: "Are your lips or fingers blue in color? ",
            sw: "Midomo yako na vidole vyako vinarango ya bluu?",
        },
    },
    {
        nodes: ["respiratory distress"],
        question: {
            en: "Do you have respiratory distress? ",
            sw: "Unapuma kwa shida?",
        },
    },
    {
        nodes: ["crackles"],
        question: {
            en: "Do you have crackle breath sounds? ",
            sw: "Unatoa kelele wakati wa kupumua?",
        },
    },
    {
        nodes: ["dyspnea"],
        question: {
            en: "Are you having difficulty breathing? ",
            sw: "Unapuma kwa shida?",
        },
    },
    {
        nodes: ["chest discomfort"],
        question: {
            en: "Do you have chest discomfort?",
            sw: "Una maumivu ya kifua?",
        },
    },
    {
        nodes: ["wheezing"],
        question: {
            en: "Do you have wheezing breath sounds?",
            sw: "Unatoa mlio wa filimbi wakati wa kupumua?",
        },
    },
    {
        nodes: ["chest tightness"],
        question: {
            en: "Do you have chest tightness? ",
            sw: "Kifua chako kina bana?",
        },
    },
    {
        nodes: ["age"],
        question: { en: "How old are you?", sw: "Una umri gani?" },
    },
    {
        nodes: ["weakened immune system"],
        question: {
            en: "Do you have a weakened immune system? ",
            sw: "Kinga yako ya mwili ni dhaifu?",
        },
    },
    {
        nodes: ["smoking"],
        question: { en: "Do you smoke? ", sw: "Unavuta sigara?" },
    },
    {
        nodes: ["high risk travel"],
        question: {
            en: "Have you traveled within the last 14 days? ",
            sw: "Umesafiri ndani ya siku 14 zilizopita?",
        },
    },
    {
        nodes: ["direct contact"],
        question: {
            en: "Have you had any contact with a confirmed coronavirus patient?",
            sw: "Umekutana na mtu aliye gundulika kuwa na Virusi vya Korona??",
        },
    },
    {
        nodes: ["contact with influenza"],
        question: {
            en: "Have you been in contact with someone who is sick or is known to have influenza?",
            sw: "Umekutana na mtu anaye umwa au mwenye mafua makali?",
        },
    },
    {
        nodes: ["working in facilities with many other residents"],
        question: {
            en: "Do you work at a facility where you are in contact with many people? ",
            sw: "Unafanya kazi sehemu ambayo unakutana na watu wengi?",
        },
    },
    {
        nodes: ["chronic condition"],
        question: {
            en: "Do you have a chronic condition? ",
            sw: "Una tatizo sugu lolote?",
        },
    },
    {
        nodes: ["contact with children"],
        question: {
            en: "Have you recently had contact with children? ",
            sw: "Umekutana na watoto hivi karibuni?",
        },
    },
    {
        nodes: ["stomachache (in children)"],
        question: {
            en: "Does the child have a stomachache?",
            sw: "Mtoto ana maumivu ya tumbo?",
        },
    },
    {
        nodes: ["(children) drooling "],
        question: {
            en: "Is the child drooling or otherwise indicating that they can't swallow? ",
            sw: "Mtoto anatokwa na udenda au kuonyesha kuwa hawezi kumeza?",
        },
    },
    {
        nodes: ["(children) refusal to eat"],
        question: {
            en: "Is the child refusing to eat?",
            sw: "Mtoto anakataa kula?",
        },
    },
    {
        nodes: ["(children) unusual fussiness"],
        question: {
            en: "Is the child unusually fussy? ",
            sw: "Mtoto anasumbua kuliko kawaida?",
        },
    },
    {
        nodes: ["having a respiratory infection"],
        question: {
            en: "Do you have another respiratory infection? ",
            sw: "Una maambukizi mengine ya njia ya hewa?",
        },
    },
    {
        nodes: ["exposure to irritating substances"],
        question: {
            en:
                "Have you been exposed to cigarette smoke or workplace chemicals, had excessive alcohol intake, or recently had acid reflux?  ",
            sw:
                "Umekua kwenye mazingira yenye moshi wa sigara au kemikali sehemu yako ya kazi, umekunywa vilevi kwa wingi, au kupata asidi mara nyingi?",
        },
    },
    {
        nodes: ["having a common cold"],
        question: { en: "Do you have a cold? ", sw: "Una mafua?" },
    },
    {
        nodes: ["nasal polyps"],
        question: {
            en: "Do you have nasal polyps? ",
            sw: "Una viuvimbe puani?",
        },
    },
    {
        nodes: ["deviated septum"],
        question: {
            en: "Do you have a deviated septum? ",
            sw: "Una ukuta wa pua ulio pinda?",
        },
    },
    {
        nodes: ["having diabetes"],
        question: { en: "Do you have diabetes?", sw: "Una Kisukari?" },
    },
    {
        nodes: ["malnutrition"],
        question: { en: "Are you malnurished? ", sw: "Una utapiamlo?" },
    },
    {
        nodes: ["recurrent infection of any kind"],
        question: {
            en: "Have you recently had recurrent infections? ",
            sw: "Umekua na maambukizi yanayo jirudia hivi karibuni?",
        },
    },
    {
        nodes: ["substance abuse"],
        question: {
            en: "Do you use substances such as alcohol or tobacco? ",
            sw: "Unatumia vilevi kama pombe au tumbaku?",
        },
    },
    {
        nodes: ["contact with tb"],
        question: {
            en: "Have you been in contact with someone who is known to have tuberculosis?",
            sw: "Umekutana na mtu ambaye ana Kifua Kikuu?",
        },
    },
    {
        nodes: ["silicosis**"],
        question: {
            en: "Do you work in a mine or are you otherwise exposed to silica dust? ",
            sw: "Unafanya kazi kwenye mgodi au umekua sehemu yenye vumbi la silika?",
        },
    },
    {
        nodes: ["wood-burning stove"],
        question: {
            en: "Do you use a wood-burning stove? ",
            sw: "Unatumia jiko linalotumia kuni?",
        },
    },
    {
        nodes: ["being hospitalized"],
        question: {
            en:
                "Have you recently (within the last week) been admitted to the hospital or been placed on a ventilator? ",
            sw:
                "Hivi karibuni (ndani ya wiki moja iliyopita) ulilazwa hospitali au kuwekewa mashine ya kupumulia?",
        },
    },
    {
        nodes: ["outdoor air pollution***"],
        question: {
            en: "Have you been exposed to outdoor air pollution? ",
            sw: "Umekua kwenye hewa ya nnje iliyo chafuka?",
        },
    },
    {
        nodes: ["misuse of antibiotics"],
        question: {
            en: "Have you recently been prescribed antibiotics but did not take the whole dose? ",
            sw: "Uliandikiwa kutumia dawa za  Antibiotiki lakini hukutumia dozi nzima? ",
        },
    },
    {
        nodes: ["exposure to fumes"],
        question: {
            en: "Have you had exposure to fumes? ",
            sw: "Umekua kwenye moshi?",
        },
    },
    {
        nodes: ["current asthma"],
        question: { en: "Do you have asthma? ", sw: "Una pumu?" },
    },
    {
        nodes: ["chronic bronchitis"],
        question: {
            en: "Do you have chronic bronchitis? ",
            sw: "Una bronchitis iliyo komaa?",
        },
    },
    {
        nodes: ["long-term exposure to airborne irritants"],
        question: {
            en:
                "Have you had long-term exposure to airborne irritants? These include cigarette smoke, dust or toxic fumes, and excessive air pollution. ",
            sw:
                "Hivi karibuni umekua sehemu zenye hewa za kusababisha muwasho? Hizi ni pamoja na moshi wa sigara, vumbi au mvuke wenye sumu na hewa iliyo chafuka sana kwa mda mrefu?",
        },
    },
    {
        nodes: ["abrupt onset of symptoms"],
        question: {
            en: "Have your symptoms abruptly started within the past 1-2 days?",
            sw: "Dalili zako zimeanza ghafla ndani ya siku 1-2 zilizopita",
        },
    },
]

export function getQuestion(nodeName: string, language: "en" | "sw" = "en"): string {
    const nodeMap = questionMaps.find((qn) => qn.nodes.includes(nodeName))
    console.log("getQuestion: ", nodeName, nodeMap?.question)
    if (nodeMap) {
        return nodeMap.question[language]
    }
    return nodeName
}

export function getNodeGroup(nodeName: string) {
    const nodeMap = questionMaps.find((qn) => qn.nodes.includes(nodeName))
    if (nodeMap) {
        return nodeMap.nodes
    }
    return [nodeName]
}

export function getRelevantNextQuestions(
    nodes: string[] = [],
    language: "en" | "sw" = "en",
): string[] {
    return nodes.map((nodeName) => getQuestion(nodeName, language))
}

const respiratoryQuestions = questionMaps

export { respiratoryQuestions }
