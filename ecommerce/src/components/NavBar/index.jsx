import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget';
import './styles.css';

const NavBar = (props) => {
    return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/category/proteinas">Proteínas</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/category/aminoacidos">Aminoácidos</Link>
            </li>
            <CartWidget/>
        </ul>
    </div>
    );
};

export default NavBar;