const path = require('path')
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')
const employeesDB = require('../model/employeesDB')


const handleRegister = async (req, res) => {
    const { id, password, name } = req.body

    if (!id || !password || !name) {
        res.status(406).json("id, password or name can't be empty")
    }

    const duplicate = employeesDB.employees.find(employee => employee.id === id)

    if (duplicate) {
        res.status(409).json("this id is already in use")
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newEmployee = {
            "id": id,
            "password": hashedPassword,
            "name": name
        }
        employeesDB.setEmployees([...employeesDB.employees, newEmployee])

        console.log(employeesDB.employees)

        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "employees.json"),
            JSON.stringify(employeesDB.employees)
        )

        res.status(201).json({ 'success': `New employee ${newEmployee.name} created` })

    } catch (error) {
        res.status(500).json({ "message": error.message })
    }
}

module.exports = handleRegister
