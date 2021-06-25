import React from "react";
import { render } from "@testing-library/react-native";
import { ConditionLikelihoodsChart } from "../../src/components/ConditionLikelihoodsChart";

// jest.useFakeTimers();

describe("Conditional Likelihoods Chart", () => {
	const data = [
		{ x: "Malaria", y: 90 },
		{ x: "Pneumonia", y: 34.5 },
		{ x: "Cholera", y: 9 },
	];
	test("Render check", () => {
		// expect(1).toBe(1)
		const { getByTestId } = render(
			<ConditionLikelihoodsChart data={data} />
		);

		expect(getByTestId("ConditionLikelihoodsChart")).toBeDefined();
	});
});
