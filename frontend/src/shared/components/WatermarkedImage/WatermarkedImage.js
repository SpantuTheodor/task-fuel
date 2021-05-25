import "./WatermarkedImage.css";

import watermarkedImage from './assets/watermarked-image.jpg';

import React, { Component } from 'react';

class WatermarkedImage extends Component {

    render() { 
        return (
        <div id="watermarked-image-div" style={{ background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6) ), url(${watermarkedImage}) 40% 10%`}}>
            <div id="watermarked-darken-div">
                <p id="watermarked-image-p">
                    <span id="task-span">Task</span>
                    <span id="fuel-span">Fuel</span>
                </p>
            </div>
        </div>  
        );
    }
}

export default WatermarkedImage;