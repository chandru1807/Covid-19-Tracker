import React from 'react';
import './App.css';
import { Cards } from './Components/Cards'
import { Graphs } from './Components/Graphs'
import {CountryPicker} from './Components/CountryPicker'
import { useState, useEffect } from 'react';
import { getAllApiDetails, getDailyData, getCountries } from './Api'
import covidimage from './images/covid-19.png'

function App() {

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
    if(country === 'Global'){
      const dailydata = await getDailyData();
      setDailyData(dailydata);
    }
    else{
      setDailyData(countryDetails);
    }
  }


  return (
    <div className="App">
      <div className="header-text">
      <img className="covid-img" src={covidimage} alt="covid-19"/>
      </div>
      <CountryPicker data={allCountries} fetchDataOfCountry={fetchDataOfCountry} />
      <Cards data={cardDatas} />
      <Graphs data={dailyData} />
    </div>
  );
}

export default App;
