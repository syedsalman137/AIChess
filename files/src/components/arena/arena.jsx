import React, { useState } from 'react';
import { Chess } from 'chess.js';
import Tile from '../tiles/tile';
import Banner from '../banner/banner';
import FrameStick from '../frame/frame';
import './arena.css';
import * as constants from './constants';
import Console from '../console/console';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];


var chess = new Chess();
var selectedPiece = null;
var message = null;
var promotionColor = null;
var secondBackPiece = null;
var promotionMove = null;


function Arena() {
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

    function getPieceValue(posObj, x, y) {
        let posVal = constants.evalRepo[posObj.color][posObj.type][x][y];
        return posVal;
    }

    async function minimaxRoot(depth, isMaximisingPlayer) {
        let newGameMoves = chess.moves();
        let bestMove = -9999;
        let bestMoveFound;
    
        for(let i = 0; i < newGameMoves.length; i++) {
            let newGameMove = newGameMoves[i]
            chess.move(newGameMove);
            let value = await minimax(depth - 1, -100000, 100000, !isMaximisingPlayer);
            chess.undo();
            if (value === null) {
                break;
            }
            if(value >= bestMove) {
                bestMove = value;
                bestMoveFound = newGameMove;
            }
        }
        return bestMoveFound;
    }
    
    async function minimax(depth, alpha, beta, isMaximisingPlayer) {
        if (depth === 0) {
            return -evaluateBoard(chess.board());
        }
    
        let newGameMoves = chess.moves();
        if (newGameMoves !== []) {
            let bestMove = null;
            if (isMaximisingPlayer) {
                bestMove = -99999;
                for (let i = 0; i < newGameMoves.length; i++) {
                    chess.move(newGameMoves[i]);
                    bestMove = Math.max(bestMove, await minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
                    chess.undo();
                    alpha = Math.max(alpha, bestMove);
                    if (beta <= alpha) {
                        return bestMove;
                    }
                }
                return bestMove;
            } else {
                bestMove = 99999;
                for (let i = 0; i < newGameMoves.length; i++) {
                    chess.move(newGameMoves[i]);
                    bestMove = Math.min(bestMove, await minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
                    chess.undo();
                    beta = Math.min(beta, bestMove);
                    if (beta <= alpha) {
                        return bestMove;
                    }
                }
                return bestMove;
            }
        }
        
        else {
            return null;
        }
    }

    async function getBestMove () {    
        let depth = 3;
    
        let bestMove = await minimaxRoot(depth, chess, true);

        if (bestMove !==  undefined) {
            chess.move(bestMove);
            if (chess.isThreefoldRepetition()) {
                chess.undo();
                bestMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
                console.log("Random Move 1")
            }
            else {
                let isThreefoldMove = false;
                for ( let i = 0; i < chess.moves().length; i++) {
                    chess.move(chess.moves()[i]);
                    if (chess.isThreefoldRepetition()) {
                        chess.undo();
                        chess.undo();
                        isThreefoldMove = true;
                        console.log("Random Move 2")
                        bestMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
                        break;
                    }
                    else {
                        chess.undo();
                    }
                }
                if (!isThreefoldMove) {
                    chess.undo();
                }
            }
        }

        return bestMove;
    };

    function evaluateBoard(board) {
        let totalEvaluation = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
            }
        }
        return totalEvaluation;
    }

    function getPieceValue(piece, x, y) {
        if (piece === null) {
            return 0;
        }
        function getAbsoluteValue(piece, isWhite, x ,y) {
            if (piece.type === 'p') {
                return constants.P + ( isWhite ? constants.pawnEvalWhite[y][x] : constants.pawnEvalBlack[y][x] );
            }
            else if (piece.type === 'r') {
                return constants.R + ( isWhite ? constants.rookEvalWhite[y][x] : constants.rookEvalBlack[y][x] );
            }
            else if (piece.type === 'n') {
                return constants.N + constants.knightEvalNeutral[y][x];
            }
            else if (piece.type === 'b') {
                return constants.B + ( isWhite ? constants.bishopEvalWhite[y][x] : constants.bishopEvalBlack[y][x] );
            }
            else if (piece.type === 'q') {
                return constants.Q + constants.queenEvalNeutral[y][x];
            }
            else if (piece.type === 'k') {
                return constants.K + ( isWhite ? constants.kingEvalWhite[y][x] : constants.kingEvalBlack[y][x] );
            }
        }
    
        let absoluteValue = getAbsoluteValue(piece, (piece.color === 'w'), x ,y);
        return (piece.color === 'w')? absoluteValue : -absoluteValue;
    }

    async function playModelMove() {
        if (chess.turn() === 'b') {
            // let compMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
            let compMove = await getBestMove();
            if (compMove === undefined) {
                compMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
            }
            let move = chess.move(compMove);
            // if (move === null) {
            //     compMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
            //     move = chess.move(move);
            // }
            try {
                move = [move['from'], move['to']];
                highlightByIds(move);
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    async function playTurn(movePlayed) {
        if (movePlayed) {
            renderMessage();
            refresh();
            await new Promise(r => setTimeout(r, 1000));

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
        if (chess.isGameOver()) {
            let endStatement = "You Lose!";
            if (chess.isCheckmate()) {
                if (chess.turn() !== 'w') {
                    endStatement = "You Win!";
                }
            }
            else {
                endStatement = message;
            }
            board.push(<div className="board game-over"><h2>{endStatement}</h2><a className="redirect-link" href="/">Main page</a></div>)
        }

        return (board)
    }
    // let gameView = <div id="GameView"><Chessboard /></div>;
    let gameConsole = <div id="GameConsole"><Console pgn= { chess.pgn() }/></div>
  
    return (
        <div id="Arena">
        <div id='GameView'>
            <div onMouseDown={(e) => grabPiece(e)} id="board">{board}</div>
        </div>
        {gameConsole}
        </div>
    )
}

export default Arena;