
import India from "@svg-maps/india";
import React, { useState } from 'react';
import { SVGMap } from "react-svg-map";
import './IndiaMap.css';

const initialTooltip = {
    display:'none',
    top: 0,
    left: 0
}

const upArrowSvg = (className) => (<svg className={'up-arrow-style ' + className} height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px"><path d="M28,14H8.8l4.62-4.62C13.814,8.986,14,8.516,14,8c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-7.958,7.958  C2.334,14.866,2,15.271,2,16s0.279,1.08,0.646,1.447l7.974,7.973C11.006,25.807,11.469,26,12,26c1.188,0,2-1.016,2-2  c0-0.516-0.186-0.986-0.58-1.38L8.8,18H28c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>)

export const IndiaMap = ({stateData}) => {
    console.log(India);
    
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
                <div>Total Confirmed:{hoveredStateData.confirmed} ({hoveredStateData.deltaconfirmed}{upArrowSvg('orange-arrow')})</div>
                <div>Active: {hoveredStateData.active}</div>
                <div>Recovered: {hoveredStateData.recovered} ({hoveredStateData.deltarecovered}{upArrowSvg('green-arrow')})</div>
                <div>Deaths: {hoveredStateData.deaths} ({hoveredStateData.deltadeaths}{upArrowSvg('red-arrow')})</div>
                <div>Last Updated: {hoveredStateData.lastupdatedtime}</div>
			</div>
        </div>
    );
   }
   else{
    return 'Loading...'
   }
};