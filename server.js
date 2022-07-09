const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/cpap_measures");


const measuresListSchema = mongoose.Schema({
    date : String,
    averageUsage : Number,
    maxPressure : Number,
    minPressure : Number,
    pressure95 : Number,
    pressureMax : Number,
    leakMax : Number,
    ahi : Number,
    cai : Number,
    uai : Number,
});

const MeasuresList = mongoose.model('MeasuresList', measuresListSchema)

app.use('/css', express.static(__dirname+'/public/css'))
app.use('/', (req, res, next)=> {
    res.cookie('cookieName','cookieValue')
    next()

})
app.use(bodyParser.json())


app.get('/api/getMeasures', (req, res, next) => {

    MeasuresList.find((err, doc)=>{
        if(err) { return next(err)}
       res.json(doc)
    })
})


app.post('/api/addmeasures', (req, res, next)=>{

    const { date, averageUsage, maxPressure, minPressure, pressure95, pressureMax, leakMax, ahi, cai, uai} = req.body

    const measureList = new MeasuresList({
        date : date,
        averageUsage : averageUsage,
        maxPressure : maxPressure,
        minPressure : minPressure,
        pressure95 : pressure95,
        pressureMax : pressureMax,
        leakMax : leakMax,
        ahi : ahi,
        cai : cai,
        uai : uai,
    })

    measureList.save((err, doc) => {
        if(err) { return next(err)}
        console.log(doc)
    })

    res.json({
        message : `Data saved as ${measureList}`
    })

})


const port = process.env.PORT || 8181
app.listen(port)