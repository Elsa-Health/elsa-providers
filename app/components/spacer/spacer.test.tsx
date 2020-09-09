import React from "react"
import { render } from "@testing-library/react-native"
import Spacer from "./spacer"

test("it renders", () => {
    const { getByText } = render(<Spacer size={20} />)
})
