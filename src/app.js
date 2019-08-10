const path = require('path')
const express = require('express')
const hbs = require('hbs')
const Request = require('request')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')
const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const viewpath = path.join(__dirname, '../templates/views')
const dirpath = path.join(__dirname, '../public')
const partialpath = path.join(__dirname, '../templates/partials')
//Setup handlebar engine and views location 
app.set('views', viewpath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialpath)
//setup static directory to serve
app.use(express.static(dirpath))


app.get('',(req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Rahul'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
          title:'About',
          name:'Rahul'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
    title: 'Help',
    name: 'Rahul' 
    })


})
app.get('/Weather', (req, res) => {
    if(!req.query.address){
       return res.send({
           error:'Provide an address'
       })

        
        }
            geocode(req.query.address, (error, {latitude, longitude,location} = {}) =>
            {
                if(error){
                    res.send({error:'Unable to find the location. Try another'})
                }
                forcast(latitude, longitude, (error, forcastdata) => {

                if(error)
                {
                    return res.send({error})
                }                  
                else{
                    res.send({
                        forecast:forcastdata,
                        location,
                        address: req.query.address,
                        latitude,
                        longitude
                    })
                } 
                

            })
        })
    })


app.get('/products', (req, res) => {

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name:'Rahul',
        title:'404 ERROR',
        errorMessage:'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404',{
        title:'404 ERROR',
        name: 'Rahul',
        errorMessage:'Request not found'
    })
})


app.listen(port, () => {
    console.log('Server is up and running' +port)
})