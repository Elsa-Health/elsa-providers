import "react-native";
import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { createStackNavigator } from "@react-navigation/stack";
import { ConditionInput } from "../../src/views/ConditionInput";
import { NavigationContainer } from "@react-navigation/native";
import { ConditionForm } from "../../src/views/ConditionForm";
import { conditions } from "../../src/common/conditions";

afterEach(cleanup);

describe ("ConditionInput", () => {
	const Stack = createStackNavigator();

	test("renders correctly", () => {
		renderer.create(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="ConditionInput"
							options={{ title: "Condition Input" }}
							component={ConditionInput}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	});

	test("searching filters buttons", () => {
		const { getByTestId, queryByTestId } = render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="ConditionInput"
							options={{ title: "Condition Input" }}
							component={ConditionInput}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);

		// get search input
		const searchInput = getByTestId("condInputSearchInput");

		/**
		 * Looking at the conditions,
		 * chosing input that exists
		 */
		fireEvent.changeText(searchInput, "Mal");
		// assuming: `Malaria` shows up

		// Check if the inputs have filtered
		// logic is `condInputButtonFor${condition}`
		expect(getByTestId("condInputButtonForMalaria")).toBeTruthy();

		// other items shouldn't appear
		const btnGh = queryByTestId("condInputButtonForGonorrhea");
		expect(btnGh).not.toBeTruthy();
	});

	test("added chips can be removed", () => {
		const { getByTestId, queryByTestId } = render(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="ConditionInput"
							options={{ title: "Condition Input" }}
							component={ConditionInput}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);

		// add malaria
		const malariaBtn = getByTestId("condInputButtonForMalaria");
		fireEvent.press(malariaBtn);

		// other items shouldn't appear
		const malariaChip = getByTestId("condInputChipForMalaria");
		expect(malariaChip).toBeTruthy();
		fireEvent.press(malariaChip);

		// const should now not be there
		const malariaChipNotThere = queryByTestId("condInputChipForMalaria");
		expect(malariaChipNotThere).not.toBeTruthy();

	});

	test("Proper navigation to the Condition Form after selecting items", () => {
		const { getByTestId  } = render(
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
		const _3conds = [conditions[0], conditions[3], conditions[2]];

		// Click on buttons with the conditions
		_3conds.forEach((condition) => {
			const _btn = getByTestId(`condInputButtonFor${condition}`);
			fireEvent.press(_btn);
		});

		// Check if the checks for the selected conditions have rendered
		_3conds.forEach((cond) => {
			const condChip = getByTestId(`condInputChipFor${cond}`);
			expect(condChip).toBeTruthy();
		});

		// Go to the next page
		const nextBtn = getByTestId("condInputNextButton")
		fireEvent.press(nextBtn)

		// this text appears on the Condtional Form 
		const condFormView = getByTestId("conditionFormView");
		expect(condFormView).toBeTruthy();
	 });
	
})


