import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { initialState as initialAssessmentState } from "../../src/store/slices/assessment"
import { NextSteps, nextStepsStateReducer, initialNextStepsState } from "../../src/views/NextSteps";
import { PatientDemographics } from "../../src/views/PatientDemographics";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { investigations } from "../../src/common/investigations";
import { MEDICATIONS } from "../../src/common/medications";

describe("Next Steps View", () => {
	it("renders correctly", () => {
		renderer.create(
			<Provider store={store}>
				<NextSteps />
			</Provider>
		);
	});
	
	const state = initialNextStepsState;

	test("reducer default", () => {
		const result = nextStepsStateReducer(state, {})
		expect(result).toEqual(state)
	});

	test("reducer toggle-referred", () => {
		const result = nextStepsStateReducer(state, {
			type: "toggle-referred",
		});
		expect(result.referred).toBe(true);

		const result2 = nextStepsStateReducer(result, {
			type: "toggle-referred",
		});
		expect(result2.referred).toBe(false);
	});

	test("reducer toggle-testing", () => {
		const result = nextStepsStateReducer(state, {
			type: "toggle-testing",
		});
		expect(result.referredForTesting).toBe(true);

		const result2 = nextStepsStateReducer(
			{ ...result, investigationsOrdered: ["one", "two"] },
			{
				type: "toggle-testing",
			}
		);
		expect(result2.referredForTesting).toBe(false);
		expect(result2.investigationsOrdered).toHaveLength(0);
	});

	test("reducer toggle-medication", () => {
		const result = nextStepsStateReducer(state, {
			type: "toggle-medication",
		});
		expect(result.prescribedMedications).toBe(true);

		const result2 = nextStepsStateReducer(
			{ ...result, dispensedMedications: ["one", "two"] },
			{
				type: "toggle-medication",
			}
		);
		expect(result2.prescribedMedications).toBe(false);
		expect(result2.dispensedMedications).toHaveLength(0);
	});

	test("reducer set-recommendations", () => {
		const result = nextStepsStateReducer(state, {
			type: "set-recommendations",
			payload: "Here is some dummy text",
		});
		expect(result.recommendations).toBe("Here is some dummy text");
	});

	test("reducer update-prescription", () => {
		// first setting the medications to "true"
		const initial = nextStepsStateReducer(state, {
			type: "toggle-medication",
		});

		const result = nextStepsStateReducer(initial, {
			type: "update-prescription",
			payload: "Cough Syrup",
		});
		expect(result.dispensedMedications).toContain("Cough Syrup");

		const result2 = nextStepsStateReducer(result, {
			type: "update-prescription",
			payload: "Amoxylin",
		});

		expect(result2.dispensedMedications).toContain("Cough Syrup");
		expect(result2.dispensedMedications).toContain("Amoxylin");
		expect(result2.dispensedMedications).toHaveLength(2);

		const result3 = nextStepsStateReducer(result2, {
			type: "toggle-medication",
		});

		expect(result3.dispensedMedications).toHaveLength(0);
	});

	test("reducer update-investigation", () => {
		// first setting the testing to "true"
		const initial = nextStepsStateReducer(state, {
			type: "toggle-testing",
		});

		const result = nextStepsStateReducer(initial, {
			type: "update-investigation",
			payload: "MRDT",
		});
		expect(result.investigationsOrdered).toContain("MRDT");

		const result2 = nextStepsStateReducer(result, {
			type: "update-investigation",
			payload: "Blood Smear",
		});

		expect(result2.investigationsOrdered).toContain("MRDT");
		expect(result2.investigationsOrdered).toContain("Blood Smear");
		expect(result2.investigationsOrdered).toHaveLength(2);

		const result3 = nextStepsStateReducer(result2, {
			type: "toggle-testing",
		});

		expect(result3.investigationsOrdered).toHaveLength(0);
	});

	describe("Items selectable", function () {
		test("Referred Near Health Facility", function () {
			const { getByTestId } = render(
				<Provider store={store}>
					<NextSteps />
				</Provider>
			);

			const cbRefHealth = getByTestId("nsaRefferedHealthFacility");
			const refHealthCheckbox = getByTestId("nsaRefferedHealthFacility.checkBox");
			fireEvent.press(cbRefHealth);
			expect(refHealthCheckbox.props["checked"]).toBe(true);
		});

		/**
		 * Referred to lab
		 * -------------
		 */
		test("Referred to lab > options view render", function () {
			const { getByTestId } = render(
				<Provider store={store}>
					<NextSteps />
				</Provider>
			);

			const cbRefToLab = getByTestId("nsaRefferedToLab");
			const refHealthCheckbox = getByTestId("nsaRefferedToLab.checkBox");
			fireEvent.press(cbRefToLab);

			console.log(refHealthCheckbox.props)
			expect(refHealthCheckbox.props["checked"]).toBe(true);

			const childView = getByTestId("nsaRefferedToLabChildView");
			expect(childView).toBeDefined();
		});

		test("Referred to lab > options clickable", function () {
			const { getByTestId } = render(
				<Provider store={store}>
					<NextSteps />
				</Provider>
			);

			const cbRefToLab = getByTestId("nsaRefferedToLab");
			fireEvent.press(cbRefToLab);

			const sampleInvestigations = [investigations[0], investigations[3], investigations[5]]
			sampleInvestigations.forEach(investigation => {
				const childToggleBtn = getByTestId(`nsa.${investigation}.ToggleButton`);
				expect(childToggleBtn).toBeDefined();
			});
		});

		/**
		 * Referred Medication
		 * --------------------
		 */

		test("Refered Dispense medication > options view render", function () {
			const { getByTestId } = render(
				<Provider store={store}>
					<NextSteps />
				</Provider>
			);

			const cbRefToLab = getByTestId("nsaDispensedMedication")
			const refHealthCheckbox = getByTestId("nsaDispensedMedication.checkBox");
			fireEvent.press(cbRefToLab);
			expect(refHealthCheckbox.props).toBe(true);

			const childView = getByTestId("nsaDispensedMedicationChildView");
			expect(childView).toBeDefined();
		});

		test("Refered Dispense medication > options clickable", function () {
			const { getByTestId } = render(
				<Provider store={store}>
					<NextSteps />
				</Provider>
			);

			const cbRefToLab = getByTestId("nsaDispensedMedication");
			fireEvent.press(cbRefToLab);

			const sampleMedications = [MEDICATIONS[0], MEDICATIONS[3], MEDICATIONS[5]]
			sampleMedications.forEach(medication => {
				const childToggleBtn = getByTestId(`nsa.medication.${medication}.ToggleButton`);
				expect(childToggleBtn).toBeDefined();
			})
		})
	});

	test("State resets on press 'Next'", function () {
		expect.assertions(2);
		const Stack = createStackNavigator();

		const { getByTestId } = render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="NextSteps"
							options={{ title: "Next Steps" }}
							component={NextSteps}
						/>
						<Stack.Screen
							name="PatientDemographics"
							options={{ title: "Patient Demographics" }}
							component={PatientDemographics}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);

		const nextButton = getByTestId("nsNextButton");
		fireEvent.press(nextButton);

		// Test for the state change
		// checking if reset() has been dispatched
		const { assessment } = store.getState();
		expect(assessment).toEqual(initialAssessmentState);

		// Check for change of the view by navigator
		const patDemView = getByTestId("patientDemographicsView");
		expect(patDemView).toBeDefined();
	});

	test("Form submission", function () {
		// Add test when logic to update when code to push to DB is added
		expect(1).toBe(1)
	})
});
