import '../../styles/Header.scss';
import BashIcon from '../../assets/bash-icon.svg';
import Logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { useDispatch, useSelector } from "react-redux";
import { aboutUser } from "../../thunks/userThunk.js";
import Cookies from "js-cookie";

const Header = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(aboutUser())
            .unwrap()
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    Cookies.remove("users_access_token");
                }
            });
    }, [dispatch]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const cartCount = useSelector((state) => state.user.cart.length);

    return (
        <header className='header'>
            <div className='header__container container'>
                <div className='header__container-bash'>
                    <Link to='../bash' title='Корзина'>
                        <img src={BashIcon} alt='Bash Icon' />
                        <div className='header__container-bash--counter'>{cartCount}</div>
                    </Link>
                </div>

                <div className='header__container-logo'>
                    <Link to='../' title='Home'>
                        <img src={Logo} alt='Logo' />
                    </Link>
                </div>

                <div className='header__container-info'>
                    <div className='header__container-user' title='User Nickname'>
                        {currentUser ? currentUser.username : "Guest"}
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