import search from "../assets/icon-search.png"
import location from "../assets/icon-location.png"
import cart from "../assets/icon-cart.png"
import account from "../assets/icon-account.png"
import logo from "../assets/logo.svg"
import "./styles/header.css"

const Header = () => {
    return (
        <>
            <header>
                <div className="headerWrapper">
                    <div className="logoMenuContainer">
                        <div className="logoContainer">
                        </div>
                        <div className="menuContainer">
                            <a href="">Home</a>
                            <select name="services" id="services">
                                <option value="">Services</option>
                                <option value="">Cleaning & Hygiene</option>
                                <option value="">AC Services</option>
                                <option value="">Home Repairs</option>
                                <option value="">Painting & Waterproofing</option>
                                <option value="">Pest Control</option>
                                <option value="">Packers & Movers</option>
                                <option value="">Garden Services</option>
                            </select>
                            <a href="">Become a partner</a>
                        </div>
                    </div>
                    <div className="userActionContainer">
                        <div className="searchContainer">
                            <input type="text" id="searchInput" placeholder='Search' />
                            <button><img src={search} alt="search" /></button>
                        </div>
                        <div className="locationContainer">
                            <button><img src={location} alt="location" /></button>
                            <p>Thillai nagar, Trichy</p>
                        </div>
                        <div className="cartContainer">
                            <button><img src={cart} alt="cart" /></button>
                        </div>
                        <div className="accountContainer">
                            <button><img src={account} alt="account" /></button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header