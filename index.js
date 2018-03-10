const dotenv = require('dotenv').config()
const axios = require('axios')
const httpClient = axios.create()
const express = require('express')
const app = express()
const PORT = 3000



app.get('/search/:term', (req, res) => {
    const options ={
        method: 'get',
        url: `https://api.giphy.com/v1/gifs/search?api_key=7Zl2khtfV4AXPfb7GWqe8Fm9FHvbg1yx&q=${req.params.term}&limit=25&offset=0&rating=G&lang=en`
    }

    httpClient(options).then((apiResponce) => {
        var results = ""
        // loop through the array of images we get back from giphy
        for (i = 0; i < apiResponce.data.data.length; i++){
        // create one string that contains an img tag for each
            const currentImageUrl = apiResponce.data.data[i].images.fixed_height.url
            results += `<img src="${currentImageUrl}" />`
        }
        res.send(results)
    })

    // forEach method
    // var results =""
    // var images = apiResponce.data.data
    // images.forEach((image) => {
    //     const currentImageurl = image.images.fixed_height.url
    //     results += `<img src="${currentImageurl}"/>`
    // })
})

app.get('/stickers/:term', (req, res) => {
    const options = {
        method: 'get',
        url: `https://api.giphy.com/v1/stickers/search?api_key=7Zl2khtfV4AXPfb7GWqe8Fm9FHvbg1yx&q=${req.params.term}&limit=25&offset=0&rating=G&lang=en`
    }

    httpClient(options).then((apiResponce) => {
        var results =""
        var stickers = apiResponce.data.data
        stickers.forEach((sticker) => {
            const currentStickerUrl = sticker.images.fixed_height.url
            results += `<img src="${currentStickerUrl}"/>`
        })
        res.send(results)
    })
})

app.get('/random/:tag', (req, res) => {
    const options = {
        method: 'get',
        url: `https://api.giphy.com/v1/gifs/random?api_key=7Zl2khtfV4AXPfb7GWqe8Fm9FHvbg1yx&tag=${req.params.tag}&rating=G`
    }
    
    httpClient(options).then((apiResponce) => {
        var imageUrl = apiResponce.data.data.images.original.url
        res.send(`<img src= "${imageUrl}" />`)
    })
})

app.get('/trending', (req, res) => {
    const options = {
        method: 'get',
        url: 'https://api.giphy.com/v1/gifs/trending?api_key=7Zl2khtfV4AXPfb7GWqe8Fm9FHvbg1yx&limit=25&rating=G'
    }

    httpClient(options).then((apiResponce) => {
        var imageUrl = apiResponce.data.data[0].images.original.url
        res.send(`<img src= "${imageUrl}" />`)
    })
})



app.listen(PORT, (err) => {
    console.log(err || `Server running on ${PORT}`)
})
