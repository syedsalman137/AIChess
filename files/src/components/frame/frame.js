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

import './frame.css';

function FrameStick ({showChar, isVertical}) {
    if (isVertical) {
        return(
            <div className='stick vertstick'>{showChar}</div>
        )
    }
    else {
        return (
            <div className='stick horzstick'>{showChar}</div>
        )
    }
}

export default FrameStick;