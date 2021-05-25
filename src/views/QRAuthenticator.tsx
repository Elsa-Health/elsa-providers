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

type QRAuthenticatorProps = {};

const QRAuthenticator: React.FC<QRAuthenticatorProps> = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const onSuccess = (e: BarCodeReadEvent) => {
		const { data } = e;
		const fieldNames = [
			"version",
			"id",
			"firstName",
			"lastName",
			"role",
			"telephone",
			"facilityName",
			"city",
			"facilityId",
		];
		const QRInfo = data.split("|");
		const info: { [key: string]: string } = {};
		fieldNames.forEach((name, idx) => (info[name] = QRInfo[idx]));
		console.log(data);
		if (
			Array.isArray(QRInfo) &&
			QRInfo.length === fieldNames.length &&
			info.facilityName &&
			info.version &&
			info.facilityId
		) {
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
		}
		ToastAndroid.show("Please scan a valid QR code", 3000);
		logout();
	};
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
