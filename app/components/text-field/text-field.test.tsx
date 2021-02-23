import React from "react"
import { render, fireEvent } from '@testing-library/react-native'
import { TextField } from './text-field'

test("it renders", () => {
    const { getByText } = render(<TextField />)
})
