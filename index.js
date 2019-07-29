const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())

app.use(bodyParser.json())

const tiny = ':method :url :status :res[content-length] - :response-time ms'
const morganFormat = tiny.concat(' :person')

morgan.token('person', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(morgan(morganFormat))

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "1234",
        id: 2
    }
]

app.get('/', (request, response) => {
    const message = 'heroku operational'
    response.send(message)
    console.log(message)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    let info = `Phonebook has info for ${persons.length} people`
    info = info.concat(`\n${new Date()}`)
    response.send(info)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name)
    {
        return response.status(400).json({
            error: 'name is missing'
        })
    } 
    else if (!body.number)
    {
        return response.status(400).json({
            error: 'number is missing'
        })
    }
    else if (persons.some(person => person.name === body.name))
    {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    response.json(person)
})

const generateId = () => {
    return Math.floor(Math.random() * 5000000) + 1
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Heroku Port', process.env.PORT)
  console.log(`Server running on port ${PORT}`)
})