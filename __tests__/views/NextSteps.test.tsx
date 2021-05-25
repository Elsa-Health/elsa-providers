import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../src/store";
import { NextSteps, nextStepsStateReducer } from "../../src/views/NextSteps";

it("renders correctly", () => {
	renderer.create(
		<Provider store={store}>
			<NextSteps />
		</Provider>
	);
});

describe("Next Steps View", () => {
	const state = {
		referred: false,
		referredForTesting: false,
		prescribedMedications: false,
		investigationsOrdered: [],
		dispensedMedications: [],
		recommendations: "",
	};

	test("reducer default", () => {
		const result = nextStepsStateReducer(state, {})
		expect(result).toEqual(state)
	});

	test("reducer toggle-referred", () => {
		const result = nextStepsStateReducer(state, {
			type: "toggle-referred",
		});
		expect(result.referred).toBe(true);

		const result2 = nextStepsStateReducer(result, {
			type: "toggle-referred",
		});
		expect(result2.referred).toBe(false);
	});

	test("reducer toggle-testing", () => {
		const result = nextStepsStateReducer(state, {
			type: "toggle-testing",
		});
		expect(result.referredForTesting).toBe(true);

		const result2 = nextStepsStateReducer(
			{ ...result, investigationsOrdered: ["one", "two"] },
			{
				type: "toggle-testing",
			}
		);
		expect(result2.referredForTesting).toBe(false);
		expect(result2.investigationsOrdered).toHaveLength(0);
	});

	test("reducer toggle-medication", () => {
		const result = nextStepsStateReducer(state, {
			type: "toggle-medication",
		});
		expect(result.prescribedMedications).toBe(true);

		const result2 = nextStepsStateReducer(
			{ ...result, dispensedMedications: ["one", "two"] },
			{
				type: "toggle-medication",
			}
		);
		expect(result2.prescribedMedications).toBe(false);
		expect(result2.dispensedMedications).toHaveLength(0);
	});

	test("reducer set-recommendations", () => {
		const result = nextStepsStateReducer(state, {
			type: "set-recommendations",
			payload: "Here is some dummy text",
		});
		expect(result.recommendations).toBe("Here is some dummy text");
	});

	test("reducer update-prescription", () => {
		// first setting the medications to "true"
		const initial = nextStepsStateReducer(state, {
			type: "toggle-medication",
		});

		const result = nextStepsStateReducer(initial, {
			type: "update-prescription",
			payload: "Cough Syrup",
		});
		expect(result.dispensedMedications).toContain("Cough Syrup");

		const result2 = nextStepsStateReducer(result, {
			type: "update-prescription",
			payload: "Amoxylin",
		});

		expect(result2.dispensedMedications).toContain("Cough Syrup");
		expect(result2.dispensedMedications).toContain("Amoxylin");
		expect(result2.dispensedMedications).toHaveLength(2);

		const result3 = nextStepsStateReducer(result2, {
			type: "toggle-medication",
		});

		expect(result3.dispensedMedications).toHaveLength(0);
	});

	test("reducer update-investigation", () => {
		// first setting the testing to "true"
		const initial = nextStepsStateReducer(state, {
			type: "toggle-testing",
		});

		const result = nextStepsStateReducer(initial, {
			type: "update-investigation",
			payload: "MRDT",
		});
		expect(result.investigationsOrdered).toContain("MRDT");

		const result2 = nextStepsStateReducer(result, {
			type: "update-investigation",
			payload: "Blood Smear",
		});

		expect(result2.investigationsOrdered).toContain("MRDT");
		expect(result2.investigationsOrdered).toContain("Blood Smear");
		expect(result2.investigationsOrdered).toHaveLength(2);

		const result3 = nextStepsStateReducer(result2, {
			type: "toggle-testing",
		});

		expect(result3.investigationsOrdered).toHaveLength(0);
	});
});
