const express = require('express')
const path = require('path')
const sequelize = require('./database')
const taskRouter = require('./router/tasks')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
})
app.use('/tasks', taskRouter)

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.resolve(__dirname, 'views', '404.html'))
})

sequelize.sync().then(() => {
    console.log('Database connected')
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})