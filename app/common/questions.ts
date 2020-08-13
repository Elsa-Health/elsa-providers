// @ts-check

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
        nodes: ["fever"],
        question: { eng: "Do you have a fever?", sw: "Una homa?" },
    },
    {
        nodes: ["vomitting"],
        question: { eng: "Are you vomiting?", sw: "Unatakipa?" },
    },
    {
        nodes: ["low grade fever"],
        question: {
            eng:
                "Do you have a low-grade fever? This means that your temperature is only slightly elevated. ",
            sw:
                "Una homa ya kiwango cha chini? Hii inamaanisha joto lako la mwili limeongezeka kidogo.",
        },
    },
    {
        nodes: ["fever > 38c"],
        question: {
            eng: "Do you have a high fever (greater than 38 degrees Celcius)?",
            sw: "Una homa kali (zaidi ya nyuzi joto 38)?",
        },
    },
    {
        nodes: ["fatigue"],
        question: {
            eng: "Are you feeling tired or fatigued more than usual? ",
            sw: "Unahisi kuchoka au uchovu usio wa kawaida?",
        },
    },
    {
        nodes: ["cough"],
        question: { eng: "Do you have a cough? ", sw: "Una kikohozi?" },
    },
    {
        nodes: ["dry cough"],
        question: { eng: "Is your cough dry? ", sw: "Kikohozi chako ni kikavu?" },
    },
    {
        nodes: ["productive cough"],
        question: {
            eng:
                "Is your cough productive? This is when you are producing mucus when you are coughing.",
            sw:
                "Kikohozi chako kimeambatana na makohozi? Hii ni pale unapotoa makohozi wakati unakohoa.",
        },
    },
    {
        nodes: ["2 weeks cough"],
        question: {
            eng: "Have you had a cough for 2 or more weeks? ",
            sw: "Umekua na kikohozi kwa wiki 2 au zaidi?",
        },
    },
    {
        nodes: ["5 days cough"],
        question: {
            eng: "Have you had a cough for 5 or more days?",
            sw: "Umekua na kikohozi kwa siku 5 au zaidi?",
        },
    },
    {
        nodes: ["sputum production"],
        question: {
            eng:
                "Are you producing sputum? Sputum is mucus or phlegm from your respiratory tract, especially when you cough.",
            sw: "Unatoa makohozi? Makohozi ni ute unaotoka kwenye mfumo wa hewa.",
        },
    },
    {
        nodes: ["reddish sputum"],
        question: {
            eng: "Is your sputum pink or red? ",
            sw: "Makohozi yako yana rangi nyekundu au damu?",
        },
    },
    {
        nodes: ["redish sputum"],
        question: {
            eng: "Is your sputum pink or red? ",
            sw: "Makohozi yako yana rangi au damu?",
        },
    },
    {
        nodes: ["myalgia"],
        question: {
            eng: "Do you have muscle aches or pains?",
            sw: "Una maumivu ya misuli?",
        },
    },
    {
        nodes: ["rhinorrhea"],
        question: {
            eng: "Do you have a runny or stuffy nose?",
            sw: "Pua zako zinatoa makamasi au zimebana?",
        },
    },
    {
        nodes: ["sore throat"],
        question: { eng: "Do you have a sore throat?", sw: "Una vidonda kooni?" },
    },
    {
        nodes: ["diarrhea"],
        question: { eng: "Do you have diarrhea?", sw: "Una harisha?" },
    },
    {
        nodes: ["shortness of breath"],
        question: {
            eng: "Do you have shortness of breath?",
            sw: "Huwa unaishiwa pumzi?",
        },
    },
    {
        nodes: ["headaches"],
        question: {
            eng: "Do you have a headache?",
            sw: "Una maumivu ya kichwa?",
        },
    },
    {
        nodes: ["respiratory rate > 24 per minute "],
        question: {
            eng: "Are you breathing more than 24 times per minute? ",
            sw: "Unapuma zaidi ya mara 24 kwa dakika?",
        },
    },
    {
        nodes: ["respiratory rate > 40 per minute (tachypnoea)"],
        question: {
            eng: "Are you breathing more than 40 times per minute? ",
            sw: "Unapuma zaidi ya mara 40 kwa dakika?",
        },
    },
    {
        nodes: ["tachypnoea"],
        question: {
            eng: "Are you breathing more quickly than normal? ",
            sw: "Unapuma haraka kuliko kawaida?",
        },
    },
    {
        nodes: ["loss of appetite"],
        question: {
            eng: "Are you experiencing a loss of appetite? ",
            sw: "Unakosa hamu ya kula?.",
        },
    },
    {
        nodes: ["sneezing"],
        question: { eng: "Are you sneezing? ", sw: "Unapiga chafya?" },
    },
    {
        nodes: ["chills"],
        question: { eng: "Do you have chills? ", sw: "Unahisi baridi?" },
    },
    {
        nodes: ["difficulty swallowing"],
        question: {
            eng: "Are you having difficulty swallowing? ",
            sw: "Unapata ugumu wakati wa kumeza?",
        },
    },
    {
        nodes: ["swollen lymph nodes"],
        question: {
            eng: "Do you have swollen lymph nodes?",
            sw: "Una tezi zilizovimba?",
        },
    },
    {
        nodes: ["white patches on tonsils"],
        question: {
            eng: "Do you have white patches on your tonsils? ",
            sw: "Una mabaka meupe kwenye mafindofindo?",
        },
    },
    {
        nodes: ["swollen tonsils"],
        question: {
            eng: "Do you have swollen tonsils? ",
            sw: "Una mafindofindo yaliyo vimba?",
        },
    },
    {
        nodes: ["hoarseness"],
        question: {
            eng: "Is your voice hoarse sounding? ",
            sw: "Sauti yako inafifia?",
        },
    },
    {
        nodes: ["voice loss"],
        question: { eng: "Do you have voice loss? ", sw: "Sauti yako inapotea?" },
    },
    {
        nodes: ["facial pain or pressure", "facial discomfort"],
        question: {
            eng: "Do you have pain or pressure in your face?",
            sw: "Una maumivu usoni?",
        },
    },
    {
        nodes: ["loss of smell", "smell loss"],
        question: {
            eng: "Are you unable to smell? ",
            sw: "Unashindwa kusikia harufu?",
        },
    },
    {
        nodes: ["congestion", "nasal congestion"],
        question: {
            eng: "Do you have congestion in your breathing pathways? ",
            sw: "Unabanwa kwenye njia zako za kupumua?",
        },
    },
    {
        nodes: ["halitosis"],
        question: {
            eng: "Do you have bad breath? ",
            sw: "Unatoa harufu mbaya kinywani?",
        },
    },
    {
        nodes: ["dental pain"],
        question: {
            eng: "Do you have pain in your teeth?",
            sw: "Una maumivu ya meno?",
        },
    },
    {
        nodes: ["night sweats"],
        question: {
            eng: "Do you have night sweats? ",
            sw: "Unatokwa na jasho wakati wa usiku?",
        },
    },
    {
        nodes: ["weight loss"],
        question: {
            eng: "Have you experienced recent weight loss? ",
            sw: "Umekua ukipungukiwa na uzito hivi karibuni?",
        },
    },
    {
        nodes: ["chest pain"],
        question: {
            eng: "Do you have chest pain? ",
            sw: "Una maumivu ya kifua?",
        },
    },
    {
        nodes: ["malaise"],
        question: {
            eng: "Do you have general body weakness? ",
            sw: "Unahisi mwili wote kuwa dhaifu?",
        },
    },
    {
        nodes: ["central cyanosis"],
        question: {
            eng: "Are your lips or fingers blue in color? ",
            sw: "Midomo yako na vidole vyako vinarango ya bluu?",
        },
    },
    {
        nodes: ["respiratory distress"],
        question: {
            eng: "Do you have respiratory distress? ",
            sw: "Unapuma kwa shida?",
        },
    },
    {
        nodes: ["crackles"],
        question: {
            eng: "Do you have crackle breath sounds? ",
            sw: "Unatoa kelele wakati wa kupumua?",
        },
    },
    {
        nodes: ["dyspnea"],
        question: {
            eng: "Are you having difficulty breathing? ",
            sw: "Unapuma kwa shida?",
        },
    },
    {
        nodes: ["chest discomfort"],
        question: {
            eng: "Do you have chest discomfort?",
            sw: "Una maumivu ya kifua?",
        },
    },
    {
        nodes: ["wheezing"],
        question: {
            eng: "Do you have wheezing breath sounds?",
            sw: "Unatoa mlio wa filimbi wakati wa kupumua?",
        },
    },
    {
        nodes: ["chest tightness"],
        question: {
            eng: "Do you have chest tightness? ",
            sw: "Kifua chako kina bana?",
        },
    },
    {
        nodes: ["age"],
        question: { eng: "How old are you?", sw: "Una umri gani?" },
    },
    {
        nodes: ["weakened immune system"],
        question: {
            eng: "Do you have a weakened immune system? ",
            sw: "Kinga yako ya mwili ni dhaifu?",
        },
    },
    {
        nodes: ["smoking"],
        question: { eng: "Do you smoke? ", sw: "Unavuta sigara?" },
    },
    {
        nodes: ["high risk travel"],
        question: {
            eng: "Have you traveled within the last 14 days? ",
            sw: "Umesafiri ndani ya siku 14 zilizopita?",
        },
    },
    {
        nodes: ["direct contact"],
        question: {
            eng: "Have you had any contact with a confirmed coronavirus patient?",
            sw: "Umekutana na mtu aliye gundulika kuwa na Virusi vya Korona??",
        },
    },
    {
        nodes: ["contact with influenza"],
        question: {
            eng: "Have you been in contact with someone who is sick or is known to have influenza?",
            sw: "Umekutana na mtu anaye umwa au mwenye mafua makali?",
        },
    },
    {
        nodes: ["working in facilities with many other residents"],
        question: {
            eng: "Do you work at a facility where you are in contact with many people? ",
            sw: "Unafanya kazi sehemu ambayo unakutana na watu wengi?",
        },
    },
    {
        nodes: ["chronic condition"],
        question: {
            eng: "Do you have a chronic condition? ",
            sw: "Una tatizo sugu lolote?",
        },
    },
    {
        nodes: ["contact with children"],
        question: {
            eng: "Have you recently had contact with children? ",
            sw: "Umekutana na watoto hivi karibuni?",
        },
    },
    {
        nodes: ["stomachache (in children)"],
        question: {
            eng: "Does the child have a stomachache?",
            sw: "Mtoto ana maumivu ya tumbo?",
        },
    },
    {
        nodes: ["(children) drooling "],
        question: {
            eng: "Is the child drooling or otherwise indicating that they can't swallow? ",
            sw: "Mtoto anatokwa na udenda au kuonyesha kuwa hawezi kumeza?",
        },
    },
    {
        nodes: ["(children) refusal to eat"],
        question: {
            eng: "Is the child refusing to eat?",
            sw: "Mtoto anakataa kula?",
        },
    },
    {
        nodes: ["(children) unusual fussiness"],
        question: {
            eng: "Is the child unusually fussy? ",
            sw: "Mtoto anasumbua kuliko kawaida?",
        },
    },
    {
        nodes: ["having a respiratory infection"],
        question: {
            eng: "Do you have another respiratory infection? ",
            sw: "Una maambukizi mengine ya njia ya hewa?",
        },
    },
    {
        nodes: ["exposure to irritating substances"],
        question: {
            eng:
                "Have you been exposed to cigarette smoke or workplace chemicals, had excessive alcohol intake, or recently had acid reflux?  ",
            sw:
                "Umekua kwenye mazingira yenye moshi wa sigara au kemikali sehemu yako ya kazi, umekunywa vilevi kwa wingi, au kupata asidi mara nyingi?",
        },
    },
    {
        nodes: ["having a common cold"],
        question: { eng: "Do you have a cold? ", sw: "Una mafua?" },
    },
    {
        nodes: ["nasal polyps"],
        question: {
            eng: "Do you have nasal polyps? ",
            sw: "Una viuvimbe puani?",
        },
    },
    {
        nodes: ["deviated septum"],
        question: {
            eng: "Do you have a deviated septum? ",
            sw: "Una ukuta wa pua ulio pinda?",
        },
    },
    {
        nodes: ["having diabetes"],
        question: { eng: "Do you have diabetes?", sw: "Una Kisukari?" },
    },
    {
        nodes: ["malnutrition"],
        question: { eng: "Are you malnurished? ", sw: "Una utapiamlo?" },
    },
    {
        nodes: ["recurrent infection of any kind"],
        question: {
            eng: "Have you recently had recurrent infections? ",
            sw: "Umekua na maambukizi yanayo jirudia hivi karibuni?",
        },
    },
    {
        nodes: ["substance abuse"],
        question: {
            eng: "Do you use substances such as alcohol or tobacco? ",
            sw: "Unatumia vilevi kama pombe au tumbaku?",
        },
    },
    {
        nodes: ["contact with tb"],
        question: {
            eng: "Have you been in contact with someone who is known to have tuberculosis?",
            sw: "Umekutana na mtu ambaye ana Kifua Kikuu?",
        },
    },
    {
        nodes: ["silicosis**"],
        question: {
            eng: "Do you work in a mine or are you otherwise exposed to silica dust? ",
            sw: "Unafanya kazi kwenye mgodi au umekua sehemu yenye vumbi la silika?",
        },
    },
    {
        nodes: ["wood-burning stove"],
        question: {
            eng: "Do you use a wood-burning stove? ",
            sw: "Unatumia jiko linalotumia kuni?",
        },
    },
    {
        nodes: ["being hospitalized"],
        question: {
            eng:
                "Have you recently (within the last week) been admitted to the hospital or been placed on a ventilator? ",
            sw:
                "Hivi karibuni (ndani ya wiki moja iliyopita) ulilazwa hospitali au kuwekewa mashine ya kupumulia?",
        },
    },
    {
        nodes: ["outdoor air pollution***"],
        question: {
            eng: "Have you been exposed to outdoor air pollution? ",
            sw: "Umekua kwenye hewa ya nnje iliyo chafuka?",
        },
    },
    {
        nodes: ["misuse of antibiotics"],
        question: {
            eng: "Have you recently been prescribed antibiotics but did not take the whole dose? ",
            sw: "Uliandikiwa kutumia dawa za  Antibiotiki lakini hukutumia dozi nzima? ",
        },
    },
    {
        nodes: ["exposure to fumes"],
        question: {
            eng: "Have you had exposure to fumes? ",
            sw: "Umekua kwenye moshi?",
        },
    },
    {
        nodes: ["current asthma"],
        question: { eng: "Do you have asthma? ", sw: "Una pumu?" },
    },
    {
        nodes: ["chronic bronchitis"],
        question: {
            eng: "Do you have chronic bronchitis? ",
            sw: "Una bronchitis iliyo komaa?",
        },
    },
    {
        nodes: ["long-term exposure to airborne irritants"],
        question: {
            eng:
                "Have you had long-term exposure to airborne irritants? These include cigarette smoke, dust or toxic fumes, and excessive air pollution. ",
            sw:
                "Hivi karibuni umekua sehemu zenye hewa za kusababisha muwasho? Hizi ni pamoja na moshi wa sigara, vumbi au mvuke wenye sumu na hewa iliyo chafuka sana kwa mda mrefu?",
        },
    },
    {
        nodes: ["abrupt onset of symptoms"],
        question: {
            eng: "Have your symptoms abruptly started within the past 1-2 days?",
            sw: "Dalili zako zimeanza ghafla ndani ya siku 1-2 zilizopita",
        },
    },
]

export function getQuestion(nodeName: string, language: "eng" | "sw" = "eng"): string {
    const nodeMap = questionMaps.find(qn => qn.nodes.includes(nodeName))
    if (nodeMap) {
        return nodeMap.question[language]
    }
    return nodeName
}

export function getNodeGroup(nodeName: string) {
    const nodeMap = questionMaps.find(qn => qn.nodes.includes(nodeName))
    if (nodeMap) {
        return nodeMap.nodes
    }
    return [nodeName]
}

export function getRelevantNextQuestions(
    nodes: string[] = [],
    language: "eng" | "sw" = "eng",
): string[] {
    return nodes.map(nodeName => getQuestion(nodeName, language))
}