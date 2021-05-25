import {
	adjustColor,
	labelToValue,
	pickerOptionsFromList,
	toggleList,
} from "../../src/common/utils";

describe("Utils", () => {
	test("adjust color", () => {
		const color = adjustColor("red", 24);
		expect(color).toBe("#aNd");
	});

	test("Label to Value", () => {
		expect(labelToValue(123)).toBe(123);
		expect(labelToValue("ELSA")).toBe("elsa");
		expect(labelToValue("ELSA SmaLL")).toBe("elsa-small");
	});

	test("Picker Options From List", () => {
		expect(pickerOptionsFromList([])).toBeDefined();
	});

	test("Toogle List", () => {
		const testList = ["samle", "values", "inside"];
		expect(toggleList([], "value")).toHaveLength(1);
		expect(toggleList(testList, "values")).toHaveLength(testList.length - 1);
		expect(toggleList(testList, "newValue")).toHaveLength(
			testList.length + 1
		);
	});
});
