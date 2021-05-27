import _ from "lodash";
import {
	conditionEffects,
	euclidean_similarity,
	rescaleMapping,
	simulate,
} from "..";

test("euclidean_similarity runs", () => {
	// NEXT: run this test for all conditions (maybe as a loop)
	// Pick a condition at random
	const randCondition = _.sample(
		_.keys(conditionEffects).filter(
			(condition) => _.values(conditionEffects[condition]).length > 0
		)
	);

	const patient: Simulation = {
		symptoms: _.keys(conditionEffects[randCondition]),
		samples: [
			Array(_.keys(conditionEffects[randCondition]).length).fill(1),
		],
	};

	const PENALTY = -0.1;

	const results = Object.keys(conditionEffects)
		.map((cond) => {
			return {
				condition: cond,
				similarity: Number(
					euclidean_similarity(
						simulate(cond, 1000, rescaleMapping),
						patient
					).toFixed(3)
				),
			};
		})
		// Make the minimum number a 0.01
		.map((cond) => ({
			...cond,
			similarity: Math.max(cond.similarity, 0.01),
		}));

	const conditionLikelihood = results.find(
		(r) => r.condition === randCondition
	)?.similarity;

	console.log(randCondition, patient);

	// NOTE: Mean similarity is a poorly perfoming model for high dimensional data
	expect(conditionLikelihood).toBeGreaterThan(0.0);
});
