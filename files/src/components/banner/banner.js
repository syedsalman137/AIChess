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

import './banner.css';

const blackPieces = ["assets/pieces/bq.svg", "assets/pieces/br.svg", "assets/pieces/bn.svg", "assets/pieces/bb.svg"];
const whitePieces = ["assets/pieces/wq.svg", "assets/pieces/wr.svg", "assets/pieces/wn.svg", "assets/pieces/wb.svg"];


function Banner({message, isPromotion}) {
    let images = [];
    if (message !== null) {
        return (<div className='banner'>{message}</div>)
    }
    else if (isPromotion !== null) {
        if (isPromotion === 'w') {
            for(let i = 0; i < whitePieces.length; i++) {
                images.push(<div className='promopiece' style={{backgroundImage: `url(${whitePieces[i]})`}}></div>)
            }
        }
        else {
            for(let i = 0; i < blackPieces.length; i++) {
                images.push(<div className='promopiece' style={{backgroundImage: `url(${blackPieces[i]})`}}></div>)
            }
        }
        return (<div className='banner'>{images}</div>)
    }
    else {
        return (<div className='banner'></div>)
    }
}

export default Banner;