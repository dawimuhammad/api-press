const express = require('express');
const router = express.Router();
const img = require('../middleware/img')
const article = require('../controllers/controller-article')

router.get('/', article.readAll)

router.get('/:id', article.readById)

router.get('/author/:author', article.getArticleByAuthor)

router.post('/', article.add)

router.delete('/', article.delete)

router.put('/:articleId', article.update)

router.post('/image', img.multer.single('file'), img.sendUploadToGCS, article.imgDetail)

module.exports = router;
