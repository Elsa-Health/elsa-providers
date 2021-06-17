/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import {
	NavigationContainer,
	DefaultTheme as NavDefaultTheme,
} from "@react-navigation/native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./src/store";

import { createStackNavigator } from "@react-navigation/stack";
import { QRAuthenticator } from "./src/views/QRAuthenticator";
import { PatientDemographics } from "./src/views/PatientDemographics";
import { ConditionInput } from "./src/views/ConditionInput";
import { ConditionForm } from "./src/views/ConditionForm";
import { AssessmentSummary } from "./src/views/AssessmentSummary";
import { NextSteps } from "./src/views/NextSteps";
import { orange, primary } from "./src/colors";
import { condition } from "./src/elsa";
import { authenticate } from "./src/common/utils";

const Stack = createStackNavigator();

const navTheme = NavDefaultTheme;
navTheme.colors.background = "#fff";
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: primary,
		accent: orange,
	},
};

export type RootStackParamList = {
	ConditionForm: { conditions: condition[] };
};

function QRWithAuthenticator() {
	return <QRAuthenticator authenticate={authenticate} />;
}

const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<StatusBar barStyle={"light-content"} backgroundColor="white" />
				<NavigationContainer theme={navTheme}>
					<Stack.Navigator initialRouteName="QRAuthenticator">
						<Stack.Screen
							name="QRAuthenticator"
							options={{
								title: "Scan Your Card",
								headerShown: false,
							}}
							component={QRWithAuthenticator}
						/>
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
						<Stack.Screen
							name="ConditionForm"
							options={{ title: "Condition Breakdown" }}
							component={ConditionForm}
						/>
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
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: "600",
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: "400",
	},
	highlight: {
		fontWeight: "700",
	},
});

export default App;
