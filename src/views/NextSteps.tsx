import React, { useReducer } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Button, Checkbox, Text, TextInput } from "react-native-paper";
import {
	StackActions,
	useNavigation,
	CommonActions,
} from "@react-navigation/native";
import produce from "immer";
import { human } from "react-native-typography";
import { useDispatch } from "react-redux";
import { primary } from "../colors";
import { investigations } from "../common/investigations";
import { MEDICATIONS } from "../common/medications";
import { toggleList } from "../common/utils";
import { Spacer } from "../components/Spacer";
import { reset } from "../store/slices/assessment";

type State = {
	referred: boolean;
	referredForTesting: boolean;
	prescribedMedications: boolean;
	investigationsOrdered: string[];
	dispensedMedications: string[];
	recommendations: string;
};

const initialState: State = {
	referred: false,
	referredForTesting: false,
	prescribedMedications: false,
	investigationsOrdered: [],
	dispensedMedications: [],
	recommendations: "",
};

type Action =
	| {
			type: "toggle-referred";
	  }
	| {
			type: "toggle-testing";
	  }
	| {
			type: "toggle-medication";
	  }
	| {
			type: "set-recommendations";
			payload: string;
	  }
	| {
			type: "update-prescription";
			payload: string;
	  }
	| {
			type: "update-investigation";
			payload: string;
	  };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "toggle-referred":
			return produce(state, (draft) => {
				draft.referred = !draft.referred;
			});
		case "toggle-testing":
			return produce(state, (draft) => {
				draft.referredForTesting && (draft.investigationsOrdered = []);
				draft.referredForTesting = !draft.referredForTesting;
			});
		case "toggle-medication":
			return produce(state, (draft) => {
				draft.prescribedMedications &&
					(draft.dispensedMedications = []);
				draft.prescribedMedications = !draft.prescribedMedications;
			});
		case "set-recommendations":
			return produce(state, (draft) => {
				draft.recommendations = action.payload;
			});
		case "update-prescription":
			return produce(state, (draft) => {
				draft.dispensedMedications = toggleList(
					draft.dispensedMedications,
					action.payload
				);
			});
		case "update-investigation":
			return produce(state, (draft) => {
				draft.investigationsOrdered = toggleList(
					draft.investigationsOrdered,
					action.payload
				);
			});

		default:
			return state;
	}
}

type NextStepsProps = {};

const NextSteps: React.FC<NextStepsProps> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [state, setState] = useReducer(reducer, initialState);

	const next = () => {
		// TODO: add method to store the data into DB
		dispatch(reset());
		navigation.dispatch(
			CommonActions.reset({
				index: 1,
				routes: [{ name: "PatientDemographics" }],
			})
		);
		return navigation.dispatch(StackActions.popToTop());
	};
	return (
		<ScrollView contentContainerStyle={{ padding: 10 }}>
			<Text style={{ fontWeight: "bold" }}>
				I provided the following recommendations:
			</Text>

			<Spacer size={22} />

			<NextStepAction
				onToggle={() => setState({ type: "toggle-referred" })}
				status={state.referred ? "checked" : "unchecked"}
				text="Referred to the nearest health facility"
			/>

			<NextStepAction
				onToggle={() => setState({ type: "toggle-testing" })}
				status={state.referredForTesting ? "checked" : "unchecked"}
				text="Referred to a laboratory for testing"
			>
				{state.referredForTesting && (
					<View style={{ marginTop: 20 }}>
						<View
							style={{ flexDirection: "row", flexWrap: "wrap" }}
						>
							{investigations.map((investigation) => {
								const isActive =
									state.investigationsOrdered.includes(
										investigation
									);
								return (
									<ToggleButton
										label={investigation}
										key={investigation}
										onPress={() =>
											setState({
												type: "update-investigation",
												payload: investigation,
											})
										}
										status={
											isActive ? "active" : "inactive"
										}
									/>
								);
							})}
						</View>
					</View>
				)}
			</NextStepAction>

			<NextStepAction
				onToggle={() => setState({ type: "toggle-medication" })}
				status={state.prescribedMedications ? "checked" : "unchecked"}
				text="Dispensed medication to the patient"
			>
				{state.prescribedMedications && (
					<View style={{ marginTop: 20 }}>
						<View
							style={{ flexDirection: "row", flexWrap: "wrap" }}
						>
							{MEDICATIONS.map((medication) => {
								const isActive =
									state.dispensedMedications.includes(
										medication
									);
								return (
									<ToggleButton
										label={medication}
										key={medication}
										onPress={() =>
											setState({
												type: "update-prescription",
												payload: medication,
											})
										}
										status={
											isActive ? "active" : "inactive"
										}
									/>
								);
							})}
						</View>
					</View>
				)}
			</NextStepAction>

			<View style={{ marginVertical: 10 }}>
				<TextInput
					numberOfLines={4}
					value={state.recommendations}
					multiline
					onChangeText={(t) =>
						setState({ type: "set-recommendations", payload: t })
					}
					autoCorrect={false}
					mode="outlined"
				/>
			</View>

			<View style={{ marginTop: 20 }}>
				<Button onPress={next} mode="contained">
					Complete
				</Button>
			</View>
		</ScrollView>
	);
};

type ToggleButtonProps = {
	label: string;
	status: "active" | "inactive";
	onPress: () => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({
	label,
	status,
	onPress,
}) => {
	const active = status === "active";
	return (
		<TouchableOpacity
			style={{
				marginRight: 5,
				marginBottom: 7,
				padding: 10,
				borderColor: "#ccc",
				borderWidth: 1,
				borderRadius: 7,
				backgroundColor: active ? primary : "transparent",
			}}
			onPress={onPress}
		>
			<Text style={[active ? { color: "white" } : { color: "black" }]}>
				{label}
			</Text>
		</TouchableOpacity>
	);
};

// FIXME: Add the tests and medications list

type NextStepActionProps = {
	text: string;
	status: "checked" | "unchecked";
	onToggle: () => void;
};

const NextStepAction: React.FC<NextStepActionProps> = ({
	text = "",
	status,
	onToggle,
	children,
}) => (
	<View
		style={{
			marginVertical: 15,
			borderBottomColor: "#ddd",
			borderBottomWidth: 1,
			paddingBottom: 6,
		}}
	>
		<TouchableOpacity
			onPress={onToggle}
			style={{
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Text style={human.body}>{text}</Text>
			<Checkbox status={status} />
		</TouchableOpacity>

		{children}
	</View>
);

// NextStepsStateReducer name made unatractively long, to prevent accidental imports
export { NextSteps, reducer as nextStepsStateReducer };
