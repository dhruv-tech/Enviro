/*
    Written by Dhruv, JS for Loading Screen.
*/

import Dash from '../Dash';
import { initNativeView } from 'tns-core-modules/ui/frame';
const utils = require('./_utils');

export default {
    //props: ["selection"],

    data() {
      return {
        location: {
            city: null,
            station: null,
            data: null,
            aqi: null,
            prominent: null,
            msg: null,
            prominentColorClass: null,
            colorClasses: []
        }
      };
    },
    created() {
        
        asyncWrapper(this.location).then(() => {
            console.log("HEY!!!");
            this.$navigateTo(Dash, {
                props: {
                    location: this.location
                },
                transitionAndroid: {
                    name: "slide",
                    duration: 500,
                    curve: "easeIn"
                },
                clearHistory: true
            });
        });

    }
  };

  const asyncWrapper = async(loc) => {

    return new Promise(async(resolve, reject) => {
        
        await utils.permit();

        console.log('hi');

        let cityData = await utils.getCityAndStation();

        loc.city = cityData.city;
        loc.station = cityData.station;

        let stationData = await utils.getStationData(cityData.station);

        loc.station = stationData.station;
        loc.data = stationData.data;

        console.log("a");

        let prominentInfo = utils.getProminent(stationData.data);

        console.log('b');
        loc.aqi = prominentInfo.aqi;
        loc.prominent = prominentInfo.prominent;

        let metaData = utils.parseStatus(prominentInfo.aqi);
        console.log('c');
        loc.msg = metaData.msg;
        loc.prominentColorClass = metaData.class;

        if (loc.data.length == 0) {
            loc.data = [
                { pollutant_avg: '-', pollutant_id: 'PM2.5'},
                { pollutant_avg: '-', pollutant_id: 'PM10'},
                { pollutant_avg: '-', pollutant_id: 'NO2'},
                { pollutant_avg: '-', pollutant_id: 'NH3'},
                { pollutant_avg: '-', pollutant_id: 'CO'},
                { pollutant_avg: '-', pollutant_id: 'SO2'},
                { pollutant_avg: '-', pollutant_id: 'OZONE'},

            ]
        }

        for(let rec of loc.data) {
            metaData = utils.parseStatus(rec.pollutant_avg.replace("NA", "-"));
            loc.colorClasses.push(metaData.class);
        }

        console.log(loc.aqi);

        /*let trends = [];

        if (loc.prominent == 'PM2.5' || loc.prominent == 'PM10' || loc.prominent == 'OZONE') {
            trends = await utils.getCityTrends(cityData.city, prominentInfo.prominent);
        }
    
        console.log("done");*/

        resolve();
    })

    

  }