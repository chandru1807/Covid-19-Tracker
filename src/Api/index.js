import axios from 'axios';

let url = "https://covid19.mathdro.id/api";

const calcRecoveredPct = (totalConfirmed, totalRecovered) => {
    let pct = ((totalRecovered/totalConfirmed) * 100).toFixed(2);
    
    return `Recovery rate: ${pct}%`;
  };
  const calcDeathPct = (totalConfirmed, totalDeaths) => {
    let pct = ((totalDeaths/totalConfirmed) * 100).toFixed(2);
    
    return `Death rate: ${pct}%`;
  };

  const activePct = (totalConfirmed, totalRecovered, totalDeaths) => {
    let pct = (+((totalRecovered/totalConfirmed) * 100).toFixed(2) + +((totalDeaths/totalConfirmed) * 100).toFixed(2)).toFixed(2);
    pct = (100 - pct).toFixed(2);
    console.log(pct);
    
    return `Active cases: ${pct}%`;
  };

export const getAllApiDetails = async (country) => {
    let changeUrl = url;
    if(country && country !== 'Global'){
        changeUrl += `/countries/${country}`;
    }
    const allData = await axios.get(changeUrl);
    console.log(allData);
    
    const {confirmed, recovered, deaths, lastUpdate} = allData.data;
    recovered['pct'] = calcRecoveredPct(confirmed.value, recovered.value);
    deaths['pct'] = calcDeathPct(confirmed.value, deaths.value);
    confirmed['pct'] = activePct(confirmed.value, recovered.value,deaths.value);
    const data = {
        cardData:{
            confirmed,
        recovered,
        deaths,
        },
        lastUpdate
      }
    return data;
};

export const getDailyData = async () => {
    const dailyData = await axios.get(url+'/daily');
    console.log(dailyData);
    let deaths = [];
        let dates = [];
        let infected = [];
    if(dailyData.data && dailyData.data.length){
        dailyData.data.forEach(data => {
            deaths.push(data.deaths.total);
            infected.push(data.confirmed.total);
            dates.push(data.reportDate);
        });
    }
    let finalData = {
        deaths,
        infected,
        dates
    }
    console.log(finalData);
    
    return finalData;
}

export const getCountries = async () => {
    const countryData = await axios.get(url+'/countries');
    const {countries} = countryData.data;
    return countries;
}