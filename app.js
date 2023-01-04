const express = require('express')
const sequelize = require('./database')
const taskRouter = require('./router/tasks')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())
app.use('/tasks', taskRouter)

app.get('/', (req, res) => {
    res.send('Main page')
})

sequelize.sync().then(() => {
    console.log('Database connected')
})

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})