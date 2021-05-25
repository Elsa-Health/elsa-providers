import React from "react";
import { render } from "@testing-library/react-native"
import { View } from "react-native";
import { Notification } from "../../src/components/Notification"


describe("Notification", () => {
    test("Notification component", () => {
        const onPress = jest.fn();
        const {findByTestId} = render(<Notification variation={"danger"} title={"title"} visible={true} marginVertical={20} onPress={onPress}>
            <View>

            </View>
       
        </Notification>)

    })
})