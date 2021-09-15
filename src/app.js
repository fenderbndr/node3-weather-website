const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


//Define paths for express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))
 
app.get('', (req, res) => {
    res.render('index',  {
        title: 'Weather',
        name: 'Bruce Fenderson'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Bruce Fenderson'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address fam :('
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        const {latitude, longitude} = data
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            const{location} = data
            res.send({
                location: location,
                address: req.query.address,
                forecast: forecastData
            })


        })


    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
         return res.send({
            error:'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Bruh, nobody is helping you...',
        title: 'Help',
        name: 'Bruce Fenderson'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bruce Fenderson',
        error: 'Help article not found'
    })

})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Bruce Fenderson',
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})