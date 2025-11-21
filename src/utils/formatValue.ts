export const formatValue = (val: string | number): string => {
	const str = String(val);

	if (!str.includes(".")) {
		return str;
	}

	const [intPart, decPart = ""] = str.split(".");

	const truncated = decPart.slice(0, 2);

	return truncated ? `${intPart}.${truncated}` : intPart;
};
