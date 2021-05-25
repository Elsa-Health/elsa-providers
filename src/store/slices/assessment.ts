import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toggleList } from "../../common/utils";

type SliceState = {
	sex: "male" | "female";
	years: number;
	months: number;
	selectedSymptoms: string[];
	dispenserDifferentialDiagnoses: string[];
};

type demography = {
	years: number;
	months: number;
	sex: sex;
};

const initialState: SliceState = {
	sex: "male",
	years: 0,
	months: 0,
	selectedSymptoms: [],
	dispenserDifferentialDiagnoses: [],
};

export const assessmentSlice = createSlice({
	name: "facility",
	initialState,
	reducers: {
		toggleSymptom: (state, action: PayloadAction<string>) => {
			const symptom = action.payload;
			state.selectedSymptoms = toggleList(
				state.selectedSymptoms,
				symptom
			);
		},
		updateDemographics: (state, action: PayloadAction<demography>) => {
			state.sex = action.payload.sex;
			state.months = action.payload.months;
			state.years = action.payload.years;
		},
		updateYears: (state, action: PayloadAction<number>) => {
			state.years = action.payload;
		},
		updateMonths: (state, action: PayloadAction<number>) => {
			state.months = action.payload;
		},
		toggleSex: (state, action: PayloadAction<sex>) => {
			state.sex = action.payload;
		},
		toggleDispenserDifferentialDiagnoses: (
			state,
			action: PayloadAction<string>
		) => {
			const diag = action.payload;
			state.dispenserDifferentialDiagnoses = toggleList(
				state.dispenserDifferentialDiagnoses,
				diag
			);
		},
		reset: (state) => {
			console.warn("reseetting", initialState);
			const {
				years,
				months,
				sex,
				selectedSymptoms,
				dispenserDifferentialDiagnoses,
			} = initialState;

			state.years = years;
			state.months = months;
			state.sex = sex;
			state.dispenserDifferentialDiagnoses =
				dispenserDifferentialDiagnoses;
			state.selectedSymptoms = selectedSymptoms;
		},
	},
});

export const {
	toggleSymptom,
	updateDemographics,
	toggleSex,
	updateMonths,
	updateYears,
	toggleDispenserDifferentialDiagnoses,
	reset,
} = assessmentSlice.actions;
export { initialState as initialAssessmentSlice };
export default assessmentSlice.reducer;

// FIXME: add a work around for non-selected symptoms
