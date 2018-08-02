const article = require('../models/article')
const moment = require('moment')
const oauth = require('oauth')

const uberOauth = new oauth.OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.consumer_key,
    process.env.consumer_secret,
    '1.0A',
    null,
    'HMAC-SHA1'
)

class Article {
    static add(req, res, next) {

        let { author, title, content, imageUrl, category } = req.body
        
        console.log(req.body)

        article.create({
            author : author,
            title : title,
            content : content,
            imageUrl : imageUrl,
            category: category,
            time: moment().format('LLL')
        }, (err, articleAdded) => {
            if (err) {
                res.send(err)
            } else {
                res.send(articleAdded)
            }
        })
    }

    static getArticleByAuthor (req, res, next) {
        let author = req.params.author

        article.find({ author: author }).
        populate('author').
        exec(function (err, articles) {
            if (err) {
                res.status(500)
                res.send(err)
            } else {
                res.status(200)
                res.send(articles)
            }
          })

    }

    static readAll(req, res, next) {
        article.find({}).
        populate('author').
        exec(function (err, articles) {
            if (err) {
                res.status(500)
                res.send(err)
            } else {
                res.status(200)
                res.send(articles)
            }
        })
    }

    static readById(req, res, next) {
        article.findById(req.params.id).
        populate('author').
        exec(function (err, articles) {
            if (err) {
                res.status(500)
                res.send(err)
            } else {
                res.status(200)
                res.send(articles)
            }
          })
    }

    static delete(req, res, next) {
        article.deleteOne({ _id : req.body.id }, function(err, deletedArticle) {
            if (err) {
                res.status(500)
                res.send(err)
            } else {
                res.status(200)
                res.send(deletedArticle)
            }
        })
    }

    static update (req, res, next) {
        let id = req.params.articleId

        let { title, content, imageUrl } = req.body

        article.findByIdAndUpdate({ id },
            {
                $set: 
                {
                    title: title,
                    content: content,
                    imageUrl: imageUrl
                }
            }
        ).
        exec(function (err, updatedArticle) {
            if (err) {
                res.status(500)
                res.send(err)
            } else {
                res.status(200)
                res.send(updatedArticle)
            }
        })
        
    }

    static imgDetail (req, res, next) {
        let userId = req.body.user
    
        // deployment case
        let arrayoftags = (req.body.tags).split(" ")
    
        Image.create({
            user: userId,
            title: req.body.title,
            description: req.body.description,
            url: req.file.cloudStoragePublicUrl,
            // deployment case
            tags: arrayoftags,
            tags: req.body.tags,
            comments: req.body.comments,
            date: moment().format('LLL')
        }, (err, result) => {
            if (err) {
                res.send({
                    error: "error post image"
                })
            }
    
            res.send(result)
        })
    }
}

module.exports = Article
