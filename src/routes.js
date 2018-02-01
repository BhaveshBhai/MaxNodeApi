const express = require('express');
const router = express.Router();
// const firebaseMiddleware = require('express-firebase-middleware');
var _ = require('lodash');
var fs = require('fs');

//Image
router.use((req, res, next) => {
    next();
});

// router.use('/api', firebaseMiddleware.auth) ;

var cate=require('./FirebaseModel/CategoryModel');
var HtmlPage=require('./FirebaseModel/HtmlCreator');

router.get('/api/category',async (req, res) => {        
    var TopicData =await  cate.GetTopicDataAll();
     var ImageData =await  cate.GetImageData (TopicData);
     res.send(ImageData) 
});


//   router.post('/api/:id',async (req, res) => {      
        
//      var TopicData =await  cate.GetTopicData(req.params.id); 
//          res.send(__dirname) 
//      });


     router.post('/api/category', async (req, res) => {
         var CategoryData=req.body;
        var PageName = CategoryData[0].Topic;
        var Result =await  HtmlPage.HtmlPageCreator(CategoryData);
        try {
            fs.writeFileSync(__dirname + '/htmlPages/' + PageName + '.html', Result);
        } catch (e) {
            console.log("Cannot write file ", e);
        }
        var html_dir = __dirname + '/htmlPages/' + PageName + '.html';
         res.send(html_dir);
         });
     
        //  var fs = require('fs');
        //  router.get('/api/HtmlGenerater',async (req, res) => {   
        //     var content = "<html><body><h1>My Header</h1><p>My paragraph.</p>  </body> </html>";
        //     var html_dir = './htmlPages/';
        //     try{
        //         fs.writeFileSync(__dirname + '/htmlPages/myfile1.html', content);
        //     }catch (e){
        //         console.log("Cannot write file ", e);
        //     }
        //     var html_dir=__dirname +'/htmlPages/myfile1.html';
        //     res.send(html_dir);
        //      });


module.exports = router;
