import store from "../../src/store";
import {
	initialAssessmentSlice,
	reset,
	toggleDispenserDifferentialDiagnoses,
	toggleSex,
	toggleSymptom,
	updateDemographics,
	updateMonths,
	updateYears,
} from "../../src/store/slices/assessment";
import {
	initialAuthenticationSlice,
	login,
	logout,
} from "../../src/store/slices/authentication";

test("assessmentSlice test", () => {
	let state = store.getState().assessment;

	expect(state).toEqual(initialAssessmentSlice);

	store.dispatch(toggleSex("female"));
	state = store.getState().assessment;
	expect(state.sex).toEqual("female");

	store.dispatch(toggleSex("male"));
	state = store.getState().assessment;
	expect(state.sex).toEqual("male");

	store.dispatch(updateMonths(11));
	state = store.getState().assessment;
	expect(state.months).toEqual(11);

	store.dispatch(updateYears(14));
	state = store.getState().assessment;
	expect(state.years).toEqual(14);

	store.dispatch(toggleSymptom("Fever"));
	state = store.getState().assessment;
	expect(state.selectedSymptoms).toContain("Fever");
	expect(state.selectedSymptoms).toHaveLength(1);

	store.dispatch(toggleDispenserDifferentialDiagnoses("Malaria"));
	state = store.getState().assessment;
	expect(state.dispenserDifferentialDiagnoses).toContain("Malaria");
	expect(state.dispenserDifferentialDiagnoses).toHaveLength(1);

	store.dispatch(
		updateDemographics({
			years: 33,
			months: 2,
			sex: "male",
		})
	);
	state = store.getState().assessment;
	expect(state.years).toBe(33);
	expect(state.months).toBe(2);
	expect(state.sex).toBe("male");
	expect(state.selectedSymptoms).toHaveLength(1);

	store.dispatch(reset());
	state = store.getState().assessment;
	expect(state).toEqual(initialAssessmentSlice);
});

test("authentication test", () => {
	const mockClinician = {
		lat: 23,
		lng: 33,
		loggedIn: true,
		name: "My Name",
		uid: "9walijdmczorew",
	};
	let state = store.getState().authentication;

	expect(state).toEqual(initialAuthenticationSlice);

	store.dispatch(login(mockClinician));
	state = store.getState().authentication;
	expect(state).toEqual(mockClinician);

	store.dispatch(logout());
	state = store.getState().authentication;
	expect(state).toEqual(initialAuthenticationSlice);
});
