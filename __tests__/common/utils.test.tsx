import { adjustColor, labelToValue, pickerOptionsFromList, toggleList } from "../../src/common/utils";

describe ("Utils", () => {
    test("adjust color", () => {
        const color = adjustColor("red", 24);
        expect(color).toBe("#aNd");
    })

    test("Label to Value", () => {
        expect(labelToValue("ELSA")).toBe("elsa")
    })

    test("Picker Options From List", () => {
        expect(pickerOptionsFromList([])).toBeDefined();
    })

    test("Toogle List", () => {
        expect(toggleList([], "value")).toBeDefined();
    })
})
