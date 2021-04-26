import React from "react"
import { render } from "@testing-library/react-native"
import SearchAndSelectBar from "./search-and-select-bar"

test("it renders without blowing up", () => {
    const mockFn = jest.fn()
    const { getByTestId } = render(
        <SearchAndSelectBar options={["one", "two"]} selectedOptions={[]} toggleOption={mockFn} />,
    )
})
