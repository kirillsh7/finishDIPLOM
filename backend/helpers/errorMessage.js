const errorMessage = (error) => {
	if (error.includes('E11000')) return 'Почта занята'

	return error

}

module.exports = errorMessage