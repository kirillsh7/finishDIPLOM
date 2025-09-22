
module.exports = function mapUser(user) {
	return {
		id: user.id,
		login: user.login,
		created_date: user.createdAt
	}
}