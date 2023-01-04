const { Model, DataTypes } = require('sequelize')
const sequelize = require('../database')

class Task extends Model {}

Task.init({
    black: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 54]
        }
    },
    white: {
        type: DataTypes.STRING,
        validate: {
            len: [3, 54]
        }
    },
    move: {
        type: DataTypes.STRING,
        validate: {
            len: [5, 5]
        }
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    diff: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    answer: {
        type: DataTypes.JSON,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'task',
    timestamps: false
})

module.exports = Task