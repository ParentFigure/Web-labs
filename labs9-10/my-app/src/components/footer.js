import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="footer-description">
                    <p className="logo">HeavyBrand</p>
                    <p className="footer-txt">Live through music!</p>
                </div>
                <div className="footer-icons">
                    <FaFacebookF className="icons"/>
                    <FaInstagram className="icons"/>
                    <FaLinkedinIn className="icons"/>
                    <FaTwitter className="icons"/>
                </div>
            </div>
            <hr className="footer-hr"/>
            <p className="txt-p">©HeavyBrand all rights reserved bla bla</p>
        </footer>
    )
}

export default Footer;