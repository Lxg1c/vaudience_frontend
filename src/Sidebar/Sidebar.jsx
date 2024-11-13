import '../styles/Sidebar.scss';
import CloseIcon from '../assets/close-icon.svg';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
            <div className='sidebar__close'>
                <button onClick={toggleSidebar} className='sidebar__close-button' role="button" aria-label="Close sidebar">
                    <img src={CloseIcon} alt='Close' />
                </button>
            </div>
            <ul className='sidebar__list' role="list">
                <li className='sidebar__list-item' role="listitem">Liked</li>
                <li className='sidebar__list-item' role="listitem">Sales</li>
                <li className='sidebar__list-item' role="listitem">About</li>
                <li className='sidebar__list-item' role="listitem">Support</li>
            </ul>
        </div>
    );
};

export default Sidebar;