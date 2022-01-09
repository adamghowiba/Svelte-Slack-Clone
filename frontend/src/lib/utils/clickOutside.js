export function clickOutside(node) {
	const handleClick = event => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
