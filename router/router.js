var express = require('express');
var router = express.Router();


router.get('/', (req,res) => {
   res.render('index.ejs'); 
});

router.get('/home', (req,res) => {
   res.render('partials/home.ejs'); 
});

router.get('/test', (req,res) => {
   res.render('partials/test.ejs'); 
});
/*
router.get('/home', (req,res) => {
   res.render('partials/home.ejs'); 
});
*/

module.exports = router;