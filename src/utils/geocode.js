const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicmFodWxrayIsImEiOiJjanlhYnZrZGIwZGE3M2JzMzE1MWJiNzZlIn0.Ca_kTtS6NX9LHohcZmC0Kg&limit=1'
      request({url, json: true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to weather app', undefined)
        }else if (body.features.length === 0 ){
            callback('Unable to find the location ', undefined)
        }
        else{
              callback(undefined, {
                                       latitude: body.features[0].center[1],
                                      longitude: body.features[0].center[0],
                                      location: body.features[0].place_name

                        })
          }
          

    })
    
}
module.exports = geocode
