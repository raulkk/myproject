const request = require('request')

const forcast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/858b15a8a65829e91ff36156fafb2eb7/' + latitude + ',' + longitude
    request({ url, json: true}, (error, {body}) =>{
        if(error)
        {
            callback('unable to connect to weather app', undefined)
        }
        else if(body.error){
            callback('Unable to find the loction', undefined)
        }
        else{
            callback(undefined, body.daily.data[0].summary + '   it is currently   ' + body.currently.temperature + ' degree out. The high temperature is '+body.daily.data[0].temperatureHigh+' The low teperature is ' +body.daily.data[0].temperatureLow + 'There is a ' + body.daily.data[0].precipProbability+ '% chance of rain')
        }
    } )

}
module.exports = forcast