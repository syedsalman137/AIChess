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

import './main.css';

function MainPage() {
    return (
    <div className='main'>
        <div className='link-box'>
            <div className='text-cont'>
                <div className='title'>AIChess</div>
                <div className='info'>A web based chess engine</div>
            </div>
            <div style={{backgroundImage: `url(${"assets/images/hq-chess-pieces-transparent-hd-photo-29.png"})`}}  className='bgimage'></div>
        </div>
        <a className='play-link' href='/arena'><button className="play-button" role="button"><span className="text">Play the AI</span></button></a>
    </div>
    )
}

export default MainPage;