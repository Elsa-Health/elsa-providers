import React from "react"
import { render } from "react-native-testing-library"
import MockedNavigator from "../__mocks__/mockedNavigator"
import { PhoneAuthScreen } from "../app/screens/phone-auth-screen/phone-auth-screen"

test("should verify two questions", () => {
    const { queryAllByA11yRole, getByTestId } = render(<MockedNavigator component={PhoneAuthScreen} />)
    const allQuestions = getByTestId("container")

    expect(2 + 2).toBe(4)

    expect(allQuestions).toHaveLength(2)
})
