import '../../scss/Header.scss';
import Bash from '../../assets/bash.svg';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { aboutUser } from "../../thunks/userThunk.js";
import { Dropdown, Container, Nav, Navbar } from 'react-bootstrap';
import UserIcon from '../../assets/user.svg';
import Logo from '../../assets/logo.svg';
import Bookmark from '../../assets/bookmark.svg';

const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            dispatch(aboutUser())
        }
    }, [dispatch]);

    const { currentUser } = useSelector(state => state.user);
    const cartCount = useSelector((state) => state.user.cart?.length || 0);

    const loginOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.reload();
    }

    return (
        <header className='header'>
            <div className='header__container container'>
                {/* Левая часть: меню */}
                <div className='header__menu'>
                    <Navbar bg="dark" data-bs-theme="dark">
                        <Container>
                            <Nav className="me-auto">
                                <Nav.Link href="#home">НОВИНКИ</Nav.Link>
                                <Nav.Link href="#features">ОДЕЖДА</Nav.Link>
                                <Nav.Link href="#pricing">АКСЕССУАРЫ</Nav.Link>
                                <Nav.Link href="#pricing">О НАС</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>

                {/* Центральная часть: логотип */}
                <div className='header__logo'>
                    <Link to='/' title='Home'>
                        <img src={Logo} alt='logo'/>
                    </Link>
                </div>

                {/* Правая часть: блок пользователя */}
                <div className='header__user'>
                    {/* Пользователь */}
                    {currentUser && Object.keys(currentUser).length > 0 ? (
                        <Dropdown>
                            <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                                title="Dark dropdown"
                                data-bs-theme="dark">
                                <img src={UserIcon} className='header__user-icon' alt='User'/>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={loginOut}>Exit</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link to='/login' title='Login'>
                            <button className='btn-reset header__user-btn'>
                                <img src={UserIcon} className='header__user-icon' alt='User'/>
                            </button>
                        </Link>
                    )}

                    {/* Закладки */}
                    <div className='header__bookmark'>
                        <Link to='/bookmark'>
                            <img src={Bookmark} alt='bookmark'/>
                        </Link>
                    </div>

                    {/* Корзина */}
                    <div className='header__bash'>
                        <Link to='/bash' title='Корзина'>
                            <img src={Bash} alt='Bash Icon'/>
                            <div className='header__bash-counter'>{cartCount}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;