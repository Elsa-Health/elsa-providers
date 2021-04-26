import React from "react"
import { render } from "@testing-library/react-native"
import {
    getOperation,
    SymptomFeatureOptionButton,
    SymptomFeatures,
    SymptomsPicker,
} from "./symptoms-picker"

test("it renders without blowing up", () => {
    const { getAllByA11yLabel, getByText } = render(<SymptomsPicker />)

    const relatedTitle = getByText(/Related:/i)
    const featureOptionButton = getAllByA11yLabel("symptom-chip")
    expect(relatedTitle).toBeTruthy()
    expect(featureOptionButton).toBeTruthy()
})

test("SymptomFeatureOptionButton renders", () => {
    const mockFn = jest.fn()
    const { getByText } = render(
        <SymptomFeatureOptionButton
            value="test"
            attribute="testAttr"
            isActive={false}
            onPress={mockFn}
        />,
    )
})

test("SymptomFeatures renders", () => {
    const mockFn = jest.fn()
    const mockFn1 = jest.fn()
    const { getByText } = render(
        <SymptomFeatures
            label="Test"
            symptom="test"
            lastItem={false}
            updateSymptomFeatures={mockFn}
            toggleSymptom={mockFn1}
        />,
    )
})

test("getOperation works", () => {
    expect(typeof getOperation("equalsTo")).toBe("function")

    expect(typeof getOperation("notEqualsTo")).toBe("function")
    expect(getOperation("notEqualsTo")("a", "b")).toBe(true)

    expect(typeof getOperation("includes")).toBe("function")
    expect(typeof getOperation("random")).toBe("function")
    expect(getOperation("random")(1, 2)).toBe(false)
})
