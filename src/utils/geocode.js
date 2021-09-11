const request = require('request')
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmZlbmRlcnMiLCJhIjoiY2tzbnA2bWw0M2piNzJubzJicmVkd2QxNyJ9.GEhmiJfI0IZJURtRf5aSAQ&limit=1'
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            const{center, place_name} =  response.body.features[0]
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            })

        }

    })

}

module.exports = geocode