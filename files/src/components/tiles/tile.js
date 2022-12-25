import './tile.css'

interface Props {
    xy: string;
    image: string;
    number: number;
}

function Tile({xy, image, number}:Props) {
    let is_black = (number%2 === 0);
    if (is_black) {
        if (image) {
            return (<div id={xy} className="tile black-tile">
                <div id={xy} style={{backgroundImage: `url(${image})`}} className="piece"></div>
                </div>)
        }
        else {
            return (<div id={xy} className="tile black-tile"></div>)  
        }
    }
    else {
        if (image) {
            return (<div id={xy} className="tile white-tile">
                <div id={xy} style={{backgroundImage: `url(${image})`}} className="piece"></div>
                </div>)
        }
        else {
            return (<div id={xy} className="tile white-tile"></div>)
        }
    }
}

export default Tile;