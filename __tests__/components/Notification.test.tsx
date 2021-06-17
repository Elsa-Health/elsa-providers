import React from "react";
import { cleanup } from "@testing-library/react-native"
import { View } from "react-native";
import { Notification, VariationType} from "../../src/components/Notification"

import renderer from 'react-test-renderer'

describe("Notification", () => {
    test("renders correctly", () => {
        const mockOnPress = jest.fn()

		renderer.create(
			<Notification
				variation={"info"}
                title={"title"}
                visible={true}
                marginVertical={20}
                onPress={mockOnPress}
            >
                <View />
            </Notification>
        )
    })
})

afterAll(cleanup)

