/*
    Written by Dhruv, common utility file.
*/

let geolocation = require("nativescript-geolocation");

let utils = {

    permit() {

        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest();
        }
    },

    getCityAndStation() {
        console.log('hi1');
        return new Promise((resolve, reject) => {
            if (!geolocation.isEnabled()) {
                geolocation.enableLocationRequest();
            }
            console.log('hi2');
            geolocation.getCurrentLocation({}).then(result => {
                console.log('hi3');
                //https://api.openaq.org/v1/locations?coordinates=${result.latitude},${result.longitude}&radius=20000&order_by=distance
                fetch(`https://api.openaq.org/v1/locations?coordinates=${result.latitude},${result.longitude}&radius=20000&order_by=distance`).then(res => res.json()).then(d => { 
                    console.log('fetch1');
                    let returnable = {err: false, city: null, station: null};

                    let i = -1;
                    let source;

                    do {
                        i++;
                        source = d.results[i].sourceName.split("_")[0];
                    } while (source == "StateAir");

                    returnable.city = d.results[i].city.replace("Gurgaon", "Gurugram");
                    returnable.station = d.results[i].location.replace(" Gurgaon", ", Gurugram");
                    
                    resolve(returnable);
            
                }).catch(e => {
                    console.log(e);
                    reject({ err: true, msg: "Could not fetch city data."});
                });

            }).catch(e => {
                alert('Location err');
                console.log(e);
            });
        });

    },

    getStationData(identifier) {
        console.log('stattion');
        return new Promise((resolve, reject) => {

            fetch(`https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key=579b464db66ec23bdd0000011ae4fb263fc34bd24627884b4078f05c&format=json&offset=0&limit=1020&filters[station]=${identifier}`).then(res => res.json()).then(d => { 
                console.log('fetch2');
                returnable = {err: false};
                returnable.data = d.records;
                returnable.station = identifier.split(",")[0];

                resolve(returnable);
                
            }).catch(e => {
                console.log(e);
                reject({ err: true, msg: "Could not fetch station data."});
            });
        });

    },

    getProminent(data) {

        let highest = 0;
        let prominent = '';

        for (let rec of data) {

            if (rec.pollutant_avg == "NA") {
                highest = "-";
                prominent = "-";
                break;
            } else if (parseInt(rec.pollutant_avg) >= highest) {
                highest = rec.pollutant_avg;
                prominent = rec.pollutant_id;
            }
        }

        let returnable = {};

        returnable.prominent = prominent;
        returnable.aqi = highest;

        return returnable;

    },

    parseStatus(aqi) {

        console.log(aqi);

        let returnable = {msg: null};

        if (aqi == "-") {
            returnable.msg = "Inadequate Data";
            returnable.class = "aqi_grey";
        } else if (aqi <= 50) {
            returnable.msg = "Good";
            returnable.class = "aqi_brightgreen";
        } else if (aqi <= 100) {
            returnable.msg = "Satisfactory";
            returnable.class = "aqi_green";
        } else if (aqi <= 200) {
            returnable.msg = "Moderate";
            returnable.class = "aqi_yellow";
        } else if (aqi <= 300) {
            returnable.msg = "Poor";
            returnable.class = "aqi_amber";
        } else if (aqi <= 400) {
            returnable.msg = "Very Poor";
            returnable.class = "aqi_red";
        } else {
            returnable.msg = "Severe";
            returnable.class = "aqi_darkred";
        }

        console.log(returnable);

        return returnable;

    },

    getCityList() {

    }

}

module.exports = utils;