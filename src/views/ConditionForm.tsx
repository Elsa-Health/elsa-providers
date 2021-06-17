import React, { useReducer } from "react";
import { TouchableOpacity, ScrollView, View, ToastAndroid } from "react-native";
import { human } from "react-native-typography";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { Checkbox, Text, Button, Divider } from "react-native-paper";
import { orange, primary } from "../colors";
import { Spacer } from "../components/Spacer";
import {
	RouteProp,
	useIsFocused,
	useNavigation,
} from "@react-navigation/native";
import { ConditionLikelihoodsChart } from "../components/ConditionLikelihoodsChart";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import {
	conditionEffects,
	getConditionEffects,
	humanFriendlyVariableName,
	symptomAssessment,
	condition,
} from "../elsa";
import _, { zip } from "lodash";
import { getSymptomWithDescription } from "../elsa/symptomDescriptions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleSymptom } from "../store/slices/assessment";

const dummySymptoms = [
	"Fever",
	"Cough",
	"Vomiting",
	"Headache",
	"Dyspnoea",
	"Dysuria",
];

const sampleData = [
	{ x: "Malaria", y: 40 },
	{ x: "Pneumonia", y: 30 },
	{ x: "Tuberculosis", y: 50 },
	{ x: "Gastritis", y: 40 },
	{ x: "Gastroenteritis", y: 70 },
].sort((a, b) => b.y - a.y);

type ConditionFormScreenRouteProp = RouteProp<
	RootStackParamList,
	"ConditionForm"
>;

type ConditionFormNavigationProp = StackNavigationProp<
	RootStackParamList,
	"ConditionForm"
>;

type ConditionFormProps = {
	route: ConditionFormScreenRouteProp;
	navigation: ConditionFormNavigationProp;
};

const ConditionForm: React.FC<ConditionFormProps> = ({ route, navigation }) => {
	// const navigation = useNavigation();
	const dispatch = useDispatch();
	const selectedSymptoms: RootState["assessment"]["selectedSymptoms"] =
		useSelector<RootState>((state) => state.assessment.selectedSymptoms);
	const conditions = route?.params?.conditions;
	const isFocused = useIsFocused();

	// const [selectedSmptoms, setSelectedSymptoms] = React.useState<string[]>([]);

	// const toggleSymptom = (symptom: string) => {
	// dispatch(toggleSymptom)
	// if (selectedSmptoms.includes(symptom)) {
	// 	setSelectedSymptoms((symptoms) =>
	// 		symptoms.filter((sy) => sy !== symptom)
	// 	);
	// } else {
	// 	setSelectedSymptoms((symptoms) => [...symptoms, symptom]);
	// }
	// };

	const chooseNextCondition = (condition: condition) => {
		ToastAndroid.show(condition, 3000);
		navigation.push("ConditionForm", { conditions: [condition] });
	};

	const exitAssessment = () => {
		navigation.navigate("AssessmentSummary", {});
	};

	// TODO: Refactor out code to single place - also in assessmentsummary screen
	// FIXME: account for explicitly absent screens
	const assessment = symptomAssessment({
		samples: [_.times(selectedSymptoms.length, (_) => 1)],
		symptoms: selectedSymptoms,
	})
		.map((a) => ({ ...a, similarity: +(a.similarity * 100).toFixed(1) }))
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, 3);

	// console.log(selectedSymptoms);

	if (!isFocused) {
		return <View />;
	}

	if (conditions.length === 0) return <Text>No Condition is selected</Text>;
	return (
		<ScrollView testID="conditionFormView" contentContainerStyle={{ padding: 10 }}>
			{conditions.map((condition) => {
				const conditionEffectsMap = getConditionEffects(condition);
				// console.log("a", conditionEffectsMap);
				return (
					<View key={condition}>
						<Text style={human.largeTitle}>{condition}</Text>
						<Text>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit.
						</Text>

						{_.keys(conditionEffectsMap).map((symptom) => (
							<TouchableOpacity
								style={{
									flexDirection: "row",
									marginVertical: 10,
								}}
								key={symptom}
								onPress={() => dispatch(toggleSymptom(symptom))}
							>
								<View
									style={{
										justifyContent: "center",
										alignContent: "center",
										padding: 10,
									}}
								>
									{/* NEXT: If icon is too small, just use normal icons with a conditional render */}
									<Checkbox
										status={
											selectedSymptoms.includes(symptom)
												? "checked"
												: "unchecked"
										}
									/>
								</View>
								<Spacer horizontal size={10} />
								<View>
									<Text
										style={[
											human.title3,
											{ color: orange },
										]}
									>
										{humanFriendlyVariableName(symptom)}
									</Text>
									<Text>
										{
											getSymptomWithDescription(symptom)
												.description
										}
									</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				);
			})}

			<Divider style={{ marginVertical: 10 }} />

			<View style={{ marginTop: 20 }}>
				<Text style={human.title3}>Distributions</Text>
				<ConditionLikelihoodsChart
					data={assessment.map((a) => ({
						x: a.condition,
						y: a.similarity,
					}))}
				/>
			</View>

			<View>
				<Text style={[human.title3, { marginBottom: 10 }]}>
					Top Conditions
				</Text>
				{assessment.map((data, idx) => (
					<TouchableOpacity
						key={data.condition}
						onPress={() =>
							chooseNextCondition(
								humanFriendlyVariableName(data.condition)
							)
						}
						style={{
							flexDirection: "row",
							marginVertical: 5,
						}}
					>
						<View>
							<Text
								style={{
									padding: 5,
									paddingHorizontal: 10,
									backgroundColor: primary,
									borderRadius: 100,
									color: "white",
								}}
							>
								{idx + 1}
							</Text>
						</View>
						<Spacer size={8} horizontal />
						<View
							style={{
								display: "flex",
								flex: 1,
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<Text style={human.body}>
								{humanFriendlyVariableName(data.condition)} (
								{data.similarity}%)
							</Text>

							<MaterialIcon name="chevron-right" size={20} />
						</View>
					</TouchableOpacity>
				))}
			</View>

			<View style={{ marginTop: 20 }}>
				<Button onPress={exitAssessment} mode="contained">
					Exit Assessment
				</Button>
			</View>
		</ScrollView>
	);
};

export { ConditionForm };
