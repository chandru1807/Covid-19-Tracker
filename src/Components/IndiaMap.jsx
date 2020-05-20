
import India from "@svg-maps/india";
import React, { useState } from 'react';
import { SVGMap } from "react-svg-map";
import './IndiaMap.css';

const initialTooltip = {
    display:'none',
    opacity:0,
    top: 0,
    left: 0
}

const upArrowSvg = (className) => (<svg className={'up-arrow-style ' + className} height="32px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px"><path d="M28,14H8.8l4.62-4.62C13.814,8.986,14,8.516,14,8c0-0.984-0.813-2-2-2c-0.531,0-0.994,0.193-1.38,0.58l-7.958,7.958  C2.334,14.866,2,15.271,2,16s0.279,1.08,0.646,1.447l7.974,7.973C11.006,25.807,11.469,26,12,26c1.188,0,2-1.016,2-2  c0-0.516-0.186-0.986-0.58-1.38L8.8,18H28c1.104,0,2-0.896,2-2S29.104,14,28,14z"/></svg>)

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
            let oneState = stateData[location.id]['active'].length > 0 ? +stateData[location.id]['active'] : 0;
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
        
        let id = event.target.id === 'dd' ? 'dn' : event.target.id;
        let clientX = event.clientX;
        let clientY = event.clientY;
        
        tooltipTimeout = setTimeout(() => {
            setTooltipStyle({
            display: 'block',
            opacity: 1,
            top: clientY + 10,
            left: (clientX > (window.screen.width / 2))  ? (window.screen.width > 799 ? clientX - 250:clientX - 150) : clientX
        });
        sethoveredStateData(stateData[id]);
        }, 650);
    }
    
    const handleLocationMouseOut = (event) => {
        clearTimeout(tooltipTimeout);
        setTooltipStyle(initialTooltip);
        sethoveredStateData({});
    }

    const legendBox = (styles) => {
        return <span className="legend-box" style={styles}>
        </span>
    }
    
   if(stateData){
    return (
        <>
        <div className="legends">
            <div className="legend-wrapper">{legendBox({backgroundColor: '#e12424'})}{'Active > 1000'}</div>
            <div className="legend-wrapper">{legendBox({backgroundColor: 'orange'})}{'Active < 1000'}</div>
            <div className="legend-wrapper">{legendBox({backgroundColor: 'green'})}{'No Active'}</div>
        </div>
        <div className="india-map">
             <SVGMap locationClassName={getLocationClassName} onLocationMouseOut={handleLocationMouseOut} onLocationMouseOver={handleLocationMouseOver} map={India} onLocationClick={locationClicked} />;
             <div className="tooltip" style={tooltipStyle}>
                {hoveredStateData ? 
                (<div>
                    <h2>{`${hoveredStateData.state}(${hoveredStateData.statecode})`}</h2>
                <div>Confirmed:{hoveredStateData.confirmed} ({hoveredStateData.deltaconfirmed}{+hoveredStateData.deltaconfirmed > 0 ? upArrowSvg('orange-arrow') : ''})</div>
                <div>Active: {hoveredStateData.active}</div>
                <div>Recovered: {hoveredStateData.recovered} ({hoveredStateData.deltarecovered}{+hoveredStateData.deltarecovered ? upArrowSvg('green-arrow') : ''})</div>
                <div>Deaths: {hoveredStateData.deaths} ({hoveredStateData.deltadeaths}{+hoveredStateData.deltadeaths ? upArrowSvg('red-arrow') : ''})</div>
                <div>Last Updated: {hoveredStateData.lastupdatedtime}</div>
                    </div>)
            : (<div>Uh oh! Data for this State not available</div>)}
			</div>
        </div>
        </>
    );
   }
   else{
    return 'Loading...'
   }
};