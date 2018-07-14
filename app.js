const { body, validationResult } = require('express-validator/check')
const { sanitizeBody } = require('express-validator/filter')
const express = require('express')
const app = express()
const axios = require('axios')
const moment = require('moment-timezone')
const nunjucks = require('nunjucks')
const prompt = require('prompt-promise')
const pgp = require('pg-promise')({})
const db = pgp({
  host: 'dcgroupproject.cszqs53dxn5e.us-east-2.rds.amazonaws.com',
  port: 5432,
  database: 'fluid_level',
  user: 'voicemonkey',
  password: 'helloWorld'
})
const body_parser = require('body-parser')
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: false }))

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
})

app.use(express.static('public'))

app.get('/', function (req, res) {
  //   db.any('SELECT * FROM well_info').then(function (info) {
  //     console.log(info)
  res.render('form.html')
  //   })
  //   .catch(function(error){
  //       console.error("Error: ",error)
  //   })
})

app.get('/graph_data', function (req, res) {
  db
    .any(
      'SELECT shot_stats.date_time,well_info.kb_thf + 0.5*shot_stats.travel_time*well_info.acoustic_velo AS Fluid_Level_Depth FROM shot_stats LEFT JOIN well_info ON shot_stats.well_info_id = well_info.id'
    )
    .then(function (info) {
      var infoArray=[]
      info.forEach(function(item){
          infoArray.push([moment(item.date_time).unix()*1000-18000000,item.fluid_level_depth])
      })
      console.log(infoArray)
      res.json(infoArray)
    })
    .catch(function (error) {
      console.error('Error: ', error)
    })
})

app.get('/graph', function (req, res) {
  res.render('chart.html')
})

app.post('/well_info', function (req, res) {
  var input = req.body
  console.log(input)
  var q =
    'INSERT INTO well_info VALUES (default,${companyName},${wellName},${location},${ocsg},${kbMSL},${kbTHF},${perfMDmin},${perfMDmax},${perfTVDmin},${perfTVDmax},${bhp},${acVelo})'
  // console.log(typeof input)
  db.result(q, input).then(function (result) {
    console.log(result)
  })
})

app.post('/shot_stats', function (req, res) {
  var input = req.body
  console.log(input)
  var q =
    'INSERT INTO shot_stats VALUES (default,1,${dateTime},${acqPoint},${acTrvl},${surfPress},${fluidDensity},${comments},default)'
  // console.log(typeof input)
  db.result(q, input).then(function (result) {
    console.log(result)
  })
})

app.listen(8000, function () {
  console.log('Listening on port 8000')
})
