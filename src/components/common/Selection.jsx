import React from 'react'

function Selection({title}) {
  return (
    <select className="select-color border border-slate-500 rounded-md p-2 font-roboto focus:outline-none focus:shadow-inner" name="selection1" id="select1">
        <option value={title} defaultValue="selected">{title}</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
  )
}

export default Selection