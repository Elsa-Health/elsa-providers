import React from "react";
import { render } from "@testing-library/react-native"
import { Spacer } from "../../src/components/Spacer"

describe("Spacer", () => {
    test("Is it rendered", () =>{
        const sizeSet = 0;
        const horizontalOrientationSet =false;
        const {getByTestId} = render(<Spacer size={sizeSet} horizontal={horizontalOrientationSet} />)
        
        expect(getByTestId).toBeDefined();
    })
    test("Is it rendered", () =>{
        const sizeSet = 0;
        const horizontalOrientationSet =true;
        const {getByTestId} = render(<Spacer size={sizeSet} horizontal={horizontalOrientationSet} />)
        
        expect(Spacer).toBeDefined();
    })
})