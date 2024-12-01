import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import Button from "./Button";

const Navigation = ({ onSearch }) => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    const handleSignOut = () => {
        localStorage.removeItem("userEmail"); // Очищення LocalStorage
        window.location.href = "/login"; // Перенаправлення на сторінку входу
    };

    return (
        <nav className="navigation">
            <h1 className="nav-title">HeavyBrand</h1>
            <ul>
                <li>
                    <Link className="link" to="/">Home</Link>
                </li>
                <li>
                    <Link className="link" to="/catalog">Catalog</Link>
                </li>
                <li>
                <Link className="link" to="/cart">Cart</Link>
                </li>
            </ul>
            {location.pathname === '/' && (
            <div className="search-container">
                <Button className="btn-sign-out" text="Sign me out" onClick={handleSignOut}/>
            </div>
            )}
            {location.pathname === '/catalog' && (
            <div className="search-container">
                <input className="nav-input" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <GoSearch className="icons-search" onClick={handleSearchClick}/>
            </div>
)}
        </nav>
    )
}

export default Navigation;