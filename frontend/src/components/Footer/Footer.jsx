import React from 'react';
import './Footer.css';
import {assets} from '../../assets/assets';
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-contents'>
            <div className='footer-contents-left'>
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quo in cum maiores eum reiciendis expedita voluptas atque iste laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, repellat minus magnam nam reprehenderit eos sunt ducimus at animi nostrum voluptates eius consequatur aperiam iusto nihil. Quam perferendis exercitationem illum!</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className='footer-contents-center'>
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-contents-right'>
                <h2>GET IN TOUCH</h2>
                <address>
                    <a target='_blank' href="tel:+1-222-911-411">Call: +1 -222 911 411</a>
                    <br />
                    <a href="mailto:contactsupport@tomato.com">contactsupport@tomato.com</a>
                </address>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'> Copyright 2024 &#169; Tomato.com - All rights reseverd.</p>
    </div>
  )
}

export default Footer
