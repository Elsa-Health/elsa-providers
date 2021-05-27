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

it("renders correctly", () => {
	renderer.create(
		<Provider store={store}>
			<AssessmentSummary />
		</Provider>
	);
});

describe("Testing the Assessment summary", () => {
	test("The page renders", () =>{
		const {getByText} = render(
		<Provider store={store}>
			<AssessmentSummary />
		</Provider>
		)

		const textComp = getByText("Your Decisions")
		expect(textComp).toBeTruthy()
	})

	test("Next Navigation", () => {

		const Stack = createStackNavigator();

		const {getByText} = render(
			<Provider store={store}>
			<PaperProvider>
				<StatusBar barStyle={"light-content"} backgroundColor="white" />
				<NavigationContainer>
					<Stack.Navigator initialRouteName="QRAuthenticator">
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
			</PaperProvider>
		</Provider>
			)
	
			const button = getByText("Next")
			fireEvent.press(button)

			const headerText = getByText(/I provided the following recommendations:/)
			expect(headerText).toBeTruthy();
	})
})
