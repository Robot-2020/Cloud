import './App.css'
import Loader from './components/loader/Index';
import Landing from './components/landing/Index';
import NavBar from './components/navbar/Index';
import Project from './components/Project/Index';

function App() {
  return (
      <div className='main text-white overflow-hidden'>
        <Loader />
        <div className=' bg-[#151515]'>
          <NavBar />
          <Landing />
          <Project />
        </div>
      </div>
  )
}

export default App
