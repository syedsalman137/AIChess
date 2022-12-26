import './main.css';

function MainPage() {
    return (
    <div className='main'>
        <div className='link-box'>
            <div className='text-cont'>
                <div className='title'>AIChess</div>
                <div className='info'>A web based chess engine</div>
            </div>
            <div style={{backgroundImage: `url(${"assets/images/hq-chess-pieces-transparent-hd-photo-29.png"})`}}  className='bgimage'></div>
        </div>
        <a className='play-link' href='/arena'><button className="play-button" role="button"><span className="text">Play the AI</span></button></a>
    </div>
    )
}

export default MainPage;