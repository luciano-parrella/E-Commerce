import React from 'react';
import CartWidget from '../CartWidget';
import './styles.css';

const NavBar = (props) => {
    return (
    <div className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#news">News</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#about">About</a>
            </li>
            <CartWidget/>
        </ul>
    </div>
    );
};

export default NavBar;