/*
    Written by Dhruv, JS for Loading Screen.
*/

var geolocation = require("nativescript-geolocation");
import Dash from '../Dash';

export default {
    data() {
      return {
        location: {
            city: null,
            station: null,
            data: null,
            aqi: null,
            prominent: null,
            msg: null
        }
      };
    },
    computed: {
    
    },
    created() {
        if (!geolocation.isEnabled()) { // check if geolocation is not enabled
            geolocation.enableLocationRequest(); // request for the user to enable it
        }

        geolocation.getCurrentLocation({}).then(result => {
            fetch(`https://api.openaq.org/v1/locations?coordinates=${result.latitude},${result.longitude}&radius=20000&order_by=distance`).then(res => res.json()).then(d => { 
                this.location.city = d.results[0].city;
                this.location.station = d.results[0].location;

                fetch(`https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd0000011ae4fb263fc34bd24627884b4078f05c&format=json&offset=0&limit=1020&filters[station]=${this.location.station}`).then(res => res.json()).then(d => { 
                    this.location.data = d.records;
                    this.location.station = this.location.station.split(",")[0];

                    let highest = 0;
                    let prominent = '';
                    for (let rec of this.location.data) {

                        if (rec.pollutant_avg == "NA") {
                            highest = "-";
                            prominent = "-";
                            break;
                        } else if (parseInt(rec.pollutant_avg) >= highest) {
                            highest = rec.pollutant_avg;
                            prominent = rec.pollutant_id;
                        }
                    }

                    this.location.prominent = prominent;
                    this.location.aqi = highest;

                    if (this.location.aqi == "-") {
                        this.location.msg = "Inadequate Data";
                    } else if (this.location.aqi <= 50) {
                        this.location.msg = "Good";
                    } else if (this.location.aqi <= 100) {
                        this.location.msg = "Satisfactory";
                    } else if (this.location.aqi <= 200) {
                        this.location.msg = "Moderate";
                    } else if (this.location.aqi <= 300) {
                        this.location.msg = "Poor";
                    } else if (this.location.aqi <= 400) {
                        this.location.msg = "Very Poor";
                    } else {
                        this.location.msg = "Severe";
                    }

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
                }).catch(e => {
                    alert('Server is not reachable. Please check your connection.');
                    console.log(e);
                })

            })
        }).catch(e => {
            console.log(e);
        });
    }
  };