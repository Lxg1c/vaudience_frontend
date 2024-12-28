import '../../styles/Registration.scss';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createUser } from "../../thunks/userThunk.js";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [values, setValues] = useState({
        email: "",
        nickname: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isAllFieldsFilled = Object.values(values).some(val => val);

        if (!isAllFieldsFilled) {
            return;
        }

        if (values.password.length < 8) {
            console.log('Пароль должен быть не менее 8 символов');
            return;
        }

        dispatch(createUser({
            nickname: values.nickname,
            password: values.password,
            email: values.email,
        }));

        navigate('../login')

    };

    return (
        <div className="registration">
            <div className="registration__container container">
                <h1 className="registration__title">VAUDIENCE</h1>

                <form className="registration__form" onSubmit={handleSubmit}>
                    <input
                        className='registration__form-input'
                        name="nickname"
                        required={true}
                        onChange={handleChange}
                        type='text'
                        placeholder='nickname'
                    />

                    <input
                        className='registration__form-input'
                        name="password"
                        required={true}
                        onChange={handleChange}
                        type='password'
                        placeholder='password'
                    />

                    <input
                        className='registration__form-input'
                        name="email"
                        required={true}
                        onChange={handleChange}
                        type='email'
                        placeholder='e-mail'
                    />

                    <button type='submit' className='btn-reset registration__form-btn'>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;