const express = require('express')
const cors = require('cors')
const path = require('path')
const fsPromises = require('fs').promises
const app = express()
require('dotenv').config()
const { PORT } = process.env
app.use(express.json())
app.use(cors())

const handleEmps = require('./controller/employeesCtrl')
const deleteEmp = require('./controller/deleteEmpCtrl')
const updateEmp  = require('./controller/updateEmpCtrl')
const handleRecord = require('./controller/recordCtrl')


app.get('/employees/:id', handleEmps)

app.get('/employees', handleEmps)

app.delete('/deleteemployee/:id', deleteEmp)

app.put('/updateemployee/:id', updateEmp)

app.post('/record', handleRecord)

app.listen(PORT, console.log("server listen on " + PORT))

