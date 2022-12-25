import React, { useState } from 'react';
import { Chess } from 'chess.js';
import Tile from '../tiles/tile';
import Banner from '../banner/banner';
import FrameStick from '../frame/frame';
import './board.css';
import * as tf from '@tensorflow/tfjs';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

var model = null;
async function loadModel() {
    model = await tf.loadLayersModel('assets/model/model.json');
    console.log('Loaded')
    // model.predict(tf.zeros([1, 64])).dispose();
}

loadModel();

const fenTokens = {
    'r': 1.0,
    'n': 2.0,
    'b': 3.0,
    'q': 4.0,
    'k': 5.0,
    'p': 6.0,
    'R': 7.0,
    'N': 8.0,
    'B': 9.0,
    'Q': 10.0,
    'K': 11.0,
    'P': 12.0
}
var chess = new Chess();
var selectedPiece = null;
var message = null;
var promotionColor = null;
var secondBackPiece = null;
var promotionMove = null;

function tokenizeFen() {
    let fen = chess.fen();
    let splitter = /\s\w\s/.exec(fen)[0];
    fen = fen.split(splitter)[0];
    let lst = [];
    for (let i = 0; i < fen.length; i++) {
        let letter = fen[i];
        if ((letter.charCodeAt(0) > 47) & (letter.charCodeAt(0) < 58)){
            for (let j=0; j < Number.parseInt(letter); j++) {
                lst.push(0.0);
            }
        }
        else if (Object.keys(fenTokens).includes(letter)) {
            lst.push(fenTokens[letter]);
        }
        
    }
    let tens = tf.tensor([lst]);
    tens = tens.mul(1/12);
    return tf.variable(tens);
}

function deTokenizeMoves(moveTensor) {
    // let moveTensor = tf.tensor([[0.125, 0.125, 0.125, 0.01]])
    moveTensor = tf.mul(moveTensor, 7);
	moveTensor = tf.round(moveTensor);
	let moveArray = moveTensor.arraySync()[0];
	moveArray[0] = horizontalAxis[moveArray[0]];
	moveArray[1] = verticalAxis[moveArray[1]];
	moveArray[2] = horizontalAxis[moveArray[2]];
	moveArray[3] = verticalAxis[moveArray[3]];
	let moveDict = {'from': moveArray[0] + moveArray[1], 'to': moveArray[2] + moveArray[3]};
    let piece = chess.get(moveDict['from'])
    let pawnColor = piece['color']
    let isPrePromotionTile = (pawnColor === 'w' & moveDict['from'][1] === '7') | (pawnColor === 'b' & moveDict['from'][1] === '2');
    if (isPrePromotionTile) {
        moveDict['promotion'] = 'q';
    }
    return moveDict;
}

