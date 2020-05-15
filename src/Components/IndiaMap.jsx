
import React, {useState} from 'react';
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import './IndiaMap.css';

const initialTooltip = {
    display:'none',
    top: 0,
    left: 0
}

export const IndiaMap = ({stateData}) => {

    const [tooltipStyle, setTooltipStyle] = useState(initialTooltip);
    const [hoveredStateData, sethoveredStateData] = useState({});
    let tooltipTimeout = null;
    const locationClicked = (args) => {
        
        let doc = document.getElementById(args.target.id);
        
        doc.style.fill = 'red'
                
    };

    const getLocationClassName = (location, index) => {
        let fillClass = `svg-map__location `;
        if(stateData && stateData[location.id]){
            let oneState = stateData[location.id]['confirmed'].length > 0 ? +stateData[location.id]['confirmed'] : 0;
            if(oneState > 0 && oneState < 1000){
                fillClass += 'location-orange';
            }
            else if(oneState > 999){
                fillClass += 'location-red';
            }
            else{
                fillClass += 'location-green';
            }
        }
        return fillClass;
    }

    const handleLocationMouseOver = (event) => {
        
        let id = event.target.id;
        let clientX = event.clientX;
        let clientY = event.clientY;
        tooltipTimeout = setTimeout(() => {
            setTooltipStyle({
            display: 'block',
            top: clientY + 10,
            left: clientX - 100
        });
        sethoveredStateData(stateData[id]);
        }, 650);
    }
    
    const handleLocationMouseOut = (event) => {
        clearTimeout(tooltipTimeout);
        setTooltipStyle(initialTooltip);
        sethoveredStateData({});
    }
    
   if(stateData){
    return (
        <div className="india-map">
             <SVGMap locationClassName={getLocationClassName} onLocationMouseOut={handleLocationMouseOut} onLocationMouseOver={handleLocationMouseOver} map={India} onLocationClick={locationClicked} />;
             <div className="tooltip" style={tooltipStyle}>
                <h2>{`${hoveredStateData.state}(${hoveredStateData.statecode})`}</h2>
                <div>Confirmed:{hoveredStateData.confirmed} </div>
                <div>Active: {hoveredStateData.active}</div>
			</div>
        </div>
    );
   }
   else{
    return 'Loading...'
   }
};