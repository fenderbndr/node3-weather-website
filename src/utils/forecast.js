const request = require('request')
const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=dbdb4b297a097f137fd62d0ce14ef5ae&query=' + lat + ',' + long +'&units=f'
    request({url , json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find location. Please try again', undefined)
        } else {
            const {weather_descriptions, temperature, feelslike, humidity} = response.body.current
            callback(undefined, weather_descriptions[0]  + '. It is currently ' + temperature + ' degrees, but it feels like ' + feelslike + ' degrees.' + ' The humidity is ' + humidity + '. ')
        }
    })
}

module.exports = forecast