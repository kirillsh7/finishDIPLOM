
const hasOperationChanged = (oldOperation, newOperation) => {
	const keys = Object.keys(newOperation)
		.map(key => {
			if (oldOperation[key] !== newOperation[key]) {
				return { [key]: true }
			}
		})
		.filter(item => item !== undefined)
		.reduce((acc, item) => ({ ...acc, ...item }), {})

	return keys
}

module.exports = hasOperationChanged