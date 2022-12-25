import './banner.css'

interface Props {
    message: string | null;
    isPromotion: string | null;
}

const blackPieces = ["assets/pieces/bq.svg", "assets/pieces/br.svg", "assets/pieces/bn.svg", "assets/pieces/bb.svg"];
const whitePieces = ["assets/pieces/wq.svg", "assets/pieces/wr.svg", "assets/pieces/wn.svg", "assets/pieces/wb.svg"];


function Banner({message, isPromotion}:Props) {
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