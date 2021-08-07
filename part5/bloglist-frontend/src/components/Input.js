import React from 'react'

const Input = ({text,name,value,handleChange}) => (
    <div>
            {text}
                <input
                type="text"
                value={value}
                name={name}
                onChange={handleChange}
        />
    </div>
)

export default Input