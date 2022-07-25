const path = require('path')
const fsPromises = require('fs').promises
const employeesDB = require('../model/employeesDB')


const handleRecord = async (req, res) => {
    const { name, id, tasks } = req.body

    if(!id || !name || !tasks) {
        res.status(406).json("Id, name or tasks can't be empty")
    }

    const duplicate = employeesDB.employees.find(e => e.id === id)

    if(duplicate){
        res.status(409).json("This id is already in use")
    }
    try {
        const newEmployee = {name: name , id: id, tasks: tasks}
        console.log(newEmployee)
        employeesDB.setEmployees([...employeesDB.employees, newEmployee])

        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "employees.json"),
            JSON.stringify(employeesDB.employees)
        )

        res.status(201).json(`new employee ${name} was created !` )    
    } 
    catch (error) {
        res.status(500).json(error.message)
    }

}

module.exports = handleRecord