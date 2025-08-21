const calculateAmount = (type, clientAccount, operation) => {
	return type ? Number(clientAccount) + Number(operation) : Number(clientAccount) - Number(operation)
}
module.exports = calculateAmount