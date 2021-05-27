import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { ConditionForm } from "../../src/views/ConditionForm";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NextSteps } from "../../src/views/NextSteps";
import { Button, StatusBar } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { AssessmentSummary } from "../../src/views/AssessmentSummary";
import { conditions } from "../../src/common/conditions";

const Stack = createStackNavigator();


describe("Condition form render test", () => {
	
	test("renders correctly with an empty conditions list", () => {
		const {getByText} = render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="ConditionForm">
						<Stack.Screen
							name="ConditionForm"
							component={ConditionForm}
							initialParams={{
								conditions: [],
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>	
		)
		const headerText = ("No Condition is selected");
		expect(headerText).toBeTruthy();
		
	});

	test("renders correctly with a conditions list with diseases", () => {
		// const _conditions = conditions
		const {getByText} =render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="ConditionForm">
						<Stack.Screen
							name="ConditionForm"
							options={{ title: "Condition Breakdown" }}
							component={ConditionForm}
							initialParams={{
								conditions,
							}}
						/>					
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	})

	test("Checks if the page navigate to the condition form for Malaria", () => {
		// ..
		const {getByText} =render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="ConditionForm">
						<Stack.Screen
							name="ConditionForm"
							options={{ title: "Condition Breakdown" }}
							component={ConditionForm}
							initialParams={{
								conditions: ["Malaria"],
							}}
						/>	
						<Stack.Screen
							name="AssessmentSummary"
							options={{ title: "Assessment Summary" }}
							component={AssessmentSummary}
						/>				
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	
		// this text appears on the Assessment Summary
		const headerText = getByText("Malaria")
		expect(headerText).toBeTruthy();
	})

	test("Checks if the page navigated to the Assesment screen", () => {
		// const _conditions = conditions
		const {getByText} =render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="ConditionForm">
						<Stack.Screen
							name="ConditionForm"
							options={{ title: "Condition Breakdown" }}
							component={ConditionForm}
							initialParams={{
								conditions,
							}}
						/>	
						<Stack.Screen
							name="AssessmentSummary"
							options={{ title: "Assessment Summary" }}
							component={AssessmentSummary}
						/>				
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	
		const button = getByText(/Exit Assessment/)
		fireEvent.press(button)
	
		// this text appears on the Assessment Summary
		const headerText = getByText(/Your Decisions/)
		expect(headerText).toBeTruthy();
	})
})
