
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Graphs.module.css';
import { Paper } from '@material-ui/core';


export const Graphs = ({ data }) => {
  console.log(data);

  const lineGraph = data['dates'] ? <Line
    options={
      {
        maintainAspectRatio: false,
        animation: {

          easing: 'easeInOutElastic'
        }
      }
    }
    data={{
      labels: data['dates'],
      datasets: [
        {
          data: data['infected'],
          label: 'Infected',
          borderColor: 'rgb(145, 53, 229)',
          backgroundColor: 'rgba(145, 53, 229,0.3)',
          fill: true
        },
        {
          data: data['deaths'],
          label: 'Deaths',
          borderColor: 'red',
          backgroundColor: 'rgba(255,0,0,0.5)',
          fill: true
        }
      ]
    }}
  /> : null;

  const barGraph = data.cardData ? <Bar
    data={{
      labels: ['Infected', 'Recovered', 'Deaths'],
      datasets: [
        {
          label: 'People',
          backgroundColor: ['rgba(145, 53, 229,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)'],
          data: [data.cardData.confirmed.value, data.cardData.recovered.value, data.cardData.deaths.value]
        }
      ]
    }}
    options={
      {
        maintainAspectRatio: false,
        legend: { display: false },
        animation: {

          easing: 'easeInOutElastic',
        }
      }
    }
  /> : null;

  return (
    <div className={styles.container}>
      <Paper className={styles['paper-container']}>
        {data && data['dates'] ? lineGraph : barGraph}
      </Paper>
    </div>
  );
};