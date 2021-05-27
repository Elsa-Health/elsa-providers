import _ from "lodash";
import { bernoulli } from "./bernoulli";

const mapping = {
	malaria: {
		fever: 0.95,
		jaundice: 0.4,
		vomiting: 0.8,
		headache: 0.6,
		chills: 0.7,
		lethargy: 0.85,
		pallor: 0.8,
		weightLoss: 0.8,
		// anaemia: 0.5,
		// coma: 0.2,
		// convulsions: 0.4
		// hypoglycemia: 0.5
		// hypotension: 0.4
		// labouredBreathing: 0.25
		// unableToFeed: 0.8
		bodyWeakness: 0.85,
		darkUrine: 0.4,
	},
	gastritis: {
		vomiting: 0.5,
		abdominalPain: 0.95,
		// abdominalPainRadiateToBack: 0.2,
		abdominalTenderness: 0.5,
		epigastricPain: 0.95,
		hematemesis: 0.3,
		nausea: 0.6,
	},
	gastroenteritis: {
		// dehydration: 0.7,
		// abdominalGuarding: 0.2,
		// confusion: 0.1,
		// irritable: 0.9,
		seizures: 0.1,
		soreThroat: 0.1,
		rhinorrhea: 0.1,
		cough: 0.1,
		vomiting: 0.9,
		abdominalTenderness: 0.7,
		abdominalPain: 0.85,
		diarrhoea: 0.9,
		fever: 0.6,
		nausea: 0.93,
	},
	pneumonia: {
		chestPain: 0.7,
		cough: 0.95,
		productiveCough: 0.95,
		crackles: 0.9,
		dyspnoea: 0.95,
		fever: 0.95,
		// intercostalDrawing: 0.65,
		nasalCongestion: 0.25,
		// nasalFlaring: 0.25,
		tachypnea: 0.95,
	},
	tuberculosis: {
		chestPain: 0.5,
		cough: 0.95,
		productiveCough: 0.95,
		dyspnoea: 0.5,
		fever: 0.9,
		hypopnea: 0.5,
		malaise: 0.9,
		nightSweats: 0.9,
		tachypnea: 0.5,
		weightLoss: 0.9,
	},
	asthma: {
		barrelChest: 0.25,
		chestTightness: 0.92,
		cough: 0.9,
		dyspnoea: 0.9,
		tachypnea: 0.4,
		wheezing: 0.95,
	},
	coryza: {},
	sinusitis: {},
	anaemia: {},
	malnutririon: {},
	urinaryTractInfection: {},
	laryngitis: {
		difficultySwallowing: 0.8,
		voiceLoss: 0.85,
		soreThroat: 0.75,
		tenderAnteriorNeck: 0.85,
		voiceHoarseness: 0.85,
	},
	tonsilitis: {},
	septicemia: {},
	tineaCorporis: {},
	tineaNigra: {},
	scabies: {
		impetigo: 0.2,
		papules: 0.98,
		// extremityPapules: 0.98,
		// genitalPapules: 0.98,
		pruritus: 1.0,
		// pruritusWorseAtNight: 0.9,
		skinBurrows: 0.75,
		skinCrusts: 0.15,
	},
	typhoid: {},
	cholera: {},
	otitisMedia: {
		earPain: 0.95,
		earDischarge: 0.3,
		fever: 0.4,
		headache: 0.3,
	},
	conjunctivitis: {
		eyeDischarge: 0.98,
		fever: 0.25,
		itcyEyes: 0.8,
		redEyes: 0.8,
		rhinorrhea: 0.3,
		soreThroat: 0.3,
		swollenEyes: 0.8,
	},
};

export type conditionMapping = typeof mapping;
export type condition = keyof conditionMapping;

function rescaleMapping(mapping: { [key: string]: any }): {
	[key: string]: any;
} {
	const res = {};
	Object.keys(mapping).forEach((m) => (res[m] = mapping[m] * 0.5 + 0.5));
	return res;
}

function simulate(
	condition: condition,
	n: number,
	rescaler?: (mapping: conditionMapping) => any
): Simulation {
	const symptoms = Object.keys(mapping[condition]);

	const rescaledMapping = (() => {
		if (rescaler) {
			return rescaler(mapping[condition]);
		}
		return mapping[condition];
	})();

	return {
		symptoms,
		samples: _.times(n, (idx) =>
			symptoms.map(
				(symptom) => bernoulli(rescaledMapping[symptom]).generate(1)[0]
			)
		),
	};
}

