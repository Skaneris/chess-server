const express = require('express')
const router = express.Router()

const Task = require('../models/TaskModel')

router.get('/', async (req, res) => {
    try {
        const page = req.query.page || 1
        console.log('page ', page);
        const ofs = (page - 1) * 10
        const tasks = await Task.findAll({offset: ofs, limit: 10})
        const total = await Task.count()
        res.send({
            tasks: tasks,
            total: total
        })
    } catch (error) {
        res.send(error)
    }
})

router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).send(task)
    } catch (error) {
        res.send(error)
    }
})

router.patch('/:id', async (req, res) => {
    const paramsID = req.params.id
    try {
        const task = await Task.findOne({
            where: {
                id: paramsID
            }
        })
        if(task === null) {
            res.status(404).send({
                error: true,
                message: `Task with ID - ${paramsID} not found`
            })
        } else {
            task.update(req.body)
            res.status(200).send(task)
        }
    } catch (error) {
        res.send(error)
    }
})

router.delete('/:id', async (req, res) => {
    const paramsID = req.params.id
    try {
        const task = await Task.findOne({
            where: {
                id: paramsID
            }
        })
        if(task === null) {
            res.status(404).send({
                error: true,
                message: `Task with ID - ${paramsID} not found`
            })
        } else {
            task.destroy()
            res.status(200).send(`Task with ID - ${paramsID} deleted`)
        }
    } catch (error) {
        res.send(error)   
    }
})



module.exports = router