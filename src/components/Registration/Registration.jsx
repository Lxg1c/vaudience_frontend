import '../../styles/Registration.scss'
import { useDispatch} from "react-redux";
import { useState} from "react";
import {createUser} from "../../thunks/userThunk.js";


const Registration = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length < 8) {
            console.log('Password is less than 8 characters');
            return
        }
        dispatch(createUser({ username, password, email }));
    };

    return (
        <div className="registration">
            <div className="registration__container container">
                <h1 className="registration__title">VAUDIENCE</h1>

                <form className="registration__form" onSubmit={handleSubmit}>
                    <input className='registration__form-input'
                           required={true}
                           onChange={e => setUsername(e.target.value)} type='text'
                           placeholder='nickname'/>

                    <input className='registration__form-input'
                           required={true}
                           onChange={e => setPassword(e.target.value)} type='password'
                           placeholder='password'/>

                    <input className='registration__form-input'
                           required={true}
                           onChange={e => setEmail(e.target.value)}
                           type='e-mail' placeholder='e-mail'/>

                    <button type='submit' className='btn-reset registration__form-btn'>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Registration