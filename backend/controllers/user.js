const bcrypt = require('bcrypt')
const User = require('../models/User')
const { generate } = require('../helpers/token')


async function register(login, password) {

	try {
		if (!password) {
			throw new Error('Password is empty')
		}

		const passwordHash = await bcrypt.hash(password, 10)

		const user = await User.create({ login, password: passwordHash })

		const token = generate({ id: user.id, email: user.login, created_date: user.createdAt })
		return { user, token }
	} catch (e) {
		throw new Error(e)
	}
}

async function login(login, password) {
	try {
		const user = await User.findOne({ login })

		if (!user) {
			throw new Error('User not found')
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password)

		if (!isPasswordMatch) {
			throw new Error('Invalid password')
		}
		const token = generate({ id: user.id, email: user.login, created_date: user.createdAt })

		return { user, token }
	} catch (e) {
		throw new Error(e)
	}
}

async function updateUser(id, userData) {
	const newUserData = {
		login: userData.login,

	}
	if (userData.password) {
		const userCheckPassword = await User.findOne({ _id: id })
		const isPasswordMatch = await bcrypt.compare(userData.password,
			userCheckPassword.password)
		if (!isPasswordMatch) {
			throw new Error('Старый пароль не совпадает')
		}

		const passwordHash = await bcrypt.hash(userData.newPassword, 10)
		newUserData.password = passwordHash
	}
	const user = await User.findOneAndUpdate({ _id: id }, newUserData, { returnDocument: 'after' })
	const token = generate({ id: user.id, email: user.login, created_date: user.createdAt })
	return { user, token }
}
async function getUser(id) {
	return await User.findOne({ _id: id })
}

module.exports = {
	register,
	login,
	updateUser,
	getUser
}