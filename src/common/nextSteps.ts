const nextSteps: NextStep[] = [
	{
		condition: "pneumonia",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		medications: [],
		refer: true,
		tests: ["Chest X-Ray (CXR)", "Full Blood Picture (FBP)"],
		recommendations:
			"If the patient is a smoker, recommend that they stop smoking.",
	},
	{
		condition: "pnuemocystis pneumonia",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		medications: [],
		refer: true,
		tests: ["Chest X-Ray (CXR)", "Full Blood Picture (FBP)"],
		recommendations:
			"If the patient is a smoker, recommend that they stop smoking.",
	},
	{
		condition: "tuberculosis",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		refer: true,
		medications: [],
		tests: [
			"Chest X-Ray (CXR)",
			"Full Blood Picture (FBP)",
			"GeneXpert",
			"Sputum Culture",
		],
		recommendations: "",
	},
	{
		condition: "gastritis",
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
		condition: "gastroenteritis",
		triageLevel: "home based care",
		triageDescription:
			"The patient can recieve home based care. They should seek medical attention if they experience excessive pain, excessive vomiting or diarrhoea, if there are any emergency signs, or if the patient is pregnant.",
		refer: false,
		medications: ["Oral Rehydration Salts or Fluids (if dehydrated)"],
		tests: ["Full Blood Picture (FBP)"],
		recommendations:
			"Recommend that the patient rests and avoids eating milk-based foods.",
	},
	{
		condition: "chlamydia",
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
		condition: "cryptococcal meningitis",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		refer: true,
		medications: [],
		tests: ["Full Blood Picture (FBP)", "Spinal Fluid Tap"],
		recommendations: "",
	},
	{
		condition: "tuberculosis meningitis",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		refer: true,
		medications: [],
		tests: ["Full Blood Picture (FBP)", "Spinal Fluid Tap"],
		recommendations: "",
	},
	{
		condition: "bacterial meningitis",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		refer: true,
		medications: [],
		tests: ["Full Blood Picture (FBP)", "Spinal Fluid Tap"],
		recommendations: "",
	},
	{
		condition: "urinary tract infection",
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
		condition: "gonorrhea",
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
		condition: "bacterial vaginosis",
		triageLevel: "home based care",
		triageDescription:
			"The patient can recieve home based care. They should seek medical attention if they experience these symptoms frequently or if their condition is recurrent.",
		refer: false,
		medications: ["Metronidazole"],
		tests: [],
		recommendations: "",
	},
	{
		condition: "human papilomavirus (HPV)",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		refer: true,
		medications: ["HPV Screening"],
		tests: [],
		recommendations: "",
	},
	{
		condition: "coryza",
		triageLevel: "home based care",
		triageDescription:
			"The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing or excessive coughing.",
		refer: false,
		medications: [
			"Antihistamines (If available)",
			"Paracetamol (Syrup for children)",
		],
		tests: [],
		recommendations:
			"Recommend that the patient self-isolate and treats symptoms. Patient should rest and drink plenty of fluids.",
	},
	{
		condition: "malaria",
		triageLevel: "refer immediately",
		triageDescription:
			"Refer the patient to a health facility immediately.",
		refer: true,
		medications: ["ALU", "Diazepam"],
		tests: ["MRDT"],
		recommendations:
			"Begin patient on ALU/Quinine and document with patient. Give diazepam if convulsing and document.",
	},
	{
		condition: "influenza",
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
		condition: "tonsillitis",
		triageLevel: "home based care",
		triageDescription:
			"The patient can recieve home based care. They should seek medical attention if they experience difficulty breathing, if they cannot eat, if their symptoms come back, or if this is the second time with this condition.",
		refer: false,
		medications: ["Ampiclox", "Paracetamol"],
		tests: ["Full Blood Picture (FBP)"],
		recommendations: "Recommend that the patient rests at home.",
	},
	{
		condition: "laryngitis",
		triageLevel: "refer within 24 hours",
		triageDescription:
			"Refer the patient to a health facility. They should seek care within 24 hours.",
		refer: true,
		medications: [],
		tests: [],
		recommendations: "Recommend that the patient rests their voice.",
	},
	{
		condition: "bronchitis",
		triageLevel: "refer within 24 hours",
		triageDescription:
			"Refer the patient to a health facility. They should seek care within 24 hours.",
		refer: true,
		medications: ["Nonsteroidal anti-inflammatory drug (NSAIDs)"],
		tests: ["Chest X-Ray (CXR)"],
		recommendations: "",
	},
	// {
	//     condition: "gorhea",
	//     triageLevel: "refer within 24 hours",
	//     triageDescription: "",
	//     refer: true,
	//     medications: [],
	//     tests: [],
	//     recommendations: "",
	// },
	// {
	//     condition: "gorhea",
	//     triageLevel: "refer within 24 hours",
	//     triageDescription: "",
	//     refer: true,
	//     medications: [],
	//     tests: [],
	//     recommendations: "",
	// },
	{
		condition: "default",
		triageLevel: "refer within 24 hours",
		triageDescription: "",
		refer: true,
		medications: [],
		tests: [],
		recommendations: "",
	},
];
// End here

export function getConditionNextSteps(condition: string): NextStep {
	return (nextSteps.find(
		(steps) => steps.condition.toLowerCase() === condition.toLowerCase()
	) ||
		nextSteps.find(
			(steps) => steps.condition.toLowerCase() === "default"
		)) as NextStep;
}
