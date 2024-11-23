import '../../styles/Login.scss'

const Login = () => {
    return (
        <div className="login">
            <div className="login__container container">
                <h1 className="login__title">VAUDIENCE</h1>

                <form className="login__form">
                    <input className='login__form-input' type='text' placeholder='nickname'/>

                    <input className='login__form-input' type='password' placeholder='password'/>

                    <button type='submit' className='btn-reset login__form-btn'>enter</button>
                </form>
            </div>
        </div>
    )
}

export default Login