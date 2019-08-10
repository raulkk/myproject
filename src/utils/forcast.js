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
            callback(undefined, body.currently.summary + '   it is currently   ' + body.currently.temperature + ' degree out. There is a '+ body.currently. precipProbability+ '% chance of rain')
        }
    } )

}
module.exports = forcast