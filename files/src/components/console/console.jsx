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

import './console.css';

var text = "Copy";

function copy(e, pgn) {
    if (e.target.classList.contains('copy-button')) {
        navigator.clipboard.writeText(pgn);
    }
}

function Console({ pgn }) {
    return (
        <div className='console'>
            <div className='button-holder'></div>
            <div className='pgn-holder'>
                <div className='copy-button'><button onMouseDown={(e) => copy(e, pgn)} className='copy-button'>{ text }</button></div>
                { pgn }
            </div>
        </div>
    )
}

export default Console;