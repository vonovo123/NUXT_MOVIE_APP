const express = require('express')
const axios = require('axios');

const app = express()
const {OMDB_API_KEY} = process.env
//http 통신시 post 방식의 body를 json형식으로 분석할때 쓰도록 등록
app.use(express.json())
app.post('/', async (req, res) => {
  const payLoad = req.body;
  const {title, type, year, page, id} = payLoad;
  const url = id
   ?`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
   :`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  try {
    const {data} =  await axios.get(url);
    if(data.Error) {
      res.status(400)
      .json(data.Error)
    }
    res.status(200)
    .json(data)
  } catch (error) {
    res.status(error.response.status,)
    .json(error.message)
  }
})

module.exports = app;