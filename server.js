const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/cpap_measures");


const measuresListSchema = mongoose.Schema({
    userId : String,
    date : String,
    ratioOfUsage: String,
    averageUsage : String,
    maxPressure : Number,
    minPressure : Number,
    pressure95 : Number,
    pressureMax : Number,
    leakMax : Number,
    ahi : Number,
    cai : Number,
    uai : Number,
    mark : Number,
});

const MeasuresList = mongoose.model('MeasuresList', measuresListSchema)

app.use('/css', express.static(__dirname+'/public/css'))
app.use('/', (req, res, next)=> {
    res.cookie('cookieName','cookieValue')
    next()

})
app.use(bodyParser.json())


app.get('/api2/getMeasures', (req, res, next) => {

    MeasuresList.find((err, doc)=>{
        if(err) { return next(err)}
       res.json(doc)
    })
})


app.post('/api2/addmeasures', (req, res, next)=>{

    const { userId, date, ratioOfUsage, averageUsage, maxPressure, minPressure, pressure95, pressureMax, leakMax, ahi, cai, uai, mark} = req.body

    const measureList = new MeasuresList({
        userId : userId,
        date : date,
        ratioOfUsage : ratioOfUsage,
        averageUsage : averageUsage,
        maxPressure : maxPressure,
        minPressure : minPressure,
        pressure95 : pressure95,
        pressureMax : pressureMax,
        leakMax : leakMax,
        ahi : ahi,
        cai : cai,
        uai : uai,
        mark : mark,
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
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})