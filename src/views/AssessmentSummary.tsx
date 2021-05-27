import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { Text, Button, Checkbox, Card, Divider } from "react-native-paper";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { human } from "react-native-typography";
import { conditions } from "../common/conditions";
import { ConditionLikelihoodsChart } from "../components/ConditionLikelihoodsChart";
import { Notification } from "../components/Notification";
import { Spacer } from "../components/Spacer";
import { pickerOptionsFromList } from "../common/utils";
import { getConditionNextSteps } from "../common/nextSteps";
import { RootState } from "../store";
import { useSelector } from "react-redux";
import { humanFriendlyVariableName, symptomAssessment } from "../elsa";
import _ from "lodash";

type AssessmentSummaryProps = {};

const AssessmentSummary: React.FC<AssessmentSummaryProps> = () => {
	const navigation = useNavigation();
	const selectedSymptoms: RootState["assessment"]["selectedSymptoms"] =
		useSelector<RootState>((state) => state.assessment.selectedSymptoms);
	const [finalConditions, setFinalConditions] = useState<string[]>([]);

	const toggleCondition = (condition: string) => {
		if (finalConditions.includes(condition)) {
			setFinalConditions((cond) => cond.filter((c) => c !== condition));
		} else {
			setFinalConditions((cond) => [...cond, condition]);
		}
	};

	const next = () => {
		navigation.navigate("NextSteps");
	};

	const assessment = symptomAssessment({
		samples: [_.times(selectedSymptoms.length, (_) => 1)],
		symptoms: selectedSymptoms,
	})
		.map((a) => ({ ...a, similarity: +(a.similarity * 100).toFixed(1) }))
		.sort((a, b) => b.similarity - a.similarity)
		.slice(0, 3);

	return (
		<ScrollView contentContainerStyle={{ padding: 10 }}>
			<View>
				<ConditionLikelihoodsChart
					data={assessment.map((a) => ({
						x: a.condition,
						y: a.similarity,
					}))}
				/>
			</View>

			{/* <View>
				<Notification visible variation="info" title="Hello">
					<Text>
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Deleniti dolor harum provident beatae quos et!
					</Text>
				</Notification>
			</View> */}

			<View style={{ marginTop: 15 }}>
				<Text style={human.title3}>Your Decisions</Text>

				{assessment.map((data) => {
					const friendlyName = humanFriendlyVariableName(
						data.condition
					);
					return (
						<TouchableOpacity
							style={{
								flexDirection: "row",
								alignItems: "center",
								marginVertical: 5,
							}}
							onPress={() => toggleCondition(friendlyName)}
							key={friendlyName}
						>
							<Checkbox
								status={
									finalConditions.includes(friendlyName)
										? "checked"
										: "unchecked"
								}
							/>
							<Text style={human.body}>
								{humanFriendlyVariableName(friendlyName)}
							</Text>
						</TouchableOpacity>
					);
				})}

				<View>
					<SectionedMultiSelect
						items={pickerOptionsFromList(conditions).map(
							(con, idx) => ({ ...con })
						)}
						styles={{
							item: { paddingVertical: 15 },
							itemText: { fontWeight: "normal", fontSize: 16 },
							selectToggle: {
								// backgroundColor: "#E5E5E5",
								borderColor: "#A8A8A8",
								borderWidth: 1,
								borderRadius: 6,
								paddingVertical: 14,
								paddingHorizontal: 10,
								marginTop: 4,
							},
						}}
						IconRenderer={MaterialIcon}
						uniqueKey="label"
						searchPlaceholderText="Choose some things..."
						displayKey="label"
						// icon
						onSelectedItemsChange={setFinalConditions}
						selectedItems={finalConditions}
					/>
				</View>
			</View>

			<Divider style={{ marginVertical: 25 }} />

			<View style={{ marginTop: 15 }}>
				<View>
					<Text style={human.title3}>Next Steps</Text>
					<Text>
						Based on the most likely condition above, you should
						consider the following recommendations.
					</Text>

					<Spacer size={5} />

					{finalConditions.map((condition) => {
						const nextSteps = getConditionNextSteps(condition);
						return (
							<Card
								elevation={3}
								style={{ marginBottom: 15 }}
								key={condition}
							>
								<Card.Content>
									<Text style={human.title3}>
										{humanFriendlyVariableName(condition)}
									</Text>

									{nextSteps.tests.length > 0 && (
										<View style={{ marginBottom: 5 }}>
											<Text>Tests:</Text>
											{nextSteps.tests.map((test) => (
												<Text
													style={{ marginLeft: 20 }}
													key={test}
												>
													- {test}
												</Text>
											))}
										</View>
									)}

									{nextSteps.medications.length > 0 && (
										<View style={{ marginBottom: 5 }}>
											<Text>Medications:</Text>
											{nextSteps.medications.map(
												(medication) => (
													<Text
														style={{
															marginLeft: 20,
														}}
														key={medication}
													>
														- {medication}
													</Text>
												)
											)}
										</View>
									)}

									{nextSteps.recommendations?.length > 0 && (
										<View style={{ marginBottom: 5 }}>
											<Text>Recommendations:</Text>
											<Text>
												{nextSteps.recommendations}
											</Text>
											{/* {nextSteps.recommendations.map(
											(recommendation) => (
												<Text
													style={{ marginLeft: 20 }}
													key={test}
												>
													- {test}
												</Text>
											)
										)} */}
										</View>
									)}
								</Card.Content>
							</Card>
						);
					})}

					{/* <DiseaseNextStepCard
						title={diagnosesLikelihoods?.[0].name}
						collapsible={false}
						nextSteps={diagnosesNextSteps?.[0]}
					/> */}
				</View>
			</View>

			<View style={{ marginTop: 20 }}>
				<Button onPress={next} mode="contained">
					Next
				</Button>
			</View>
		</ScrollView>
	);
};

export { AssessmentSummary };
