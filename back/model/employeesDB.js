const employeesDB = {
    employees: require('./employees.json'),
    setEmployees: (data) => {
        employeesDB.employees = data
    }
}

module.exports = employeesDB