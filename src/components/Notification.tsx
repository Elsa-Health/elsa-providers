/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { primary, palette } from "../colors";
import { human } from "react-native-typography";
import { adjustColor } from "../common/utils";

interface NotificationProps {
	variation: "info" | "warning" | "danger" | "note";
	title?: string;
	visible?: boolean;
	marginVertical?: number;
	onPress?: () => any;
}

const Notification: React.FC<NotificationProps> = ({
	variation,
	title,
	visible,
	marginVertical,
	onPress,
	children,
}) => {
	const backgroundColor = (() => {
		switch (variation) {
			case "info":
				return adjustColor(primary, 175);
			case "warning":
				return adjustColor(palette.warning, 240);
			case "danger":
				return adjustColor(palette.angry, 195);
			case "note":
				return adjustColor(palette.offWhite, 15);
		}
	})();
	const themeColor = (() => {
		switch (variation) {
			case "info":
				return primary;
			case "warning":
				return palette.warning;
			case "danger":
				return palette.angry;
			case "note":
				return palette.lightGrey;
		}
	})();

	const iconName = (() => {
		switch (variation) {
			case "info":
				return "information-outline";
			case "warning":
				return "alert-circle-outline";
			case "danger":
				return "close-circle-outline";
			case "note":
				return "checkbox-blank-circle-outline";
		}
	})();

	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				borderWidth: 1,
				borderRadius: 5,
				borderColor: themeColor,
				padding: 14,
				paddingVertical: 18,
				backgroundColor: backgroundColor,
				display: visible ? "flex" : "none",
				//  opacity:0.1
				marginVertical: marginVertical || 8,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					display: variation === "note" ? "none" : "flex",
				}}
			>
				<MaterialIcon name={iconName} color={themeColor} size={30} />

				{title && (
					<Text
						style={[
							human.body,
							{
								color: themeColor,
								marginLeft: 15,
								fontWeight: "bold",
							},
						]}
					>
						{title}
					</Text>
				)}
			</View>
			{children && (
				<View style={{ flexDirection: "row" }}>
					<View style={{ marginTop: 5 }}>{children}</View>
				</View>
			)}
		</TouchableOpacity>
	);
};

export { Notification };
