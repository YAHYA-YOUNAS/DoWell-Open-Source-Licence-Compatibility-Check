import React from 'react'
import Selection from './Selection'
import Input from './Input'
import Button from './Button'

function Form() {
  return (
    <form className="flex flex-col gap-4 py-8">
        <Selection title="Select First License"/>
        <Selection title="Select Second License"/>
        <Input type="email" name="email" id="email" placeholder="Enter your email address" />

        <div className="flex flex-wrap justify-center md:flex-row md:gap-3 mx-auto">
            <Button classes="btn-red" name="Close"/>
            <Button classes="btn-yellow" name="Reset"/>
            <Button classes="btn-green" name="Experience" showIcon="experience"/>
            {/* <Button classes="btn-green" name="Check" showIcon="check"/> */}
        </div>
    </form>
  )
}

export default Form