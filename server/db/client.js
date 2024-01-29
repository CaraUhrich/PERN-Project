const { Client } = require('pg')

const client = new Client(`postgres://cara:vh3CNMzbMHSQI6Tnypmo5w221kfJMAuH@dpg-cmrs4121hbls73fr47qg-a/nonantumgallery`)

module.exports = client