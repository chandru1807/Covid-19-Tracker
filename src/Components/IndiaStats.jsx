
import React, { useEffect, useState } from 'react';
import { IndiaMap } from './IndiaMap';
import { getStateWiseForIndia, getCasesTimelineForIndia } from '../Api';
import { Graphs } from './Graphs';

export const IndiaStats = () => {
    const [statewiseData, setStatewiseData] = useState(null);
    const [timelineData, setTimelineData] = useState([]);

    useEffect(() => {
        const getStateWiseData = async () => {
            const stateWiseDataObj = await getStateWiseForIndia();

            setStatewiseData(stateWiseDataObj)
        }

        getStateWiseData();
    }, [])

    useEffect(() => {
        const getTimelineData = async () => {
            const indiaTimelineData = await getCasesTimelineForIndia();

            setTimelineData(indiaTimelineData)
        }

        getTimelineData();
    }, [])
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ margin: '10px' }}>
                <h2>Statewise Stats</h2>
                <IndiaMap stateData={statewiseData} />
            </div>
            <div style={{ margin: '10px' }}>
                <h2>Timeline Stats</h2>
            </div>
            <Graphs data={timelineData} />
        </div>
    );
};