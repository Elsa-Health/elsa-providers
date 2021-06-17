import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native"

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import store from "../../src/store";
import { PatientDemographics } from "../../src/views/PatientDemographics";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {ConditionInput} from "../../src/views/ConditionInput"
import { createStackNavigator } from "@react-navigation/stack";

jest.useFakeTimers();

describe("Patient Demographics", () => {
	test("renders correctly", () => {
		renderer.create(
			<Provider store={store}>
				<PatientDemographics />
			</Provider>
		);
	});

	/**
	 * Can choose sex
	 * Expect when one is selected, the others are deselected
	 */
	describe("can choose sex", () => {
		test("male", () => {
			const { getByTestId } = render(
				<Provider store={store}>
					<PatientDemographics />
				</Provider>
			);

			const pressable = getByTestId("pdTouchableMaleChoice");
			fireEvent.press(pressable);

			// check store
			const { assessment } = store.getState();
			expect(assessment.sex).toBe("male");
		});

		test("female", () => {
			const { getByTestId } = render(
				<Provider store={store}>
					<PatientDemographics />
				</Provider>
			);

			const pressable = getByTestId("pdTouchableFemaleChoice");
			fireEvent.press(pressable);

			// check store
			const { assessment } = store.getState();
			expect(assessment.sex).toBe("female");
		});
	});

	test("can navigate to next screen", () => {
		const Stack = createStackNavigator();
		
		const { getByTestId } = render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="QRAuthenticator">
						<Stack.Screen
							name="PatientDemographics"
							options={{ title: "Patient Demographics" }}
							component={PatientDemographics}
						/>
						<Stack.Screen
							name="ConditionInput"
							options={{ title: "Condition Input" }}
							component={ConditionInput}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);

		// choose male
		const CHOSEN_SEX = "male"
		const pressable = getByTestId("pdTouchableMaleChoice");
		fireEvent.press(pressable);

		// adding 
		const YEARS = 23;
		fireEvent.changeText(getByTestId("pdYearsInput"), YEARS);

		const MONTHS = 2;
		fireEvent.changeText(getByTestId("pdMonthInput"), MONTHS);

		const button = getByTestId("pdNextButton");
		fireEvent.press(button);

		// changed view to Conditional Input Screen
		const headerText = getByTestId("ConditionalInputScrollView");
		expect(headerText).toBeTruthy();

		// Check to see the state
		const { assessment } = store.getState();
		const { sex, years, months } = assessment;
		expect({ sex, years, months }).toEqual({
			sex: CHOSEN_SEX,
			years: YEARS,
			months: MONTHS,
		});
	});
});

