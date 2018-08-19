var mongoose = require("mongoose");
var Post = require("./models/post");

var data = [
    {
        title: "Can Language Save Communities Under Threat From A Globalised World?",
        image: "https://o.aolcdn.com/images/dims3/GLOB/crop/1345x890+78+0/resize/900x596!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Fccab37e635bbda5f4ed5068dbb178da4%2F206283864%2Fep%2B5%2Billustration.png",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at quam ligula. Integer sollicitudin bibendum condimentum. Aenean vestibulum ac metus eu dapibus. Morbi vehicula, turpis ac feugiat placerat, lorem augue gravida eros, sed interdum diam quam eu metus. Donec lacinia elit elit, sed sagittis odio laoreet nec. Praesent et accumsan arcu, id dapibus metus. Aliquam erat volutpat. Cras molestie ipsum nisi, ut mattis metus finibus sed. Praesent massa est, tempor non finibus id, imperdiet vitae ex. Integer et nunc id velit blandit maximus quis in massa. Integer lacinia quam neque, sit amet laoreet mi maximus quis. Aenean sit amet neque magna. Curabitur quis tellus leo."
    },
    {
        title: "We Need To Start Teaching Food Safety In Schools",
        image: "https://o.aolcdn.com/images/dims3/GLOB/crop/5652x2831+0+519/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F2da043713fc9391334c86fac98063c80%2F206219024%2Fchild-whispers-into-the-ear-of-her-friend-as-they-attend-morning-in-picture-id930031858",
        body: "Praesent ante nunc, malesuada quis augue at, tincidunt fringilla metus. Donec sed aliquam lectus. Vivamus ut libero sagittis, dignissim lorem ut, commodo nisi. Nam ac elementum tortor. Donec ac nisl quis nisi accumsan facilisis. Maecenas sit amet libero imperdiet, vulputate sem vitae, elementum neque. Nunc nec risus erat. Etiam convallis mi interdum auctor venenatis. Aenean ac vestibulum justo, non dictum nulla. Donec finibus malesuada volutpat. Nulla cursus ex nec magna posuere gravida. Quisque eget aliquet enim. Integer ultricies dapibus fringilla. Aliquam condimentum, ex at venenatis lobortis, magna magna mattis tellus, et consectetur ligula augue sed felis."
    },
    {
        title: "What Truly Inclusive And Diverse Organizations Do Differently",
        image: "https://o.aolcdn.com/images/dims3/GLOB/crop/3974x1987+782+291/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2F382fb1aa56cc8e63ab0962830c8a4dc8%2F206234166%2Fgroup-of-business-people-working-with-technology-picture-id825725730",
        body: "Aliquam vulputate massa consectetur nibh pellentesque, vitae laoreet elit bibendum. Aenean porta, diam lacinia sollicitudin congue, enim nulla sodales orci, aliquam vehicula urna metus ut enim. Proin porta nulla et leo vestibulum suscipit. Morbi ac leo dui. Integer vestibulum magna et libero interdum, varius efficitur ex sagittis. Cras eu arcu a tellus aliquam dapibus. Mauris consequat risus id nunc vestibulum convallis. Mauris luctus et sapien ac pretium. Donec vel dapibus ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec tincidunt augue. Quisque vitae elit elit. Morbi vel mollis dolor."
    }
    ];

function seedDB(){
    Post.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Removed all posts!");
            data.forEach(function(seed){
                Post.create(seed, function(err, newPost){
                    if(err){
                        console.log(err);
                    } else{
                        console.log("Created a new post!");
                    }
                });
            });
        }
    });
}

module.exports = seedDB;