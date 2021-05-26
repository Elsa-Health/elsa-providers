import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { createStackNavigator } from "@react-navigation/stack";
import { ConditionInput } from "../../src/views/ConditionInput";
import { NavigationContainer } from "@react-navigation/native";
import { ConditionForm } from "../../src/views/ConditionForm";
import { NextSteps } from "../../src/views/NextSteps";
import { conditions } from "../../src/common/conditions";

describe ("Condition Input Test", () => {
	const Stack = createStackNavigator();

	test("renders correctly", () => {
		renderer.create(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="ConditionInput"
							component={ConditionInput}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	});

	test("Checks if the page navigated to the Condition Form ", () => {
		
		const {getByText, getByRole, queryByRole, queryAllByRole} = render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="ConditionInput"
							options={{ title: "Condition Input" }}
							component={ConditionInput}
							
						/>
						<Stack.Screen
							name="ConditionForm"
							options={{ title: "Condition Breakdown" }}
							component={ConditionForm}
							
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)

		// TODO NEXT: Change this
		// Rndomly selects 3 conitions
		// const _3conds = [conditions[0], conditions[3], conditions[2]]

	// 	const _condBtn = queryAllByRole("button")
	// 	console.log(_condBtn)
	// 	_condBtn.forEach((_btn) => {
	// 		// const _condBtn = getByRole(new RegExp(cond
	// 		// const _condBtn = getByRole

	// 		// if (_condBtn !== null) {
	// 		// 	const _btn = _condBtn.findByProps({ key: cond })
	// 		// 	console.log(_btn)
	// 		// 	fireEvent.press(_btn)
	// 		// }
	// 		fireEvent.press(_btn)
	// 	})

	// 	// Select the conditions
	// 	// const 
	// 	const button = getByText(/Next/)
	// 	fireEvent.press(button)
	
	// 	// The texts for the conditions should appear
	// 	conditions.forEach(cond => {
	// 		const role = getByText(cond)
	// 		expect(role).toBeTruthy();
	// 	})

	// 	// this text appears on the Condtiona Form 
	// 	// const headerText = getByText(/Top Conditions/)
	// 	// expect(headerText).toBeTruthy();
	 })
	
})


