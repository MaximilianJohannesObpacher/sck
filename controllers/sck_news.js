const express = require('express');
const router = express.Router();
const newsarticle = require('../models/news_article');

router.get('/',function(req,res) {
    newsarticle.getAllNewsArticles(function (err, newsarticles) {
        if(err){
            res.json({
                success: false,
                message: ' Failed to load NewsArticles. Error: ${err}'
            }
            )}
            else{
               res.write(JSON.stringify({
                   success: true,
                   newsarticles: newsarticles
               }, null,2));
               res.end();
        }
    })
});

router.post('/', function(req,res,next) {
    // TODO: Save the file in fact
    // Ref: https://stackoverflow.com/questions/15772394/how-to-upload-display-and-save-images-using-node-js-and-express
    const newNewsArticle = new newsarticle({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        date: req.body.date,
        imgPath: req.body.imgPath
    });

    newsarticle.addNewsArticle(newNewsArticle, function (err, newsArticle) {
        if (err) {
            res.json({success: false, message: 'Failed to create a new News Article. Error: ${err}'});
        }
        else
            res.json({success: true, message: "Added successfully."});
    });
});

router.delete('/:id', function(req,res,next) {
    const id = req.param.id;
    newsarticle.deleteNewsArticleById(id, function(err,newsarticle) {
        if (err) {
            res.json({success: false, message: 'Failed to delete a the News Article. Error: ${err}'});
        }
        else
            res.json({success: true, message: "Deleted successfully."});
    });
});

module.exports = router;

