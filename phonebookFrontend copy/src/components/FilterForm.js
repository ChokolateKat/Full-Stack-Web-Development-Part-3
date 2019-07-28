import React from 'react'

const FilterForm = ({handleFilterUpd}, {newFilter}) => {
    return (
      <div>
        Filter your Entries: <input value = {newFilter} onChange = {handleFilterUpd}/>
      </div>
    )
}

export default FilterForm