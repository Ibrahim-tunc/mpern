const path = require('path')
const employeesDB = require('../model/employeesDB')
const fsPromises = require('fs').promises

const updateEmp = async (req, res) => {
    const id = req.params.id
    const { newTasks } = req.body


    const employees = employeesDB.employees
    const employee = employees.find(employee => employee.id === id)
    if (!employee) {
        res.status(409).json({ "message": "id is not available" })
    }
    try {
        const newEmployees = employees.map(e => {
            if (e.id === id) {
                return { ...e, tasks: newTasks};
            }
            return e
        })
        console.log(newTasks)
        console.log(newEmployees)
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "employees.json"),
            JSON.stringify(newEmployees)
        )
        res.status(200).json({ "message": "Task is updated" })
    } 
    catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

module.exports =  updateEmp 