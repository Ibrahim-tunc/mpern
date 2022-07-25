const path = require('path')
const fsPromises = require('fs').promises
const employeesDB = require('../model/employeesDB')


const deleteEmp = async (req, res) => {
    const id = req.params.id
    const employees = employeesDB.employees

    const deleteEmployee = employees.find(employee => employee.id === id)

    if (!deleteEmployee) {
        res.status(409).json({ "message": "id is not available" })
    }

    try {
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "employees.json"),
            JSON.stringify(employees.filter(employee => employee.id != id))
        )
        res.sendStatus(200)

    } catch (error) {
        res.status(500).json({ "message": error.message })
    }

}

module.exports =  deleteEmp 