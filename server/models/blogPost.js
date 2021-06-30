const mongoose=require('mongoose');

//shema
const Shema=mongoose.Schema;
const BlogPostSchema=new Shema({
    title:String,
    body:String,
    date:{
        type:String,
        default:Date.now()
    }
})

//Model 
const BlogPost=mongoose.model('BlogPost',BlogPostSchema);
module.exports=BlogPost;