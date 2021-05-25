import "react-native";
import React from "react";
import { render } from "@testing-library/react-native"

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
import { AssessmentSummary } from "../../src/views/AssessmentSummary";
import { Provider } from "react-redux";
import store from "../../src/store";

it("renders correctly", () => {
	renderer.create(
		<Provider store={store}>
			<AssessmentSummary />
		</Provider>
	);
});
