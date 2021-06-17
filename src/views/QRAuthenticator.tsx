import React from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	ToastAndroid,
	View,
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import { BarCodeReadEvent, RNCamera } from "react-native-camera";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";
import _ from "lodash";
import { login, logout } from "../store/slices/authentication";
// import { getFacilityById } from "../facilities";
import { Screen } from "../components/screen";
import { useCallback } from "react";
import { authenticate as AuthUtilFn } from '../common/utils';

type QRAuthenticatorProps = {
	authenticate: typeof AuthUtilFn;
};

const QRAuthenticator: React.FC<QRAuthenticatorProps> = ({ authenticate }) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const onSuccess = useCallback(
		(e: BarCodeReadEvent) => {
			authenticate(e.data)
				.then((info) => {
					// NEXT: get the GPS location of the user at the moment of sign in.
					dispatch(
						login({
							loggedIn: true,
							lat: 0,
							lng: 0,
							name: info.firstName,
							uid: info.id,
						})
					);
					ToastAndroid.show(
						"Welcome " +
							_.upperFirst(info.firstName) +
							" " +
							_.upperFirst(info.lastName),
						ToastAndroid.SHORT
					);
					// Replace current stack with the MainNavigator
					return navigation.dispatch(
						StackActions.replace("PatientDemographics", {})
					);
				})
				.catch((err: Error) => {
					ToastAndroid.show(err.message, 3000);
					dispatch(logout());
				});
		},
		[authenticate, dispatch, navigation]
	);
	return (
		// <View>
		<QRCodeScanner
			onRead={onSuccess}
			containerStyle={styles.container}
			flashMode={RNCamera.Constants.FlashMode.off}
			reactivate
			reactivateTimeout={3000}
			topContent={
				<Text style={styles.centerText}>
					Use your QR card to authenticate yourself.
				</Text>
			}
			bottomContent={
				<TouchableOpacity style={styles.buttonTouchable}>
					<Text style={styles.buttonText}>
						Powered by Elsa Health
					</Text>
				</TouchableOpacity>
			}
		/>
		// </View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
	},
	centerText: {
		flex: 1,
		fontSize: 20,
		padding: 32,
		color: "#777",
		textAlign: "center",
	},
	textBold: {
		fontWeight: "500",
		color: "#000",
	},
	buttonText: {
		fontSize: 18,
		color: "#777",
	},
	buttonTouchable: {
		padding: 16,
	},
});

export { QRAuthenticator };
