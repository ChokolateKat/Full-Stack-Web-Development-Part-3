import React from 'react'
import DeleteButton from './DeleteButton'

const Entry = ({entry, localUpdate}) => 
    <tr key = {entry.id}> 
        <td key = {entry.id}>
            {entry.name}
        </td>
        <td key = {entry.id}>
            {entry.number}
        </td>
        <td>
            <DeleteButton entry = {entry} localUpdate = {localUpdate}/>
        </td>
    </tr>
   
    
export default Entry