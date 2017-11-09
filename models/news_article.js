const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsArticleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    },
    author: {
       type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        data: Buffer,
        contentType: String
    },
    imgPath: {
        type: String
    }
});

const NewsArticle = module.exports = mongoose.model('NewsArticle', NewsArticleSchema);

module.exports.getAllNewsArticles = function(callback){
    NewsArticle.find(callback);
};

module.exports.addNewsArticle = function(newNewsArticle, callback){
  newNewsArticle.save(callback);
};

module.exports.deleteNewsArticleById = function(id, callback){
    const query = {_id:id};
    NewsArticle.remove(query, callback);
};