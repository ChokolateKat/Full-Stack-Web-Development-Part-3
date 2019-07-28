import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req =  axios.get(baseUrl)
    return req.then(response => response.data)
}
  
const create = newObject => {
    const req =  axios.post(baseUrl, newObject)
    return req.then(response => response.data)
}

const update = (id, newObj) => {
    return axios.put(`${baseUrl}/${id}`, newObj)
}

const eliminateEntry = entryId => {
    return axios.delete(`${baseUrl}/${entryId}`)
}

export default { getAll, create, eliminateEntry, update }