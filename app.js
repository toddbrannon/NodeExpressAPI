const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const PORT = 8080

const news_sources = [
    {
        name: 'reuters',
        url: 'https://www.reuters.com/business/energy/'
    },
    {
        name: 'cnbc',
        url: 'https://www.cnbc.com/energy/'
    },
    {
        name: 'wsj',
        url: 'https://wsj.com/news/business/energy-oil-gas?mod=nav_top_subsection'
    }
]
const topics = [
    ' oil', ' gas', ' LNG', ' power grid', ' energy', ' emissions', ' fuel', ' crude', ' heating', ' solar'
]
const articles = []

news_sources.forEach(news_source => {
    axios.get(news_source.url)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        topics.forEach(topic => {
            $(`a:contains(${topic})`, html).each(function(){
                    const title = $(this).text()
                    const url = $(this).attr('href')
                    articles.push({
                    title,
                    url,
                    source: news_source.name
                })
            })
        })   
    })
})

const results = []

topics.forEach(topic => {
    results.push({
        topic
    })
})

app.get('/api', (req, res) => {
    const apiKey = req.query.apiKey

    res.send({ data: '🔥 🔥 🔥 🔥 🔥 🔥 🔥' })
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/test', (req, res) => {
    res.json(results)
})

app.listen(8080, () => console.log(`alive on http://localhost:${PORT}`)); 