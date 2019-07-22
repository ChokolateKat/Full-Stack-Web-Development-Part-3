const express = require('express')
const app = express()
const bodyParser = require('body-parser')

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        numbder: "39-42-123456",
        id: 2
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    let info = `Phonebook has info for ${persons.length} people`
    info = info.concat(`\n${new Date()}`)
    response.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})