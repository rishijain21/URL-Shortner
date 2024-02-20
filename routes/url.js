const express = require('express')


const routes = express.Router();

const {handleGenerateNewShortURL , handleGetAnalytics} = require("../controllers/url.js")


routes.post('/', handleGenerateNewShortURL);

routes.get('/analytics/:shortId',handleGetAnalytics);

module.exports=routes;