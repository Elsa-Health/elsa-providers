import React from "react";
import { render } from "@testing-library/react-native"
import { Text } from "./text"

test("it renders", () => {
    const { getByText } = render(<Text />)
})
