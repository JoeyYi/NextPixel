var mongoose   = require("mongoose");
    Post       = require("./models/post");
    Comment    = require("./models/comment");


// var postdata = [
//     {
//         name: "Moving Castle",
//         img: "https://img3.doubanio.com/view/photo/l/public/p2413559895.webp",
//         description:"Super cute"
//     },
//     {
//         name: "Another moving Castle",
//         img: "https://img3.doubanio.com/view/photo/l/public/p2413559836.webp",
//         description:"Rather cute"
//     },
//     {
//         name: "One more moving Castle",
//         img: "https://img3.doubanio.com/view/photo/l/public/p2413559792.webp",
//         description:"Literally cute"
//     }
// ]

// var commentdata = [
//     {
//         text: "This is unbelievable!!",
//         author: "Obama"
//     }
// ]

// function seedDB(){
//     //remove all items
//     Post.remove({},function(err){
//         if(err){
//             console.log("failed to remove data");
//             console.log(err);
//         } else {
//             console.log("removed posts");
//             //add a few items
//             postdata.forEach(function(seed){
//                 Post.create(seed, function(err,post){
//                     if(err){
//                         console.log(err);
//                     } else {
//                         console.log("added new post");
//                         //create a comment
//                         Comment.create(commentdata[0],function(err, comment){
//                             if(err){
//                                 console.log(err);
//                             } else {
//                                 post.comments.push(comment);
//                                 post.save();
//                                 console.log("added new comment");
//                             }
//                         });
//                     }
//                 });
                
//             });
//         }
//     });
// }

 function seedDB(){
    // Post.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("removed posts");
    //     }
    // });
    // Comment.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("removed comments");
    //     }
    // });
 }

module.exports = seedDB;