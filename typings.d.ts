type triageLevel =
	| "refer immediately"
	| "home based care"
	| "refer within 24 hours"
	| "refer within 2 weeks"
	| "refer within 2 days";

interface NextStep {
	condition: string;
	triageLevel: triageLevel;
	triageDescription: string;
	refer: boolean;
	medications: string[];
	tests: string[];
	recommendations: string;
}

type Simulation = {
	symptoms: string[];
	samples: number[][];
};

type sex = "male" | "female"