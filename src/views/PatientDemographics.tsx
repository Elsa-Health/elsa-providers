import produce from "immer";
import React, { useEffect } from "react";
import _ from "lodash";
import { TouchableOpacity, View, Dimensions } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button, Text, TextInput } from "react-native-paper";
import { Spacer } from "../components/Spacer";
import { useNavigation } from "@react-navigation/native";
import { primary } from "../colors";
import { useDispatch, useSelector } from "react-redux";
import {
	toggleSex,
	updateDemographics,
	updateMonths,
	updateYears,
} from "../store/slices/assessment";
import { RootState } from "../store";

const { width, height } = Dimensions.get("window");

type PatientDemographicsProps = {};

const PatientDemographics: React.FC<PatientDemographicsProps> = ({ navigation }) => {
	// const navigation = useNavigation();
	const dispatch = useDispatch();
	const state: RootState["assessment"] = useSelector<RootState>(
		(state) => state.assessment
	);

	const next = () => {
		navigation.navigate("ConditionInput");
	};

	return (
		<View testID="patientDemographicsView" style={{ padding: 10, marginTop: height / 32 }}>
			{/* NEXT: Add nice icons for picking the patient sex */}
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					marginTop: 20,
				}}
			>
				<TouchableOpacity
					style={{
						width: width / 2.5,
						paddingVertical: width / 14,
						borderWidth: 1,
						borderColor: "#ccc",
						borderRadius: 10,
						alignItems: "center",
						backgroundColor:
							state.sex === "female" ? primary : "transparent",
					}}
					testID="pdTouchableFemaleChoice"
					onPress={() => {
						dispatch(toggleSex("female"));
						// setState({ type: "update-sex", payload: "female" });
					}}
				>
					<MaterialIcon
						color={state.sex === "female" ? "white" : "black"}
						name="gender-female"
						size={54}
					/>
					<Text
						style={{
							textAlign: "center",
							marginTop: 20,
							fontSize: 18,
							color: state.sex === "female" ? "white" : "black",
						}}
					>
						Female
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						width: width / 2.5,
						paddingVertical: width / 14,
						borderWidth: 1,
						borderColor: "#ccc",
						borderRadius: 10,
						alignItems: "center",
						backgroundColor:
							state.sex === "male" ? primary : "transparent",
					}}
					testID="pdTouchableMaleChoice"
					onPress={
						() => dispatch(toggleSex("male"))
						// setState({ type: "update-sex", payload: "male" })
					}
				>
					<MaterialIcon
						color={state.sex === "male" ? "white" : "black"}
						name="gender-male"
						size={54}
					/>
					<Text
						style={{
							textAlign: "center",
							marginTop: 20,
							fontSize: 18,
							color: state.sex === "male" ? "white" : "black",
						}}
					>
						Male
					</Text>
				</TouchableOpacity>
			</View>

			<View style={{ marginTop: 20 }}>
				<TextInput
					label="Years"
					mode="outlined"
					keyboardType="number-pad"
					testID="pdYearsInput"
					onChangeText={
						(text) => dispatch(updateYears(+text))
						// setState({ type: "update-years", payload: +text })
					}
					value={String(state.years)}
				/>
				<Spacer size={10} />
				<TextInput
					label="Months"
					mode="outlined"
					keyboardType="number-pad"
					testID="pdMonthInput"
					onChangeText={
						(text) => dispatch(updateMonths(+text))
						// setState({ type: "update-months", payload: +text })
					}
					value={String(state.months)}
				/>
			</View>

			<View style={{ marginTop: 20 }}>
				<Button onPress={next} mode="contained" testID="pdNextButton">
					<Text style={{ color: "white" }}>Next</Text>
				</Button>
			</View>
		</View>
	);
};

export { PatientDemographics };
