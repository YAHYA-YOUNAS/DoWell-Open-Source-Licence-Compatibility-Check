import Header from './components/Header'
import Main from './components/Main'
import './App.css'

function App() {
  return (
    <div id="main" className="text-sm w-full md:w-8/12 lg:w-6/12 sm:text-md md:text-base mx-auto px-6 py-5 my-10 rounded-md border border-gray-400 md:border-none">
      <Header/>
      <Main/>
    </div>
  )
}

export default App
