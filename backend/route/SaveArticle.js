const express = require('express');
const router = express.Router();
const Article = require('../models/ArticleModel');

router.post('/api/save-article', async(req, res) => {
    try {
        const { title, description, url, image, publishedAt } = req.body;
        const article = new Article({
            title,
            description,
            url,
            image,
            publishedAt,
        });
        await article.save();
        res.json({ message: 'Article saved successfully' });
    } catch (error) {
        console.error('Error saving article:', error);
        res.status(500).json({ error: 'Error saving article' });
    }
});

module.exports = router;