function Chessboard() {
    const [board, setBoard] = useState(new renderBoard());

    function refresh() {
        setBoard(new renderBoard());
    }

    function highlightPossibleMoves(possibleMoves) {
        for (let i = 0; i < possibleMoves.length; i++) {
            let pos = /\w\d/.exec(possibleMoves[i]);
            if (pos !== null) {
                document.getElementById(pos).style.border = '3px inset blue';
            }
            else if(possibleMoves[i] === 'O-O' | possibleMoves[i] === 'O-O-O') {
                let shuffleProfile = chess.move(possibleMoves[i]);
                chess.undo();
                document.getElementById(shuffleProfile['to']).style.border = '3px inset blue';
            }
        }
    }

    function dehighlightTiles(currentElement) {
        for (let i=0; i < horizontalAxis.length; i++) {
            for (let j=0; j < verticalAxis.length; j++) {
                let pos = horizontalAxis[i] + verticalAxis[j];
                if (currentElement.id !== pos) {
                    document.getElementById(pos).style.border = 'none';
                } 
            }   
        }
    }

    function renderMessage() {
        let newMessage = "None";
        if (chess.isCheckmate()) {
            newMessage = "CHECKMATE";
        }
        else if (chess.isStalemate()) {
            newMessage = "STALEMATE";
        }
        else if(chess.isThreefoldRepetition()) {
            newMessage = "Three-fold";
        }
        else if (chess.isDraw()) {
            newMessage = "DRAW";
        }
        else if(chess.isCheck()) {
            newMessage = "CHECK";
        }
        if (newMessage !== "None") {
            if (message !== newMessage + "!") {
                message = newMessage + "!";
            }
            else {
                message = null;
            }
        }
        else {
            message = null;
        }  
    }

    function highlightByIds(ids) {
        for (let i=0; i<ids.length; i++) {
            document.getElementById(ids[i]).style.border = '3px inset blue';
        }
    }

    async function playModelMove() {
        // let compMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
        if (chess.turn() === 'b') {
            let tokens = tokenizeFen();
            let compMove = null;
            for (let i=0; i<chess.moves().length; i++) {
                if (chess.moves()[i].includes('#')) {
                    compMove = chess.moves()[i];
                    break;
                }
            }
            if (compMove === null) {
                try {
                    let preds = await model.predict(tokens);
                    compMove = deTokenizeMoves(preds);
                }
                catch(err) {
                }
            }
            
            let move = null;
            if (compMove) {
                move = chess.move(compMove);
            }
            if (move === null) {
                if (compMove !== null) {
                    if (chess.moves({ square: compMove['from']}).length !== 0) {
                        let fromMoves = chess.moves({ square: compMove['from']});
                        compMove = fromMoves[Math.floor(Math.random()*fromMoves.length)];
                    }
                    else {
                        compMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
                    }
                }
                else {
                    compMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)]; 
                }
                move = chess.move(compMove);
            }
            else {
                console.log('Model Move')
            }
            await new Promise(r => setTimeout(r, 1000));
            move = [move['from'], move['to']];
            highlightByIds(move);
        }
    }

    async function playTurn(movePlayed) {
        if (movePlayed) {
            renderMessage();
            refresh();
            if(!chess.isGameOver()) {
                await playModelMove();
                renderMessage();
                refresh();
            }
        }
    }

    async function pushPieces(element, promoPiece=null) {
        
        let movePlayed = false;
        if (!chess.isGameOver()) {
            if (promoPiece === null) {
                movePlayed = chess.move({from: selectedPiece.id, to: element.id});
            }
            else {
                movePlayed = chess.move({from: secondBackPiece.id, to: element.id});
            }
            
            if (movePlayed !== null) {
                movePlayed = true;
            }
            await playTurn(movePlayed);
            return movePlayed;
        }
    }

    function grabPiece(e: React.MouseEvent) {
        const element: HTMLElement = e.target;
        dehighlightTiles(element);
        if (element.classList.contains('piece')) {
            if (/\W\w{2}\./.exec(element.style.backgroundImage)[0].charAt(1) === 'w') {
                if (selectedPiece !== null) {
                    selectedPiece.style.border = 'none';
                    selectedPiece = null;
                }
                highlightPossibleMoves(chess.moves({square: element.id}));
                element.style.border = '3px inset gray';
                selectedPiece = element;
            }
            else if (/\W\w{2}\./.exec(element.style.backgroundImage)[0].charAt(1) === 'b') {
                if ((selectedPiece !== null) & (/\W\w{2}\./.exec(selectedPiece.style.backgroundImage)[0].charAt(1) === 'w')) {
                    let str = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
                    let pawnColor = str[0].charAt(1);
                    let verticalAxisPawnPosition = selectedPiece.id.charAt(1);
                    let isPawn = (str[0].charAt(2) === 'p');
                    let isPrePromotionTile = (pawnColor === 'w' & verticalAxisPawnPosition === '7') | (pawnColor === 'b' & verticalAxisPawnPosition === '2');
                    if (isPrePromotionTile & isPawn) {
                        if (chess.move({from: selectedPiece.id, to: element.id, promotion: 'q'})) {
                            promotionMove = {from: selectedPiece.id, to: element.id, promotion: 'q'}
                            promotionColor = pawnColor;
                            chess.undo();
                            refresh();
                        }
                    }
                    else {
                        pushPieces(element);
                    }
                }
                selectedPiece = element;
            }
        }
        else if (element.classList.contains('tile')) {
            if (selectedPiece !== null) {
                let str = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
                let pawnColor = str[0].charAt(1);
                let isPawn = (str[0].charAt(2) === 'p');
                let verticalAxisPawnPosition = selectedPiece.id.charAt(1);
                let isPrePromotionTile = (pawnColor === 'w' & verticalAxisPawnPosition === '7') | (pawnColor === 'b' & verticalAxisPawnPosition === '2');
                if (isPrePromotionTile & isPawn) {
                    if (chess.move({from: selectedPiece.id, to: element.id, promotion: 'q'})) {
                        promotionMove = {from: selectedPiece.id, to: element.id, promotion: 'q'};
                        promotionColor = pawnColor;
                        chess.undo();
                        refresh();
                    }
                }
                else {
                    pushPieces(element);
                }
                selectedPiece.style.border = 'none';
                selectedPiece = null;
            }
            
        }
        else if (element.classList.contains('promopiece')) {
            let str = /\W\w{2}\./.exec(element.style.backgroundImage);
            let pieceName = str[0].charAt(2);
            promotionMove['promotion'] = pieceName;
            chess.move(promotionMove);
            promotionColor = null;
            // renderMessage();
            // refresh();
            // if(!chess.isGameOver()) {
            //     playModelMove();
            //     renderMessage();
            //     refresh();
            // }
            playTurn(true);
        }
    }
    
    function renderBoard() {
    
        var board = [];
        var image = null;
        board.push(<Banner message={message} isPromotion={promotionColor}/>)
        for(let i = verticalAxis.length - 1; i >= 0; i--)
        {
            for(let j = 0; j < horizontalAxis.length; j++)
            {
                let rev_i = verticalAxis.length - 1 - i;
                if (chess.board()[rev_i][j] !== null) {
                    image = "assets/pieces/" + chess.board()[rev_i][j].color + chess.board()[rev_i][j].type + ".svg";
                }
                else {
                    image = null;
                }
                const number = i + j;
                const xy = horizontalAxis[j] + verticalAxis[i];
                board.push(<Tile xy={xy} image={image} number={number}/>);
            }
            board.push(<FrameStick showChar={verticalAxis[i]} isVertical={true}/>);
        }
        for(let i = 0; i < 8; i++) {
            board.push(<FrameStick showChar={horizontalAxis[i]} isVertical={false}/>);
        }
        // console.log(chess.board())
        return (board)
    }

    return (
        <div onMouseDown={(e) => grabPiece(e)} id="board">{board}</div>
    )
}

export default Chessboard;