import './console.css';

interface Props {
    pgn: string;
}

var text = "Copy";

function copy(e, pgn) {
    if (e.target.classList.contains('copy-button')) {
        navigator.clipboard.writeText(pgn);
    }
}

function Console({ pgn }:Props) {
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