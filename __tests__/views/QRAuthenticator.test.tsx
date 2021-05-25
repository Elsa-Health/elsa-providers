import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { QRAuthenticator } from "../../src/views/QRAuthenticator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

it("renders correctly", () => {
	renderer.create(
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="QRAuthenticator"
						component={() => <QRAuthenticator />}
						initialParams={{
							conditions: [],
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
});
