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

describe("Patient Demographics", () => {
	test("renders correctly", () => {
		renderer.create(
			<Provider store={store}>
				<PatientDemographics />
			</Provider>
		);
	});

	test("Next Navigation", () => {

		const Stack = createStackNavigator();

		const {getByText} = render(
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
		)

		// const button = getByText(/Next/)
		// 	fireEvent.press(button)

		// 	const headerText = getByText(/Search Conditions/)
		// 	expect(headerText).toBeTruthy();
	})
})

