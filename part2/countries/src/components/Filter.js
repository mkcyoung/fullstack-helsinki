import React from 'react';


const Filter = ({ value, handler }) => {
    return (
        <> find countries <input
        value={value}
        onChange={handler} 
        /> 
        </>
    )
  }

export default Filter