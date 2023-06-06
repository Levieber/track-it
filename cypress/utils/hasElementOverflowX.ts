export const hasElementOverflowX = (document: Document) => {
	const elementsWithOverflow = [];
	const elementsOnDocument = document.getElementsByTagName("*");
	const documentWidth = document.documentElement.offsetWidth;
	let rect;

	for (const element of elementsOnDocument) {
		rect = element.getBoundingClientRect();

		if (rect.right > documentWidth || rect.left < 0) {
			elementsWithOverflow.push(element);
		}
	}

	return {
		elements: elementsWithOverflow,
		value: elementsWithOverflow.length > 0,
	};
};
