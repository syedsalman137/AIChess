import React, { useState } from 'react';
import { Chess } from 'chess.js';
import Tile from '../tiles/tile';
import Banner from '../banner/banner';
import FrameStick from '../frame/frame';
import './board.css';

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
var chess = new Chess();
var selectedPiece = null;
var gameOver = false;
var message = null;
var promotionColor = null;
var secondBackPiece = null;

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function Chessboard() {
    const [board, setBoard] = useState(new renderBoard());
    // console.log(chess.board());
    // for(let i = verticalAxis.length - 1; i >= 0; i--)
    // {
    //     for(let j = 0; j < horizontalAxis.length; j++)
    //     {
    //         let rev_i = verticalAxis.length - 1 - i;
    //         if (chess.board()[rev_i][j] !== null) {
    //             var image = "assets/pieces/" + chess.board()[rev_i][j].color + chess.board()[rev_i][j].type + ".svg";
    //         }
    //         else {
    //             var image = null;
    //         }
    //         const number = i + j;
    //         const xy = horizontalAxis[j] + verticalAxis[i];
    //         board.push(<Tile xy={xy} image={image} number={number}/>);

    //     }   
    // }
    function refresh() {
        setBoard(new renderBoard());
    }

    // function isValidMove(move: string, element: HTMLElement) {
    //     let str = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
    //     let pieceName = str[0].charAt(2);
    //     if (pieceName)
    // }

    function highlightPossibleMoves(possibleMoves) {
        for (let i = 0; i < possibleMoves.length; i++) {
            let pos = /\w\d/.exec(possibleMoves[i]);
            if (pos !== null) {
                document.getElementById(pos).style.border = '3px inset blue';
            }
            else if(possibleMoves[i] === 'O-O' | possibleMoves[i] === 'O-O-O') {
                let shuffleProfile = chess.move(possibleMoves[i]);
                console.log(shuffleProfile)
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

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    function demo(time) {
        for (let i=0; i < 1000000; i++) {
            let j = i*i;
            let k = i + i;
            let l = j*k;
        }
        // await sleep(time*10);
    }

    function playModelMove() {
        var compMove = chess.moves()[Math.floor(Math.random()*chess.moves().length)];
        if (chess.turn() == 'b') {
            demo(10);
            
            chess.move(compMove);
        }
    }

    function pushPieces(move: string) {
        let check_move = move + '+';
        let check_mate_move = move + '#';
        let isPromotionMove = (move.slice(-2, -1) === "=");
        let isPromotedMove = (secondBackPiece !== null);
        // console.log(move.slice(-2, -1));
        // if (isPromotionMove) {
        //     if (selectedPiece.id.charAt(1) === '7') {
        //         promotionColor = 'w';
        //     }
        //     else {
        //         promotionColor = 'b';
        //     }
        //     refresh();
        //
        if (!isPromotedMove) {
            var allowedMovesForPiece = chess.moves({ square: selectedPiece.id });
        }
        else if (isPromotedMove){
            var allowedMovesForPiece = chess.moves({ square: secondBackPiece.id });
        }
        
        let movePlayed = false;
        if (!chess.isGameOver()) { 
            console.log(check_move)
            if (allowedMovesForPiece.includes(move) | allowedMovesForPiece.includes(move.slice(0, 1) + move.slice(2)) | allowedMovesForPiece.includes(move.slice(0, 1) + move.slice(3)) | isPromotedMove) {
                chess.move(move);
                movePlayed = true;
                console.log(2)
                console.log(move)
            }
            else if (allowedMovesForPiece.includes(check_move) | allowedMovesForPiece.includes(check_move.slice(0, 1) + check_move.slice(2)) | allowedMovesForPiece.includes(check_move.slice(0, 1) + check_move.slice(3)) | isPromotedMove) {
                chess.move(check_move);
                movePlayed = true;
                console.log(3)
                console.log(check_move)
                console.log(allowedMovesForPiece)
                console.log(chess.moves())
            }
            else if (allowedMovesForPiece.includes(check_mate_move) | allowedMovesForPiece.includes(check_mate_move.slice(0, 1) + check_mate_move.slice(2)) | allowedMovesForPiece.includes(check_mate_move.slice(0, 1) + check_mate_move.slice(3)) | isPromotedMove) {
                chess.move(check_mate_move);
                movePlayed = true;
                console.log(4)
            }
            if ((isPromotionMove & movePlayed) & (!isPromotedMove)) {
                console.log(1)
                chess.undo()
                // console.log(chess.pgn())
                if (selectedPiece.id.charAt(1) === '7') {
                    promotionColor = 'w';
                }
                else {
                    promotionColor = 'b';
                }
                secondBackPiece = selectedPiece;
                refresh();
            }
            else if (movePlayed) {
                renderMessage();
                if (promotionColor !== null) {
                    promotionColor = null;
                }
                if (secondBackPiece !== null) {
                    secondBackPiece = null;
                    console.log(5)
                }
                refresh();
                playModelMove();
                refresh();
            }
        }
        
        // console.log(chess.moves())
    }
    
    function tryKillPiece(element) {
        if (selectedPiece !== null) {
            // console.log(selectedPiece.style.backgroundImage)
            selectedPiece.style.border = 'none';
            let str = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
            let pieceName = str[0].charAt(2);
            let pieceColor = str[0].charAt(1);
            let currentStr = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
            let currentPieceColor = currentStr[0].charAt(1);
            let currentPieceName = currentStr[0].charAt(2);

            if (pieceName !== 'p') {
                var move = [pieceName.toUpperCase() + selectedPiece.id.charAt(0) + 'x' + element.id];
                move.push(pieceName.toUpperCase() + selectedPiece.id.charAt(1) + 'x' + element.id);
                move.push(pieceName.toUpperCase() + selectedPiece.id + 'x' + element.id);
                move.push(pieceName.toUpperCase() + 'x' + element.id);
            }
            else {
                let pawnColor = str[0].charAt(1);
                // console.log(pawnColor)
                let verticalAxisPawnPosition = selectedPiece.id.charAt(1);
                // console.log(verticalAxisPawnPosition)
                let isPrePromotionTile = (pawnColor === 'w' & verticalAxisPawnPosition === '7') | (pawnColor === 'b' & verticalAxisPawnPosition === '2');
                if (isPrePromotionTile) {
                    // console.log("HAHA")
                    var move = selectedPiece.id.charAt(0) + 'x' + element.id + "=" + "Q";
                    // selectedPiece = element;
                }
                else {
                    var move = selectedPiece.id.charAt(0) + 'x' + element.id;
                }
            }

            if (Array.isArray(move)) {
                move.forEach(pushPieces);
            }
            else {
                pushPieces(move);
            }
            selectedPiece.style.border = 'none';
        }
        else {
            console.log("Piece moves:")
            // console.log(chess.moves({square: element.id}))
        }
    }

    function grabPiece(e: React.MouseEvent) {
        // console.log(chess)
        const element: HTMLElement = e.target;
        dehighlightTiles(element);
        if (element.classList.contains('piece')) {
            if (/\W\w{2}\./.exec(element.style.backgroundImage)[0].charAt(1) == 'w') {
                // if (selectedPiece !== null) {
                //     // console.log(selectedPiece.style.backgroundImage)
                //     selectedPiece.style.border = 'none';
                //     let str = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
                //     let pieceName = str[0].charAt(2);
                //     let pieceColor = str[0].charAt(1);
                //     let currentStr = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
                //     let currentPieceColor = currentStr[0].charAt(1);
                //     let currentPieceName = currentStr[0].charAt(2);

                //     if (pieceName !== 'p') {
                //         var move = [pieceName.toUpperCase() + selectedPiece.id.charAt(0) + 'x' + element.id];
                //         move.push(pieceName.toUpperCase() + selectedPiece.id.charAt(1) + 'x' + element.id);
                //         move.push(pieceName.toUpperCase() + selectedPiece.id + 'x' + element.id);
                //         move.push(pieceName.toUpperCase() + 'x' + element.id);
                //     }
                //     else {
                //         let pawnColor = str[0].charAt(1);
                //         // console.log(pawnColor)
                //         let verticalAxisPawnPosition = selectedPiece.id.charAt(1);
                //         // console.log(verticalAxisPawnPosition)
                //         let isPrePromotionTile = (pawnColor === 'w' & verticalAxisPawnPosition === '7') | (pawnColor === 'b' & verticalAxisPawnPosition === '2');
                //         if (isPrePromotionTile) {
                //             // console.log("HAHA")
                //             var move = selectedPiece.id.charAt(0) + 'x' + element.id + "=" + "Q";
                //             // selectedPiece = element;
                //         }
                //         else {
                //             var move = selectedPiece.id.charAt(0) + 'x' + element.id;
                //         }
                //     }

                //     if (Array.isArray(move)) {
                //         move.forEach(pushPieces);
                //     }
                //     else {
                //         pushPieces(move);
                //     }
                //     selectedPiece.style.border = 'none';
                // }
                // else {
                //     console.log("Piece moves:")
                //     console.log(chess.moves({square: element.id}))
                // }
                tryKillPiece(element);
                highlightPossibleMoves(chess.moves({square: element.id}));
                // console.log(element.classList);
                // element.style.borderWidth = '5px';
                element.style.border = '3px inset gray';
                console.log(`${element.style.width}`)
                // element.style.borderBottomWidth = '5px'
                // element.style.borderBlockColor = 'blue';
                selectedPiece = element;
            }
            else if (/\W\w{2}\./.exec(element.style.backgroundImage)[0].charAt(1) == 'b') {
                tryKillPiece(element);
            }
            //TO HERE
        }
        else {
            if (selectedPiece !== null) {
                if (element.classList.contains('tile')) {
                    let str = /\W\w{2}\./.exec(selectedPiece.style.backgroundImage);
                    let pieceName = str[0].charAt(2);
                    if (pieceName !== 'p') {
                        var move = [pieceName.toUpperCase() + selectedPiece.id.charAt(0) + element.id];
                        move.push(pieceName.toUpperCase() + selectedPiece.id.charAt(1) + element.id);
                        move.push(pieceName.toUpperCase() + selectedPiece.id + element.id);
                        move.push(pieceName.toUpperCase() + element.id);
                        if (pieceName === 'k') {
                            let elementTileHorzIndex = getKeyByValue(horizontalAxis, element.id.charAt(0));
                            let selectedTileHorzIndex = getKeyByValue(horizontalAxis, selectedPiece.id.charAt(0))
                            let isBlack = (str[0].charAt(1) === 'b');
                            let isWhite = (str[0].charAt(1) === 'w');
                            let steps = elementTileHorzIndex - selectedTileHorzIndex;
                            let isTwoSteps = (Math.abs(steps) === 2);
                            if ((isBlack | isWhite) & isTwoSteps) {
                                move = [];
                                if (steps > 0) {
                                    move.push('O-O');
                                }
                                else {
                                    move.push('O-O-O');
                                }
                            }  
                        }
                    }
                    else {
                        let pawnColor = str[0].charAt(1);
                        let verticalAxisPawnPosition = selectedPiece.id.charAt(1);
                        let isPrePromotionTile = (pawnColor === 'w' & verticalAxisPawnPosition === '7') | (pawnColor === 'b' & verticalAxisPawnPosition === '2');
                        if (isPrePromotionTile) {
                            var move = element.id + "=" + "Q";
                            // selectedPiece = element;
                        }
                        else {
                            var move = [element.id];
                            move.push(selectedPiece.id.charAt(0) + 'x' + element.id);
                        }
                    }
                    // console.log(chess.moves())
                    if (Array.isArray(move)) {
                        move.forEach(pushPieces);
                    }
                    else {
                        pushPieces(move);
                    }
                }
                else if (element.classList.contains('promopiece')) {
                    let str = /\W\w{2}\./.exec(element.style.backgroundImage);
                    let pieceName = str[0].charAt(2);
                    // var move = [selectedPiece.id + "=" + pieceName.toUpperCase()];
                    var move = [];
                    move.push(secondBackPiece.id.charAt(0) + 'x' + selectedPiece.id + "=" + pieceName.toUpperCase());
                    move.push(secondBackPiece.id.charAt(0) + 'x' + selectedPiece.id + "=" + pieceName.toUpperCase() + '+');
                    move.push(secondBackPiece.id.charAt(0) + 'x' + selectedPiece.id + "=" + pieceName.toUpperCase() + '#');
                    console.log(move)
                    for(let i = 0; i < move.length; i++) {
                        if (chess.moves().includes(move[i])) {
                            pushPieces(move[i]);
                        }
                    }
                }
                selectedPiece.style.border = 'none';
                selectedPiece = null;
            }
            else if (element.classList.contains('promopiece')) {
                let str = /\W\w{2}\./.exec(element.style.backgroundImage);
                let pieceName = str[0].charAt(2);
                let positionOfPromotion = getKeyByValue(horizontalAxis, secondBackPiece.id.charAt(0));
                let position = null;
                if (secondBackPiece.id.charAt(1) === '7') {
                    position = horizontalAxis[positionOfPromotion] + '8';
                }
                else if (secondBackPiece.id.charAt(1) === '2') {
                    position = horizontalAxis[positionOfPromotion] + '1';
                }
                else {
                    console.log("SEE THIS: " + secondBackPiece.id)
                }
                var move = [position + "=" + pieceName.toUpperCase()];
                // move.push(secondBackPiece.id.charAt(0) + 'x' + position + "=" + pieceName.toUpperCase());
                move.push(position + "=" + pieceName.toUpperCase() + '+');
                move.push(position + "=" + pieceName.toUpperCase() + '#');
                console.log(move)
                for(let i = 0; i < move.length; i++) {
                    if (chess.moves().includes(move[i])) {
                        pushPieces(move[i]);
                    }
                }
            }
        }
    }
    
    function renderBoard() {
    
        var board = [];
        board.push(<Banner message={message} isPromotion={promotionColor}/>)
        for(let i = verticalAxis.length - 1; i >= 0; i--)
        {
            for(let j = 0; j < horizontalAxis.length; j++)
            {
                let rev_i = verticalAxis.length - 1 - i;
                if (chess.board()[rev_i][j] !== null) {
                    var image = "assets/pieces/" + chess.board()[rev_i][j].color + chess.board()[rev_i][j].type + ".svg";
                }
                else {
                    var image = null;
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