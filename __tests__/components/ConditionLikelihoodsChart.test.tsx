import React from "react";
import { render } from "@testing-library/react-native"
import { ConditionLikelihoodsChart } from "../../src/components/ConditionLikelihoodsChart"

jest.useFakeTimers();

describe ("Conditional Likelihoods Chart", () => {
    test("Render check", () => {
        const {getByTestId} = render(<ConditionLikelihoodsChart data={[]}/>)

        expect(getByTestId("ConditionLikelihoodsChart")).toBeDefined();
    })
})