function euclidean_similarity(
	simulation: Simulation,
	presentation: Simulation
): number {
	const difference = _.differenceWith(
		simulation.symptoms,
		presentation.symptoms
	);
	const populationSize = simulation.samples.length;

	const sum = simulation.samples.reduce((a, b) =>
		a.map((x, idx) => b[idx] + x)
	);

	console.log(sum);
	const likelihood = sum.map((s) => s / populationSize);

	console.log(_.sum(likelihood) / likelihood.length);

	const s = likelihood
		.map((l, idx) => {
			const symptomName = simulation.symptoms[idx];
			const symptomIndex = presentation.symptoms.indexOf(symptomName);
			return symptomIndex > -1
				? l - presentation.samples[0][symptomIndex]
				: undefined;
		})
		.filter((a) => a !== undefined)
		.map((l) => l * l);

	console.log(_.sum(s.map((s) => 1 - s)) / s.length);

	return 1 - (Math.sqrt(s.reduce((a, b) => a + b, 0)) || 1);
}

function mean_similarity(
	simulation: Simulation,
	presentation: Simulation,
	penalty = -0.5
): number {
	// const difference = _.differenceWith(
	// 	simulation.symptoms,
	// 	presentation.symptoms
	// );

	// Get population size (depending on the simulations done) and symptoms from the simulations
	const populationSize = simulation.samples.length;
	const symptoms = simulation.symptoms;

	// Get the probabilities of each symptom by getting the sum of all the symptoms
	// and dividin each symptom sum by the population size
	// i.e: out of 1000 samples, 700 have fever => 700 / 1000 => 0.7
	const symptomProbability = simulation.samples
		.reduce(
			(a, b) => a.map((x, idx) => b[idx] + x),
			_.times(symptoms.length, () => 0)
		)
		.map((s) => s / populationSize);

	// Get the likelihood of our patient belonging to each diagnosis by comparing the symptoms they have
	// to those expected (and their probabilities) by this condition
	const a = presentation.symptoms
		.map((sy, idx) => {
			const symptomIdx = symptoms.indexOf(sy);
			if (symptomIdx > -1) {
				return (
					symptomProbability[symptomIdx] *
					presentation.samples[0][idx]
				);
			}

			// If the patient has symptoms that are no caused by this condition, we penalize by the `penalty` value.
			// Otherwise return undefined for symptoms that are recorded as non-existent
			return presentation.samples[0][idx] === 1 ? penalty : undefined;
		})
		// Remove all the non-relevant symptoms for this condition
		.filter((a) => a !== undefined);

	// console.log(a)

	// console.log(_.mean(a.filter(s => s >= 0)))

	// console.log(_.mean(a))

	// NEXT: return median, max, mean, std, skewness (maybe just initialize it as a bernoulli and just return that???)
	return a.length > 0 ? _.mean(a) : 0;
}

function symptomAssessment(patient: Simulation, n = 1000, penalty = -0.1) {
	return (
		Object.keys(mapping)
			.map((cond) => {
				return {
					condition: cond,
					similarity: Number(
						mean_similarity(
							simulate(cond, n, rescaleMapping),
							patient,
							penalty
						).toFixed(3)
					),
				};
			})
			// Make the minimum number a 0.01
			.map((cond) => ({
				...cond,
				similarity: Math.max(cond.similarity, 0.01),
			}))
	);
}

function withUncertainities(object, key: string, groups = 5, n = 1000, func) {
	const groupSimulations = _.times(groups, (g) => func(object, n));
	const result = _.omit(object, [key]);
	// groupSimulations.reduce
	// TODO: fix
}

function getConditionEffects(conditionName: string) {
	const sanitizedName = _.camelCase(conditionName) as condition;

	console.log("sanitizedName", sanitizedName);

	return mapping[sanitizedName];
}

function humanFriendlyVariableName(name: string): string {
	const sanitizedName = _.kebabCase(name)
		.split("-")
		.map((c) => _.upperFirst(c))
		.join(" ") as condition;

	return sanitizedName;
}

const patient: Simulation = {
	symptoms: ["abdominalPain", "vomiting", "fever"],
	samples: [[1, 1, 1]],
};

console.log(symptomAssessment(patient));

export {
	mapping as conditionEffects,
	getConditionEffects,
	humanFriendlyVariableName,
	symptomAssessment,
};
