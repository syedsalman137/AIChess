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

// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import React, { useRef } from "react";
import './form.css';
import { gameActions } from '../../redux/gameSlice';
// import { setLevel } from "../../redux/gameSlice";
import {useDispatch} from "react-redux";


function PlayForm() {

	const dispatch = useDispatch();
    return (
        <div className='form-container'>
        <div className='form'>
        <div className='field'>
            <div className='heading'>Level:</div>
            <label className="rad-label">
                <input type="radio" className="rad-input" name="rad" value="1" onClick={() => dispatch(gameActions.setLevel(1))} defaultChecked/>
                <div className="rad-design"></div>
                <div className="rad-text">1</div>
            </label>

            <label className="rad-label">
                <input type="radio" className="rad-input" name="rad" value="2" onClick={() => dispatch(gameActions.setLevel(2))} />
                <div className="rad-design"></div>
                <div className="rad-text">2</div>
            </label>

            <label className="rad-label">
                <input type="radio" className="rad-input" name="rad" value="3" onClick={() => dispatch(gameActions.setLevel(3))} />
                <div className="rad-design"></div>
                <div className="rad-text">3</div>
            </label>
            </div>
            <button className="start-button" role="button" onClick={() => dispatch(gameActions.setPlay())}><span className="start-text">Start</span></button>
        </div>
        </div>
    )
}

export default PlayForm;