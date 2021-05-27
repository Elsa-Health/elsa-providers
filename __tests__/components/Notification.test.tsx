import React from "react";
import { render } from "@testing-library/react-native"
import { View } from "react-native";
import { Notification, VariationType} from "../../src/components/Notification"


describe("Notification", () => {
    test("Notification component", () => {
        const onPress = jest.fn();

        const ALL_VARIATIONS: VariationType[] = ["info", "warning", "danger", "note"];
        
        ALL_VARIATIONS.forEach(variation => {
            const {findByTestId} = render(<Notification variation={variation} title={"title"} visible={true} marginVertical={20} onPress={onPress}>
            <View>

            </View>
       
        </Notification>)

        })
        
    })
})
