import React from "react";
import { View } from "react-native";

type SpacerProps = {
	size: number;
	horizontal?: boolean;
};

const Spacer: React.FC<SpacerProps> = ({ size = 0, horizontal = false }) => {
	return horizontal ? (
		<View style={{ width: size }} />
	) : (
		<View style={{ height: size }} />
	);
};

export { Spacer };
