import React from 'react';

function Selection({title, data, selectedValue, onSelectChange}) {
  return (
    <select className="select-color border border-slate-500 rounded-md p-2 font-roboto focus:outline-none focus:shadow-inner" 
      name="selection" 
      id="selection" 
      value={selectedValue}
      onChange={(event) => onSelectChange(event.target.value)} 
      required={true}>
        <option value={title} defaultValue="selected">{title}</option>
        {data.map((license) => (
          <option key={license._id} value={license.eventId}>{license.softwarelicense.license_name}</option>
        ))}
    </select>
  )
}

export default Selection