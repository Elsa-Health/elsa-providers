import {
	adjustColor,
	authenticate,
	AuthInfoMap,
	ERROR_MESSAGE,
	fieldNames,
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

	describe("authentication", () => {
		test("to succeed", () => {
			const QR_DATA = "3|ID|FN|LN|ROLE|TELE|FCN|CITY|FCNID"
			expect(authenticate(QR_DATA)).resolves.toStrictEqual({
				version: "3",
				id: "ID",
				firstName: "FN",
				lastName: "LN",
				role: "ROLE",
				telephone: "TELE",
				facilityName: "FCN",
				facilityId: "FCNID",
				city: "CITY"
			});
		});

		test("to fail", () => {
			const QR_DATA = "3|ID|FN|LN|ROLE|TELE|FCN|FCNID";

			// NEXT: checks for the 2 types of error... potentially one thrown by _ and another the ERROR_MESSAGE
			expect(authenticate(QR_DATA)).rejects.toThrowError();
		});
	})

});
