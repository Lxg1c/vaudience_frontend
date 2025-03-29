import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { aboutUser } from '../../enteties/user/api.js';
import { Dropdown, Container, Nav, Navbar } from 'react-bootstrap';
import { logoutUser } from "../../app/store/slices/userSlice.js";
import UserIcon from '../../assets/user.svg';
import Logo from '../../assets/logo.svg';
import Bookmark from '../../assets/bookmark.svg';
import Bash from '../../assets/bash.svg';
import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
        if (accessToken) {
            dispatch(aboutUser());
        }
    }, [dispatch]);

    const { currentUser } = useSelector(state => state.user);
    const cartCount = useSelector(state => state.user.cart?.length || 0);
    const bookmarkCount = useSelector(state => state.user.favorite?.length || 0);

    const loginOut = () => {
        dispatch(logoutUser())
    };

    return (
        <header className='header'>
            <div className='header__container container'>
                {/* Левая часть: меню */}
                <div className='header__menu'>
                    <Navbar bg="dark" data-bs-theme="dark">
                        <Container>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/#news">НОВИНКИ</Nav.Link>
                                <Nav.Link as={Link} to="/#news">ОДЕЖДА</Nav.Link>
                                <Nav.Link as={Link} to="/#news">АКСЕССУАРЫ</Nav.Link>
                                <Nav.Link as={Link} to="/about">О НАС</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>

                {/* Центральная часть: логотип */}
                <div className='header__logo'>
                    <Link to='/' title='Home'>
                        <img src={Logo} alt='logo' />
                    </Link>
                </div>

                {/* Правая часть: блок пользователя */}
                <div className='header__user'>
                    {/* Пользователь */}
                    {currentUser && Object.keys(currentUser).length > 0 ? (
                        <Dropdown>
                            <Dropdown.Toggle
                                id="dropdown-button-dark-example2"
                                variant="secondary"
                                title="Пользователь"
                                data-bs-theme="dark">
                                <img src={UserIcon} alt='user' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Профиль</Dropdown.Item>
                                <Dropdown.Item href="#/action-2" onClick={loginOut}>Выйти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link to='/login' title='Auth'>
                            <button className='btn-reset header__user-btn'>
                                <img src={UserIcon} className='header__user-icon' alt='User' />
                            </button>
                        </Link>
                    )}

                    {/* Закладки */}
                    <div className='header__bookmark' title='Закладки'>
                        <Link to='/bookmark'>
                            <img src={Bookmark} alt='bookmark btn' />
                            <div className='header__bookmark-counter btn'>{bookmarkCount}</div>
                        </Link>
                    </div>

                    {/* Корзина */}
                    <div className='header__bash' title='Корзина'>
                        <Link to='/cart' title='Корзина'>
                            <img src={Bash} alt='Bash Icon' />
                            <div className='header__bash-counter btn'>{cartCount}</div>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;