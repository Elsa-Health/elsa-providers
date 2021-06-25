import React from "react";
import { render } from "@testing-library/react-native";
import { ConditionLikelihoodsChart } from "../../src/components/ConditionLikelihoodsChart";

// jest.useFakeTimers();

describe ("Conditional Likelihoods Chart", () => {
    test("Render check", () => {
        // expect(1).toBe(1)
        const {getByTestId} = render(<ConditionLikelihoodsChart data={[]}/>)

		expect(getByTestId("ConditionLikelihoodsChart")).toBeDefined();
	});
});
