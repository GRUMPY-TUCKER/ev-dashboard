import React, { useState } from "react";
import { FaGlobe, FaCity, FaCar, FaIndustry, FaMapMarkerAlt, FaCodeBranch, FaCalendarAlt, FaBars, FaUserCircle } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <ul className="menu">
                <li>
                    <FaGlobe />
                    {isOpen && <span>Top Countries</span>}
                </li>
                <li>
                    <FaCity />
                    {isOpen && <span>Top Cities</span>}
                </li>
                <li>
                    <FaCar />
                    {isOpen && <span>Top WMI</span>}
                </li>
                <li>
                    <FaIndustry />
                    {isOpen && <span>Top Car Makers</span>}
                </li>
                <li>
                    <FaCar />
                    {isOpen && <span>Top Car Models</span>}
                </li>
                <li>
                    <FaMapMarkerAlt />
                    {isOpen && <span>Top Postal Codes</span>}
                </li>
                <li>
                    <FaCodeBranch />
                    {isOpen && <span>Top Legislative Districts</span>}
                </li>
                <li>
                    <FaCalendarAlt />
                    {isOpen && <span>Year Trend</span>}
                </li>
            </ul>
            <div className="profile-section">
                <FaUserCircle className="profile-icon" />
                {isOpen && (
                    <div className="profile-info">
                        <p className="profile-name">Rupam Sadhukhan</p>
                        <p className="profile-role">Admin</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;