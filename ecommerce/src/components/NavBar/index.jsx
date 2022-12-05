import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '../../contexts/Theme';
import CartWidget from '../CartWidget';
import './styles.css';

const NavBar = () => {

    const { themeColor, setThemeColor } = useContext(Theme)

    const handleChange = (event) => {
        setThemeColor(event.target.value)
    }

    return (
        <div>
            <ul className={themeColor === "light" ? "ul-container" : "ul-container-dark"}>
                <li className="li-list">
                    <Link to="/">Home</Link>
                </li>
                <li className="li-list">
                    <Link to="/category/proteinas">Proteínas</Link>
                </li>
                <li className="li-list">
                    <Link to="/category/aminoacidos">Aminoácidos</Link>
                </li>
                <div className="select-container">
                    <select value={themeColor} onChange={handleChange} className = {themeColor === "dark" ? "theme-select-dark" : "theme-select"}>
                        <option value={"light"}>Light</option>
                        <option value={"dark"}>Dark</option>
                    </select>
                    <CartWidget />
                </div>
            </ul>
        </div>
    );
};

export default NavBar;