
import React, { useEffect, useState } from 'react';
import '../App.css';
import covidimage from '../images/covid-19.png';
import { getAllApiDetails, getCountries, getDailyData } from '../Api';
import { Cards } from './Cards';
import { CountryPicker } from './CountryPicker';
import { Graphs } from './Graphs';


export const HomePage = (props) => {
    console.log('in home', props);
    
    const [cardDatas, setCardData] = useState({});

    const [dailyData, setDailyData] = useState([]);

    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        const getAllDetails = async () => {
            const allDetails = await getAllApiDetails();
            const dailydata = await getDailyData();
            const countryData = await getCountries();

            console.log('here', countryData);
            setCardData(allDetails);
            setDailyData(dailydata);
            setAllCountries(countryData);
        }

        getAllDetails();
    }, []);

    const fetchDataOfCountry = async (country) => {
        const countryDetails = await getAllApiDetails(country);
        console.log(countryDetails);
        setCardData(countryDetails);
        if (country === 'Global') {
            const dailydata = await getDailyData();
            setDailyData(dailydata);
        }
        else {
            setDailyData(countryDetails);
        }
    }


    return (
        <div className="App">
            <div className="header-text">
                <img className="covid-img" src={covidimage} alt="covid-19" />
            </div>
            <CountryPicker data={allCountries} fetchDataOfCountry={fetchDataOfCountry} />
            <Cards data={cardDatas} />
            <Graphs data={dailyData} />
        </div>
    );
}