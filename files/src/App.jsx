// // @license

// // This program hosts a chess engine.

// // Copyright (C) 2023  Syed Salman Habeeb Quadri

// // This program is free software: you can redistribute it and/or modify
// // it under the terms of the GNU General Public License as published by
// // the Free Software Foundation, either version 3 of the License, or
// // (at your option) any later version.

// // This program is distributed in the hope that it will be useful,
// // but WITHOUT ANY WARRANTY; without even the implied warranty of
// // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// // GNU General Public License for more details.

// // The GNU General Public License does not permit incorporating this program
// // into proprietary programs.

// // You should have received a copy of the GNU General Public License
// // along with this program.  
// // If not, see [GNU General Public License](https://www.gnu.org/licenses/).

import './App.css';
import Arena from './components/arena/arena';
import PlayForm from './components/form/form'
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/main/main';
import { useSelector  } from 'react-redux';

function App() {
  let isPlaying = useSelector((state) => state.game.isPlaying);
  return (
  <Routes>
    <Route path='/' element={ <MainPage /> }></Route>
    <Route path='/arena' element={ !isPlaying && <PlayForm />  || isPlaying && <Arena />}></Route>
    {/* <Route path='/arena' element={ true && <Arena /> }></Route> */}
  </Routes>
  )
}

export default App;
