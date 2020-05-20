
import React from 'react';
import { Grid, Card, Typography, CardContent, CircularProgress } from '@material-ui/core';
import styles from './Cards.module.css';
import CountUp from 'react-countup';

export const Cards = ({ data }) => {

  if (Object.keys(data).length === 0) {
    return (
      <div className={styles.container}>
        <CircularProgress />
      </div>
    )
  }
  else {
    return (
      <div className={styles.container}>
        <Grid container spacing={2} alignItems='center' justify='center'>
          {Object.keys(data.cardData).map((categorykey, i) => {
            return (<Grid item key={i.toString()} xs={12} md={3}>

              <Card className={styles['bb'+categorykey]} raised={true}>
                <CardContent>
                  <Typography className={styles[categorykey]} gutterBottom>
                    {categorykey.replace(/^./, categorykey[0].toUpperCase())}
                  </Typography>
                  <Typography variant="h5" component="h2">
                  <CountUp end={data.cardData[categorykey].value} duration={1.5}/>
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Last Updated : {new Date(data.lastUpdate).toLocaleDateString() + " " + new Date(data.lastUpdate).toLocaleTimeString()}
                  </Typography>
                  <Typography className={styles.pct} variant="body1" component="p">
                  {data.cardData[categorykey].pct}
                  </Typography>
                </CardContent>
              </Card>

            </Grid>)
          })}
        </Grid>
      </div>
    );
  }
};