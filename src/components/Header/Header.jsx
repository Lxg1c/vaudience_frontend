import '../../scss/Header.scss';
import BashIcon from '../../assets/bash-icon.svg';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { useDispatch, useSelector } from "react-redux";
import { aboutUser } from "../../thunks/userThunk.js";

const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            dispatch(aboutUser(accessToken))
                .unwrap()
                .catch((error) => {
                    console.error("Ошибка при получении данных пользователя:", error);
                });
        }
    }, [dispatch]);

    const { currentUser } = useSelector(state => state.user);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const cartCount = useSelector((state) => state.user.cart?.length || 0);

    const toggleBurgerMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className='header'>
            <div className='header__container container'>
                <div className='header__container-bash'>
                    <Link to='/bash' title='Корзина'>
                        <img src={BashIcon} alt='Bash Icon' />
                        <div className='header__container-bash--counter'>{cartCount}</div>
                    </Link>
                </div>

                <div className='header__container-logo'>
                    <Link to='/' title='Home'>
                        <img src={Logo} alt='Logo' />
                    </Link>
                </div>

                <div className='header__container-info'>
                    <div className='header__container-user'>
                        {currentUser && Object.keys(currentUser).length > 0 ? (
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    {currentUser.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                    <li><a className="dropdown-item active" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Exit</a></li>
                                </ul>
                            </div>
                        ) : (
                            <Link to='/login' title='Login'>
                                <button className='btn-reset header__login-btn'>Sign Up</button>
                            </Link>
                        )}
                    </div>

                    <div onClick={toggleBurgerMenu} className='header__container-burger' aria-label='Menu'>
                        <span className='burger-line'></span>
                        <span className='burger-line'></span>
                        <span className='burger-line'></span>
                    </div>
                </div>
            </div>
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleBurgerMenu} />
        </header>
    );
}

export default Header;