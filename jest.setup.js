jest.mock("react-native-permissions", () =>
	require("react-native-permissions/mock")
);
jest.mock("@react-navigation/native", () => ({
	...jest.requireActual("@react-navigation/native"),
	useNavigation: () => ({ goBack: jest.fn() }),
	useRoute: () => ({
		params: {},
	}),
}));

// jest.mock("react-native", () => ({
// 	...jest.requireActual("react-native"),
// 	InteractionManager: {
// 		...jest.requireActual("react-native").InteractionManager,
// 		clearInteractionHandle: jest.fn(),
// 	},
// }));
