import React from 'react'

const DisplayTable = ({entries}) =>
    <table>
        <tr>
            <td>Name</td>
            <td>Phone Number</td>
        </tr>
            {entries}
    </table>

export default DisplayTable