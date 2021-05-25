import { getConditionNextSteps } from "../../src/common/nextSteps"


describe("nextSteps", () => {
	test("returns condition if condition name is correct", () => {
		const condition = getConditionNextSteps("bronchitis")
		expect(condition).toBeDefined()
	})

	test("returns default condition if condition name is not available", () => {
		const condition = getConditionNextSteps("clearlyNotTrueCondition")
		expect(condition).toBeDefined()
		expect(condition.condition).toBe("default")
	})
})