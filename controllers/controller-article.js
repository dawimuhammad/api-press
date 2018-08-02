const article = require('../models/article')
const moment = require('moment')

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

    }
}

module.exports = Article
