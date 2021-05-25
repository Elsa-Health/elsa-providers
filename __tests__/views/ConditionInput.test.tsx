import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { createStackNavigator } from "@react-navigation/stack";
import { ConditionInput } from "../../src/views/ConditionInput";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

it("renders correctly", () => {
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
