import React from 'react'
import { useEffect, useRef, useState } from "react";

import bathroomCleaning from '../assets/serviceImg-BathroomCleaning.png'
import kitchenCleaning from '../assets/serviceImg-KitchenCleaning.png'
import houseCleaning from '../assets/serviceImg-HouseCleaning.png'
import waterTankCleaning from '../assets/serviceImg-WaterTankCleaning.png'
import sofaCleaning from '../assets/serviceImg-SofaCleaning.png'
import carpetCleaning from '../assets/serviceImg-CarpetCleaning.png'
import mattressCleaning from '../assets/serviceImg-MattressCleaning.png'

import './styles/SubCategory.css'

const SubCategory = () => {
    const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    if (!ref.current) return;

    const top = ref.current.getBoundingClientRect().top;

    // when it reaches sticky position (top: 60px)
    setIsActive(top <= 61);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <div className='servicesContainerWrapper'>
    <h2 ref={ref} className={`title ${isActive ? 'active' : ''}`}>
        Cleaning & Hygiene
    </h2>
        <div className="servicesContainer">
            <div className="serviceCard">
                <h3>Bathroom Cleaning</h3>
                <div className="imgContainer">
                    <img src={bathroomCleaning} alt="Bathroom Cleaning" />
                </div>
            </div>
            <div className="serviceCard">
                <h3>Kitchen Cleaning</h3>
                <div className="imgContainer">
                    <img src={kitchenCleaning} alt="Kitchen Cleaning" />
                </div>
            </div>
            <div className="serviceCard">
                <h3>House Cleaning</h3>
                <div className="imgContainer">
                    <img src={houseCleaning} alt="House Cleaning" />
                </div>
            </div>
            <div className="serviceCard">
                <h3>Water Tank Cleaning</h3>
                <div className="imgContainer">
                    <img src={waterTankCleaning} alt="Water Tank Cleaning" />
                </div>
            </div>
            <div className="serviceCard">
                <h3>Sofa Cleaning</h3>
                <div className="imgContainer">
                    <img src={sofaCleaning} alt="Sofa Cleaning" />
                </div>
            </div>
            <div className="serviceCard">
                <h3>Carpet Cleaning</h3>
                <div className="imgContainer">
                    <img src={carpetCleaning} alt="Carpet Cleaning" />
                </div>
            </div>
            <div className="serviceCard">
                <h3>Mattress Cleaning</h3>
                <div className="imgContainer">
                    <img src={mattressCleaning} alt="Mattress Cleaning" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default SubCategory