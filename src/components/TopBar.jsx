import React from 'react'
import './TopBar.css'
import logo from '../assets/logo.jpg'
import toggle_icon_light from '../assets/night.png'
import toggle_icon_dark from '../assets/day.png'
import search_icon_light from '../assets/search-w.png'
import search_icon_dark from '../assets/search-b.png'

const TopBar = ({theme,setTheme}) => {
    const handleThemeToggle = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };
  return (
    <div className='topbar'>
        <img src={logo} alt='' className='logo'/>
        <div className='ev-dashboard'>EV DASHBOARD</div>
        <ul>
            <li className='topbar-item'>Home</li>
            <li className='topbar-item'>About</li>
            <li className='topbar-item'>Contact</li>
            <li className='topbar-item'>Services</li> 
        </ul>
        <div className='search-box'>
            <input type="text" placeholder="Search..." className='search-input'/>
            <img src={theme==='light'? search_icon_light : search_icon_dark} alt='' className='search-icon'/>
        </div>
        <img onClick={()=> {handleThemeToggle()}} src={theme==='light'? toggle_icon_light : toggle_icon_dark} alt='' className='toggle-icon'/>
    </div>
  )
}

export default TopBar;