import { Link } from 'react-router-dom';
import './styles/SideNav.css';
import logo from '../assets/logo_full.svg';

const SideNav = ({ navs }) => {
    return (
        <div className="sideNavWrapper">
            <div className="logoContainer">
                <img src={logo} alt="vyess" />
            </div>
            <ul className="navList">
                {navs.map((nav, index) => (
                    <li key={index} className="navItem">
                        {/* We use Link instead of <a> */}
                        <Link to={nav.path} className="navLink">
                            {nav.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SideNav;