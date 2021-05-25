type Bernoulli = {
	"0": { pmf: number; cdf: number };
	"1": { pmf: number; cdf: number };
	mean: number;
	median: number;
	mode: number[];
	variance: number;
	skewness: number;
	entropy: number;
	domain: { min: number; max: number };
	range: { min: number; max: number };
	generate: (n: number) => number[];
};

const getRandomArbitrary = (min: number, max: number) => {
	return Math.random() * (max - min) + min;
};

const bernoulli = (p: number): Bernoulli | undefined => {
	// Check that `p` is a valid probability (0 ≤ p ≤ 1)
	if (p < 0 || p > 1.0) {
		return undefined;
	}

	// let x;
	const dfs: Bernoulli = {
		"0": { pmf: 0.5, cdf: 0.5 },
		"1": { pmf: 0.5, cdf: 0.5 },
		mean: p,
		median: (() => {
			if (p < 0.5) {
				return 0.0;
			} else {
				if (p === 0.5) {
					return 0.5;
				} else {
					return 1.0;
				}
			}
		})(),
		mode: (() => {
			if (p < 0.5) {
				return [0.0];
			} else {
				if (p === 0.5) {
					return [0, 1];
				} else {
					return [1.0];
				}
			}
		})(),
		variance: p * (1.0 - p),
		skewness: (1.0 - p - p) / Math.sqrt(p * (1.0 - p)),
		entropy: -(1.0 - p) * Math.log(1.0 - p) - p * Math.log(p),
		domain: { min: 0, max: 1 },
		range: { min: 0.0, max: 0.0 },

		// `mctad.bernoulli(.7).generate(100)` will perform 100 Bernoulli trials, yielding 100
		// random variables each having had a success probability of .7.
		generate: (n: number) => {
			const randomVariables = [];
			for (let i = 0; i < n; i++) {
				if (getRandomArbitrary(0, 1) <= p) {
					randomVariables.push(1);
				} else {
					randomVariables.push(0);
				}
			}
			return randomVariables;
		},
	};

	// Assign the probability mass and cumulative distribution functions for the outcomes 0 or 1.
	dfs["0"] = { pmf: 1.0 - p, cdf: 1.0 - p };
	dfs["1"] = { pmf: p, cdf: 1.0 };
	if (p > 1.0 - p) {
		dfs.range.max = 0.1 * Math.ceil(10 * p);
	} else {
		dfs.range.max = 0.1 * Math.ceil(10 * (1.0 - p));
	}

	return dfs;
};

export { bernoulli };
