require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const routes = require('./routes/routes')
const cors = require('cors')
const port = 3001
const app = express()
app.use(express.static('../frontend/dist'))

app.use(express.json())
app.use(cookieParser())
app.use(cors({
	origin: 'http://shlogov.kiriill.result-student.tw1.ru',
	credentials: true
}))
app.use('/', routes)

mongoose
	.connect(process.env.DB_CONNECTION_STRING)
	.then(() => {
		app.listen(port, () => {
			console.log(`Server is running on port ${port}`)
		})
	})
	.catch(err => console.log(err))
