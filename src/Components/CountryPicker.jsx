import React from 'react';
import { NativeSelect } from '@material-ui/core';
import styles from './CountryPicker.module.css'

export const CountryPicker = ({data, fetchDataOfCountry}) => {
    return (
        <div className={styles['country-container']}>
        <span>
            Select a Country:
        </span>
        <NativeSelect className={styles.picker}  defaultValue="" onChange={(e) => {fetchDataOfCountry(e.target.value)}}>
                    <option value="Global">Global</option>
                    {data.map(country => <option key={country.name} value={country.name}>{`${country.name} (${country.iso3})`}</option>)}
        </NativeSelect>            
        </div>
    );
};