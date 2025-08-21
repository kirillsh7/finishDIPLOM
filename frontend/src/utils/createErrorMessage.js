export const createErrorMessage = (err) => {
	if (!err.inner) return { message: err.message }

	const { inner } = err

	const errors = Array.isArray(inner)
		? inner.reduce((acc, item) => {
			const { path, errors } = item

			if (!acc.hasOwnProperty(path) && errors.length) {
				acc[path] = errors[0]
			}
			return acc
		}, {})
		: {}

	return errors

}