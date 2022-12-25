import './frame.css';

interface Props {
    showChar: string;
    isVertical: boolean;
}

function FrameStick ({showChar, isVertical}: Props) {
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