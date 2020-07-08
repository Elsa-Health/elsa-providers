const signs: string[] = [
	"central cyanosis",
	"severe chest pain",
	"severe dyspnea",
];
export const extendedSymptomsWatch: string[] = [
	"dry cough",
	"sputum production",
	"5 days cough",
	"2 days fever",
	"sever chest pain",
	"severe dyspnea",
];

export const followUpRecomendationSymptoms: string[] = [
	...extendedSymptomsWatch,
	"cough",
	"fever",
	"chest pain",
	"dyspnea",
];

export const riskFactors: RiskFactor[] = [
	"direct contact",
	"high risk travel",
	"low risk travel",
	"smoking",
];

export const trackSymptoms = [
	"fever",
	"cough",
	"dyspnea",
	"chest pain",
];

export default signs;
