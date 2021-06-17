import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, View } from "react-native";
import { Searchbar, Text, Button, Chip } from "react-native-paper";
import { conditions } from "../common/conditions";
import { toggleList } from "../common/utils";

// NEXT: support showing the most common conditions to allow for easily selecting the items
const ConditionInput = () => {
	const navigation = useNavigation();
	const [searchQuery, setSearchQuery] = React.useState("");
	const [differentials, setDifferentials] = React.useState<string[]>([]);

	const toggleCondition = (condition: string) => {
		setDifferentials((cond) => toggleList(cond, condition))
		// if (differentials.includes(condition)) {
		// 	setDifferentials((cond) => cond.filter((c) => c !== condition));
		// } else {
		// 	setDifferentials((cond) => [...cond, condition]);
		// }
	};

	const onChangeSearch = (query: string) => setSearchQuery(query);

	const next = () => {
		navigation.navigate("ConditionForm", { conditions: differentials });
	};

	return (
		<ScrollView testID="ConditionalInputScrollView" contentContainerStyle={{ padding: 10 }}>
			<Searchbar
				placeholder="Search Conditions"
				onChangeText={onChangeSearch}
				value={searchQuery}
			/>

			<View
				style={{
					display: "flex",
					flexDirection: "row",
					marginTop: 10,
					flexWrap: "wrap",
				}}
			>
				{differentials.map((cond) => (
					<Chip
						key={cond}
						icon="close"
						onPress={() => toggleCondition(cond)}
						style={{ marginRight: 5, marginBottom: 5 }}
					>
						{cond}
					</Chip>
				))}
			</View>

			<View
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					marginTop: 20,
				}}
			>
				{conditions
					.filter((c) =>
						c.toLowerCase().includes(searchQuery.toLowerCase())
					)
					.slice(0, 20)
					.map((condition) => (
						<Button
							mode={
								differentials.includes(condition)
									? "contained"
									: "outlined"
							}
							key={condition}
							onPress={() => toggleCondition(condition)}
							style={{ margin: 4, padding: 8 }}
						>
							{condition}
						</Button>
					))}
			</View>

			<View style={{ marginTop: 15 }}>
				<Button onPress={next} mode="contained">
					Next
				</Button>
			</View>
		</ScrollView>
	);
};

export { ConditionInput };
