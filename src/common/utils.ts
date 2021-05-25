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
