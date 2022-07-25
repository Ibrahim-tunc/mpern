const employeesDB = require('../model/employeesDB')


const handleEmps = (req, res) => {
    const id = req.params.id

    try {
        const employees = id ? employeesDB.employees.find(e => e.id === id)
                             : employeesDB.employees
        if (employees.length === 0) {
            res.sendStatus(204) // it means no content
        }
        res.status(200).json(employees)

    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

module.exports =  handleEmps 