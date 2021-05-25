import React from "react";
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { orange } from "../colors";
import { humanFriendlyVariableName } from "../elsa";

type ConditionLikelihoodsChartProps = {
	data: { x: string; y: number }[];
};

const ConditionLikelihoodsChart: React.FC<ConditionLikelihoodsChartProps> = ({
	data = [],
}) => {
	return (
		<VictoryChart
			theme={VictoryTheme.material}
			style={{
				parent: { marginTop: -10 },
			}}
			domainPadding={{ y: 10, x: 40 }}
			domain={{ y: [0, 100] }}
		>
			<VictoryBar
				style={{
					data: { fill: orange },
					labels: {
						fontSize: 15,
						fill: ({ datum }) =>
							datum.y < 50 ? "#000000" : "#c43a31",
						fontWeight: ({ datum }) =>
							datum.y < 50 ? "400" : "bold",
					},
				}}
				barWidth={50}
				x={(d) => humanFriendlyVariableName(d.x)}
				data={data}
				labels={({ datum }) => `${datum.y}%`}
			/>
		</VictoryChart>
	);
};

export { ConditionLikelihoodsChart };
