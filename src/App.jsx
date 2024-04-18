import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import './App.css'

function App() {

  return (
    <>
    <div id="main" className="text-sm w-full md:w-8/12 lg:w-6/12 sm:text-md md:text-base mx-auto px-6 py-5 my-10 rounded-md border border-gray-400 md:border-none">
      <div className="mx-auto">
        <img className="w-36 sm:w-56 md:w-48 mx-auto" src="/dowell-logo.png" alt="User Experience Lab Logo" />
        <hr />
      </div>

      <div className="pt-5">
        <h1 className="text-color font-bold text-lg text-center md:text-2xl md:text-left my-5">Open Source License Compatibility Tracker</h1>
        <div className="flex flex-col md:flex-row items-center">
          <p className="font-poppins text-justify pt-2 px-2">Wondering if the licenses of two software components are a good match for your project? Our tool analyzes and compares licenses, providing a percentage rating for compatibility. Whether you’re a developer, a legal expert, or simply curious about licensing, we’ve got you covered.</p>
          <img className="w-36 sm:w-56 md:w-40" src="/legalzard-logo.png" alt="Legalzard Logo" />
        </div>
      </div>

      <div className="pb-28">
        <form className="flex flex-col gap-4 py-8">
          <select className="select-color border border-slate-500 rounded-md p-2 font-roboto focus:outline-none focus:shadow-inner" name="selection1" id="select1">
            <option value="Select First License" defaultValue="selected">Select First License</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <select className="select-color border border-slate-500 rounded-md p-2 focus:outline-none focus:shadow-inner" name="selection2" id="select2">
            <option value="Select Second License" defaultValue="selected">Select Second License</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input className="input-color border border-slate-500 rounded-md p-2 pl-3 focus:outline-none focus:shadow-inner" type="email" name="email" id="email" placeholder="Enter your email address" />
          <div className="flex flex-wrap justify-center md:flex-row md:gap-3 mx-auto">
            <button className="btn btn-red">Close</button>
            <button className="btn btn-yellow">Reset</button>
            <button className="btn btn-green">
              <FontAwesomeIcon icon={faPaperPlane} style={{color: "#ffffff",}} />
              <span> Experience </span>
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default App
