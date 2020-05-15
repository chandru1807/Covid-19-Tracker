
import  React, {useEffect, useState} from 'react';
import { IndiaMap } from './IndiaMap';
import {getStateWiseForIndia} from '../Api'

export const IndiaStats = () => {
    const [statewiseData, setStatewiseData] = useState(null);
    useEffect(() => {
        const getStateWiseData = async () => {
            const stateWiseDataObj = await getStateWiseForIndia();
            console.log(stateWiseDataObj);
            setStatewiseData(stateWiseDataObj)
        }

        getStateWiseData();
    },[])
    return (
        <div>
            <h2>Stats for India</h2>
            <IndiaMap stateData={statewiseData}/>
        </div>
    );
};