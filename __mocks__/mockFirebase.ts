/* eslint-disable no-undef */

jest.mock("@react-native-firebase/auth", () => {
    const user = {
        uid: "29edsisldbclkjncda",
        username: "",
        phoneNumber: ""
    }

    return jest.fn(() => ({
        onAuthStateChanged: jest.fn(),
        currentUser: jest.fn(),
        signInWithPhoneNumber: jest.fn()
    }))
})

jest.mock("@react-native-firebase/firestore", () => {
    return jest.fn(() => ({
        collection: jest.fn,
    }))
})