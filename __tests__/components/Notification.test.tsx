import React from "react";
import { cleanup } from "@testing-library/react-native"
import { View } from "react-native";
import { Notification, VariationType} from "../../src/components/Notification"

import renderer from 'react-test-renderer'

describe("Notification", () => {
    test("renders correctly", () => {
        const variations: VariationType[] = [ "danger", "info", "note", "warning" ]
        const mockOnPress = jest.fn()

        variations.forEach(variation => {
            renderer.create(
                <Notification
                    variation={variation}
                    title={"title"}
                    visible={true}
                    marginVertical={20}
                    onPress={mockOnPress}
                >
                    <View />
                </Notification>
            )
        });
    })
})

afterAll(cleanup)

