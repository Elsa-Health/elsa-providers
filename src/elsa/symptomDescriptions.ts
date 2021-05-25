interface SymptomDescription {
	name: string;
	description: string;
}

const symptomDescriptions = {
	dysuria: {
		name: "Dysuria",
		description: "Kutojisikia wakati wa kukojoa??",
	},
	frequentMicturation: {
		name: "Frequent micturation",
		description: "Kukojoa mara kwa mara kuliko kawaida?",
	},
	pelvicPain: {
		name: "Pelvic pain",
		description: "Maumivu katika pelvis yao?",
	},
	backPain: {
		name: "Back pain",
		description: "Maumivu ya mgongo?",
	},
	nausea: {
		name: "Nausea",
		description: "Kichefuchefu au tumbo kujaa gesi?",
	},
	vomiting: {
		name: "Vomiting",
		description: "Kutapika?",
	},
	fever: {
		name: "Fever",
		description: "Homa",
	},
	fatigue: {
		name: "Fatigue",
		description: "Uchovu",
	},
	genitalWarts: {
		name: "Genital warts",
		description: "Viupele sehemu zao za siri?",
	},
	vaginalItching: {
		name: "Vaginal itching",
		description: "Kuwashwa uke?",
	},
	whiteVaginalDischarge: {
		name: "White vaginal discharge",
		description: "Utokwaji na majimaji meupe ukeni?",
	},
	vaginalDischarge: {
		name: "Vaginal discharge",
		description:
			"Utokwaji na majimaji kusikokuwa kwa kawaida kutoka kwenye uke?",
	},
	fishyVaginalDischarge: {
		name: "Fishy vaginal discharge",
		description: "Maji maji Kutoka ukeni yenye harufu ya samaki au shombe?",
	},
	genitalDischarge: {
		name: "Genital discharge",
		description:
			"Utokwaji na majimaji usiokuwa wa kawaida kutoka kwenye sehemu za siri?",
	},
	abdominalPain: {
		name: "Abdominal pain",
		description: "Maumivu ya tumbo?",
	},
	painfulScrotalSwelling: {
		name: "Painful scrotal swelling",
		description: "Maumivu au uvimbe kwenye mfuko wa tezi dume?",
	},
	dyspareunia: {
		name: "Dyspareunia",
		description:
			"Maumivu katika sehemu zao za siri wakati au baada ya kujamiiana?",
	},
	penisOpeningDiscomfort: {
		name: "Penis opening discomfort",
		description: "Maumivu kwenye ncha ya uume?",
	},
	menorrhagia: {
		name: "Menorrhagia",
		description: "Kupata hedhi nzito au nyingi (zaidi ya kawaida)?",
	},
	metrorrhagia: {
		name: "Metrorrhagia",
		description: "Kutokwa na damu katika siku zisizo za hedhi?",
	},
	testicularPain: {
		name: "Testicular pain",
		description: "Maumivu kwenye korodani",
	},
	testicularSwelling: {
		name: "Testicular swelling",
		description: "Uvimbe wa korodani?",
	},
	foulVaginalDischarge: {
		name: "Foul vaginal discharge",
		description: "Kutokwa na harufu mbaya ukeni?",
	},
	postcoitalBleeding: {
		name: "Postcoital bleeding",
		description: "Kutokwa na damu baada ya kujamiiana?",
	},
	yellowVaginalDischarge: {
		name: "Yellow vaginal discharge",
		description: "Utokwaji wa majimaji ya manjano ukeni?",
	},
	penileDischarge: {
		name: "Penile discharge",
		description:
			"Utokwaji majimaji usiokuwa wa kawaida kutoka kwenye uume?",
	},
	genitalItching: {
		name: "Genital itching",
		description: "Kuwashwa sehemu za siri?",
	},
	malaise: {
		name: "Malaise",
		description: "Kujisikia vibaya mwili mzima?",
	},
	headache: {
		name: "Headache",
		description: "Maumivu ya kichwa?",
	},
	stiffNeck: {
		name: "Stiff neck",
		description: "Shingo kuwa ngumu?",
	},
	photophobia: {
		name: "Photophobia",
		description: "Maumivu ya macho kwenye mwanga?",
	},
	coma: {
		name: "Coma",
		description: "Kupoteza fahamu kwa muda mrefu (coma)?",
	},
	cough: {
		name: "Cough",
		description: "Kikohozi?",
	},
	dyspnoea: {
		name: "Dyspnoea",
		description: "Ugumu wa kupumua",
	},
	skinRash: {
		name: "Skin rash",
		description: "Upele kwenye ngozi?",
	},
	visualImpairment: {
		name: "Visual impairment",
		description: "Kupoteza uono au mabadiliko ya ghafla katika uono wao?",
	},
	hearingImpairment: {
		name: "Hearing impairment",
		description:
			"Kupoteza usikivu au mabadiliko ya ghafla katika kusikia kwao?",
	},
	lethargy: {
		name: "Lethargy",
		description: "Ulevi au ukosefu wa nguvu?",
	},
	confusion: {
		name: "Confusion",
		description: "Mkanganyiko?",
	},
	alteredMentalStatus: {
		name: "Altered mental status",
		description: "Mabadiliko makubwa katika hali ya akili?",
	},
	focalNeurologicalDeficit: {
		name: "Focal neurological deficit",
		description:
			"Kazi isiyo ya kawaida ya eneo la mwili (kama vile uso, mikono, ulimi, au macho)?",
	},
	diastolicHypertension: {
		name: "Diastolic hypertension",
		description: "Shinikizo la damu la juu?",
	},
	lowGradeFever: {
		name: "Low grade fever",
		description: "Homa ya kiwango cha chini?",
	},
	weightLoss: {
		name: "Weight loss",
		description: "Kupungua uzito bila kutarajia?",
	},
	lossOfConsiousness: {
		name: "Loss of consiousness",
		description: "Kupoteza mazungumzo?",
	},
	paralysis: {
		name: "Paralysis",
		description: "Kupooza au kukosa uwezo wa kusogeza sehemu za mwili wao?",
	},
	motorParalysis: {
		name: "Motor paralysis",
		description: "Kupoteza kazi ya motor?",
	},
	cranialNervePalsy: {
		name: "Cranial nerve palsy",
		description: "Kupoteza kazi ya macho au kuona mara mbili?",
	},
	abnormalPosturing: {
		name: "Abnormal posturing",
		description: "Kupunguka kwa uhiari au kupanua mikono na miguu?",
	},
	historyOfTb: {
		name: "History of tb",
		description: "Historia ya kifua kikuu",
	},
	seizures: {
		name: "Seizures",
		description: "Mshtuko?",
	},
	dryCough: {
		name: "Dry cough",
		description: "Kikohozi kikavu",
	},
	eyePain: {
		name: "Eye pain",
		description: "maumivu ya jicho",
	},
	blurredVision: {
		name: "Blurred vision",
		description: "uono hafifu",
	},
	darkUrine: {
		name: "Dark urine",
		description: "Mkojo wenye rangi nyeusi (kama Coca-Cola)?",
	},
	clayColouredStools: {
		name: "Clay coloured stools",
		description: "Kinyesi cha rangi iliyopauka (rangi ya udongo)?",
	},
	jaundice: {
		name: "Jaundice",
		description: "Ngozi ya manjano au macho?",
	},
	menWhoHaveSexWithMen: {
		name: "Men who have sex with men",
		description: "unafanya ngono na watu wa jinsia moja?",
	},
	multipleSexualPartners: {
		name: "Multiple sexual partners",
		description: "Je! Una washirika wengi wa ngono?",
	},
	chills: {
		name: "Chills",
		description: "Baridi?",
	},
	chestPain: {
		name: "Chest pain",
		description: "Maumivu ya kifua?",
	},
	tachypnoea: {
		name: "Tachypnoea",
		description: "Kupumua haraka?",
	},
	hypoxiaAfterExertion: {
		name: "Hypoxia after exertion",
		description:
			"Kupungua kwa oksijeni baada ya mazoezi ya wastani/kawaida?",
	},
	productiveCough: {
		name: "Productive cough",
		description: "Kikohozi zalishi?",
	},
	nightSweats: {
		name: "Night sweats",
		description: "Kutokwa na jasho nyakati za usiku?",
	},
	burningEpigastricPain: {
		name: "Burning epigastric pain",
		description: "Maumivu kama ya kuungua ndani ya tumbo?",
	},
	epigastricPainBeforeMeals: {
		name: "Epigastric pain before meals",
		description: "Maumivu ya tumbo kabla ya kula?",
	},
	epigastricPainAfterMeals: {
		name: "Epigastric pain after meals",
		description: "Maumivu ya tumbo baada ya kula?",
	},
	diarrhoea: {
		name: "Diarrhoea",
		description: "kuhara?",
	},
	soreThroat: {
		name: "Sore throat",
		description: "Koo lenye vidonda",
	},
	rhinorrhea: {
		name: "Rhinorrhea",
		description: "mafua makali",
	},
	irritability: {
		name: "Irritability",
		description: "Kuwashwa?",
	},
	dehydration: {
		name: "Dehydration",
		description: "Ukosefu wa maji mwilini?",
	},
	abdominalTenderness: {
		name: "Abdominal tenderness",
		description: "Utulivu ndani ya tumbo?",
	},
	convulsions: {
		name: "Convulsions",
		description:
			"Machafuko (ghafla, harakati isiyo ya kawaida ya kiungo au ya mwili)?",
	},
	hypoglycemia: {
		name: "Hypoglycemia",
		description: "Sukari ya chini ya damu?",
	},
	anaemia: {
		name: "Anaemia",
		description: "Upungufu wa damu?",
	},
	sneezing: {
		name: "Sneezing",
		description: "Kupiga chafya?",
	},
	myalgia: {
		name: "Myalgia",
		description: "Maumivu ya misuli?",
	},
	lossOfAppetite: {
		name: "Loss of appetite",
		description: "Kupoteza hamu ya kula?",
	},
	lossOfSmell: {
		name: "Loss of smell",
		description: "Kupoteza harufu?",
	},
	highGradeFever: {
		name: "High grade fever",
		description: "Homa ya kiwango cha juu?",
	},
	difficultySwallowing: {
		name: "Difficulty swallowing",
		description: "Ugumu au kushindwa kumeza?",
	},
	hoarseness: {
		name: "Hoarseness",
		description: "Kubadilika au kukwaruza kwa sauti?",
	},
	halitosis: {
		name: "Halitosis",
		description: "Harufu mbaya kinywani?",
	},
	swollenLymphNodes: {
		name: "Swollen lymph nodes",
		description: "uvimbe",
	},
	whitePatchesOnTonsils: {
		name: "White patches on tonsils",
		description: "Vipande vyeupe kwenye tezi zao?",
	},
	voiceLoss: {
		name: "Voice loss",
		description: "Kupoteza sauti?",
	},
	tenderAnteriorNeck: {
		name: "Tender anterior neck",
		description: "Maumivu unapobonyeza nyuma ya shingo?",
	},
	nasalCongestion: {
		name: "Nasal congestion",
		description: "Pua kuziba?",
	},
	vaginalInflammation: {
		name: "Vaginal inflammation",
		description: "Hisia ya uvimbejoto katika uke?",
	},
	curdLikeVaginalDischarge: {
		name: "Curd like vaginal discharge",
		description:
			"Kutokwa na majimaji ukeni yanayofanana na maziwa ya mgando?",
	},
	prolongedUseOfAntibiotics: {
		name: "Prolonged use of antibiotics",
		description: "Matumizi ya muda mrefu ya antibiotiki?",
	},
	pinsAndNeedles: {
		name: "Pins and needles",
		description: "Kuhisi pini na sindano katika mwili wao?",
	},
	genitalUlcers: {
		name: "Genital ulcers",
		description: "Mabonge au vidonda karibu na sehemu za siri?",
	},
	mouthUlcers: {
		name: "Mouth ulcers",
		description: "Mabonge au vidonda kuzunguka mdomo?",
	},
	multipleVesicleLesions: {
		name: "Multiple vesicle lesions",
		description: "Vidonda vingi au matuta yenye maji ndani yao?",
	},
	pusFilledPainfulSores: {
		name: "Pus filled painful sores",
		description: "Vidonda vikali vilivyojazwa?",
	},
	inflamedForeskin: {
		name: "Inflamed foreskin",
		description: "Ngozi iliyokunjamana?",
	},
	painfulJoints: {
		name: "Painful joints",
		description: "Viungo vyenye maumivu?",
	},
	painlessSoreOnGenitalsOrMouth: {
		name: "Painless sore on genitals or mouth",
		description:
			"Vidonda visivyo na maumivu kwenye sehemu za siri au kinywa?",
	},
	copperPennyRash: {
		name: "Copper penny rash",
		description:
			"Upele wa rangi ya waridi kwenye mitende ya mikono yao au nyayo za miguu yao?",
	},
	arthritis: {
		name: "Arthritis",
		description: "Uvimbe wa viungo vyao?",
	},
	urethralDischarge: {
		name: "Urethral discharge",
		description: "Utoaji usiokuwa wa kawaida kutoka kwenye mrija wa uume",
	},
	decreasedVisualAcuity: {
		name: "Decreased visual acuity",
		description: "Kupunguza uwezo wa kuona?",
	},
};

const defaultSymptomDescription = {
	name: "",
	description: "",
};

type symptomName = keyof typeof symptomDescriptions;

function getSymptomWithDescription(symptonName: symptomName): SymptomDescription {
	return symptomDescriptions[symptonName] || defaultSymptomDescription;
}

export { symptomDescriptions, getSymptomWithDescription };
