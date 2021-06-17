import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native"

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { AssessmentSummary } from "../../src/views/AssessmentSummary";
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import store from "../../src/store";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NextSteps } from "../../src/views/NextSteps";

jest.useFakeTimers();

describe("Testing the AssessmentSummary View", () => {
	test("renders", () =>{
		const {getByTestId} = render(
			<Provider store={store}>
				<AssessmentSummary />
			</Provider>
		)

		const textComp = getByTestId("assesssmentSummaryView")
		expect(textComp).toBeTruthy()
	})

	test("can navigate to NextSteps View", () => {
		const Stack = createStackNavigator();
		const { getByTestId } = render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="AssessmentSummary"
							options={{ title: "Assessment Summary" }}
							component={AssessmentSummary}
						/>
						<Stack.Screen
							name="NextSteps"
							options={{ title: "Next Steps" }}
							component={NextSteps}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);

		const button = getByTestId("asSumNextButton")
		fireEvent.press(button)

		const headerText = getByTestId("nextStepsView")
		expect(headerText).toBeTruthy();
	})

})
