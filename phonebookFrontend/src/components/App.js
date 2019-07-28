import React, { useState, useEffect } from 'react'
import DisplayTable from './DisplayTable'
import FilterForm from './FilterForm'
import Entry from './Entry'
import ServerCommunication from './ServerCommunication'

const App = () => {
  //Initial value is unused - it ensures that persons is an array with objects formed 
  //in the manner used by the remainder of the application, avoiding various errors
  const [ persons, setPersons] = useState([{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "-1"
  }]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ currentMessage, setCurrentMessage] = useState(null)

  const handleNewName = (event) => 
    setNewName(event.target.value)

  const localUpdate = (entryId) => {
    setPersons(persons.filter(i => i.id !== entryId))
  }

  const SuccessMessage = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className="successMessage">
        {message}
      </div>
    )
  }

  const handleSubmission = (event) => {
    event.preventDefault()

    const nameObj = {
      name: newName,
      number: newNumber
    }

    let messageBegin = ''
    
    if (isNew(newName)) {
      ServerCommunication
        .create(nameObj)
          .then(returnedObj => 
            setPersons(persons.concat(returnedObj)))
      messageBegin = 'Added'

    } else if (window.confirm(
      `${newName} is already in the phonebook, replace the old number with a new one?`)) {

        const entryId = getId(newName)
      
      ServerCommunication.update(entryId, nameObj).then(returnedObj =>
        setPersons(persons.map(person => person.id !== entryId ? person : returnedObj.data))
        .catch(error => {
          alert(
            `The phonebook entry for ${newName} was already deleted from the server`
          )
          setPersons(persons.filter(person => person.id !== entryId))
        })
      )
      messageBegin = 'Updated the phone number of'
    }
    setCurrentMessage(`${messageBegin} ${newName}`)
    setNewName('')
    setNewNumber('')
    setTimeout(() => setCurrentMessage(null), 5000)
  }

  const getId = (name) =>
    persons.find(person => person.name === name).id

  useEffect(() => {
    console.log('effect')
    ServerCommunication
      .getAll()
        .then(initPhonebook => setPersons(initPhonebook))
  }, [])

  const FilteredEntries = () => 
      persons.filter(entry => 
        entry.name.toLowerCase().includes(
          newFilter.toLowerCase())).map(
            entry => <Entry entry = {entry} localUpdate = {localUpdate}/>)

  const handleNewNumber = (event) => 
    setNewNumber(event.target.value)

  const handleFilterUpd = (event) =>
    setNewFilter(event.target.value)

  const isNew = (name) => 
    !persons.some(person => 
      person.name === name)

  return (
    <div>
      <h2>Phonebook</h2>
        <SuccessMessage message = {currentMessage}/>
        <FilterForm handleFilterUpd = {handleFilterUpd} newFilter = {newFilter}/>
      <h2>Add a New Entry</h2>
      <form onSubmit = {handleSubmission}>
        <div>
          name: <input value = {newName} onChange = {handleNewName}/>
        </div>
        <div>
          phone number: <input value = {newNumber} onChange = {handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Phonebook Entries</h2>
        <div>
          <DisplayTable entries = {FilteredEntries(persons, newFilter)}/>
        </div>
    </div>
  )
}

export default App