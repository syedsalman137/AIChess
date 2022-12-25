// import logo from './logo.svg';
import './App.css';
import Arena from './components/arena/arena';
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/main/main';

function App() {

  return (
  <Routes>
    <Route path='/' element={ <MainPage /> }></Route>
    <Route path='/arena' element={ <Arena /> }></Route>
  </Routes>
  )
}

export default App;
