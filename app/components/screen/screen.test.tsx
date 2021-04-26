import React from "react"
import { Text } from "react-native"
import { render } from "@testing-library/react-native"
import { Screen } from "./screen"
import { SafeAreaProvider } from "react-native-safe-area-context"

test("it renders scroll without blowing up", () => {
    const mockFn = jest.fn()
    const { getByText } = render(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
            <Screen
                backgroundColor="#fff"
                title="Some Title here"
                statusBar="light-content"
                preset="scroll"
            >
                <Text>Sample Text</Text>
            </Screen>
        </SafeAreaProvider>,
    )

    const sampleText = getByText("Sample Text")
    expect(sampleText).toBeTruthy()
})

test("it renders fixed without blowing up", () => {
    const mockFn = jest.fn()
    const { getByText, getByTestId } = render(
        <SafeAreaProvider initialSafeAreaInsets={{ top: 1, left: 2, right: 3, bottom: 4 }}>
            <Screen
                backgroundColor="#fff"
                title="Some Title here"
                statusBar="light-content"
                preset="fixed"
            >
                <Text testID="innerText">Sample Text</Text>
            </Screen>
        </SafeAreaProvider>,
    )

    const sampleText = getByTestId("innerText")
    expect(sampleText).toBeTruthy()
})
