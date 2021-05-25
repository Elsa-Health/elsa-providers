import _ from "lodash";
import { bernoulli } from "./bernoulli";

const mapping = {
	malaria: {
		fever: 0.95,
		jaundice: 0.75,
		vomiting: 0.4,
		headache: 0.6,
		chills: 0.75,
	},
	gastritis: {
		vomiting: 0.6,
		abdominalPain: 0.5,
		nausea: 0.9,
	},
	gastroenteritis: {
		vomiting: 0.9,
		abdominalPain: 0.5,
		diarrhoea: 0.8,
		nausea: 0.9,
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
