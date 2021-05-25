import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { ConditionForm } from "../../src/views/ConditionForm";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

it("renders correctly with an empty conditions list", () => {
	renderer.create(
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
	);
});


it("renders correctly with a conditions list with diseases", () => {
	renderer.create(
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="ConditionForm">
					<Stack.Screen
						name="ConditionForm"
						component={ConditionForm}
						initialParams={{
							conditions: ["Malaria"],
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
});
