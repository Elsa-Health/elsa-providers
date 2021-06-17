import _ from "lodash";
export function adjustColor(color: string, amount: number): string {
	return (
		"#" +
		color
			.replace(/^#/, "")
			.replace(/../g, (color) =>
				(
					"0" +
					Math.min(
						255,
						Math.max(0, parseInt(color, 16) + amount)
					).toString(16)
				).substr(-2)
			)
	);
}

export function labelToValue(item: string): string {
	if (typeof item !== "string") return item;
	return _.kebabCase(item.toLowerCase());
}

export function pickerOptionsFromList(
	list: (string | number)[]
): { label: string; value: string | number }[] {
	return list.map((item) => ({
		label: _.upperFirst(String(item)),
		value: labelToValue(item as string),
	}));
}

export function toggleList(list: any[], value: any): any[] {
	if (list.includes(value)) {
		return list.filter((val) => val !== value);
	} else {
		return [...list, value];
	}
}

type FieldName =
	| "version"
	| "id"
	| "firstName"
	| "lastName"
	| "role"
	| "telephone"
	| "facilityName"
	| "city"
	| "facilityId";

// Exported for tests
export const fieldNames: FieldName[] = [
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

export type AuthInfoMap = { [key in FieldName]: string };
export const ERROR_MESSAGE = "Please scan a valid QR code";

export function authenticate(data: string): Promise<AuthInfoMap> {
	return new Promise((resolve, reject) => {
		try {
			const QRInfo = data.split("|");
			const info = _.zipObject(fieldNames, QRInfo) as AuthInfoMap;
			// console.log(data);
			if (
				Array.isArray(QRInfo) &&
				QRInfo.length === fieldNames.length &&
				info.facilityName &&
				info.version &&
				info.facilityId
			) {
				// NEXT: get the GPS location of the user at the moment of sign in.
				resolve(info);
			}

			throw new Error(ERROR_MESSAGE);
		} catch (err) {
			// reject with the message
			reject(err);
		}
	});
}
