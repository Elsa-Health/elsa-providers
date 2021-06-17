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
import { AuthInfoMap } from "../../src/common/utils";
// import { authenticate } from "../../src/common/utils";

const Stack = createStackNavigator();

describe("QR Authenticator", function () {
	it("Renders correctly", () => {
		renderer.create(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="QRAuthenticator"
							component={() => (
								<QRAuthenticator
									authenticate={async (_str) =>
										({} as AuthInfoMap)
									}
								/>
							)}
							initialParams={{
								conditions: [],
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	});

	it("Scanner reads properly", () => {
		const mockAuthFn = jest.fn();

		renderer.create(
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen
							name="QRAuthenticator"
							component={() => (
								<QRAuthenticator authenticate={mockAuthFn} />
							)}
							initialParams={{
								conditions: [],
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);

		// Check if there is successful scanning
		// ---
	});
});
