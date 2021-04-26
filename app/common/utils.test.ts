import {
    fullFormatDate,
    getMonthName,
    friendlyFormatDate,
    pickerOptionsFromList,
    isValidDate,
    daysInMonth,
    calculateAge,
    shallowTypeCoerce,
    yearsDiff,
    toggleStringFromList,
    valuesToLabels,
    labelToValue,
} from "./utils"

const d = new Date("02/02/2002")

test("getMonthName works", () => {
    expect(getMonthName(d)).toBe("February")
})

test("isValidDate works", () => {
    expect(isValidDate(d)).toBe(true)
    expect(isValidDate(new Date("19/19/2002"))).toBe(false)
})

test("daysInMonth works", () => {
    expect(daysInMonth(1, 2021)).toBe(31)
})

test("calculateAge works", () => {
    // Testing that default works
    expect(calculateAge("")).toBe(45)

    const d1 = new Date()
    d1.setFullYear(new Date().getFullYear() + 15)
    expect(calculateAge(d1)).toBe(15)
})

test("shallowTypeCoerce works", () => {
    const obj1 = {
        one: "1",
        two: "2",
        three: "3",
    }
    const obj2 = {
        one: 1,
        two: 2,
        three: 3,
    }
    const obj3 = {
        true: 1,
        false: 0,
    }
    const obj4 = {
        true: true,
        false: false,
    }
    expect(shallowTypeCoerce(obj1, ["one", "two", "three"], "number")).toEqual(obj2)
    expect(shallowTypeCoerce(obj2, ["one", "two", "three"], "string")).toEqual(obj1)
    expect(shallowTypeCoerce(obj3, ["true", "false"], "boolean")).toEqual(obj4)
})

test("yearsDiff works", () => {
    const d1 = new Date("02/02/2000")
    const d2 = new Date("02/02/2018")

    expect(Math.floor(yearsDiff(d1, d2))).toBe(18)
})

test("toggleStringFromList", () => {
    const myList = ["shallow", "dont", "save", "wanna"]

    expect(toggleStringFromList("shallow", myList).includes("shallow")).toBe(false)
    expect(toggleStringFromList("hello", myList).includes("hello")).toBe(true)
})

test("valuesToLabels works", () => {
    const myList = ["seems-so", "hello-there", "young", "money-mariki"]
    const myResult = ["Seems So", "Hello There", "Young", "Money Mariki"]

    expect(valuesToLabels(myList)).toEqual(myResult)
})

test("labelToValue works", () => {
    const myText = "You call on me"

    expect(labelToValue(myText)).toBe("you-call-on-me")
})
