import './form.css';

function PlayForm() {
    return (
        <div className='play-form'>
            <form className='inputs'>
                Level:
                <input type='radio' value='1' name="level"/> 1
                <input type='radio' value='2' name="level"/> 2
                <input type='radio' value='3' name="level"/> 3
            </form>
        </div>
    )
}

export default PlayForm;