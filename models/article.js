const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema ({
    author: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    imageUrl: String,
    category: String,
    time: String
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article