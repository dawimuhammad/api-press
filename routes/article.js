const express = require('express');
const router = express.Router();
const article = require('../controllers/controller-article')

router.get('/', article.readAll)

router.get('/:id', article.readById)

router.get('/author/:author', article.getArticleByAuthor)

router.post('/', article.add)

router.delete('/', article.delete)

module.exports = router;
