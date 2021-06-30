const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const routerBlogPost=require('./routes/blogPost');
const path=require('path');
const PORT=process.env.PORT || 8080;
const app=express();
app.use(morgan('tiny'));
const uri='mongodb+srv://sanon:steeve@cluster0.npwzc.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect( process.env.MONGODB_URI || uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('‘MongoDB Connected…’')
  })
  .catch(err => console.log(err))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/',routerBlogPost);
app.get('*',(req,res)=>{
    res.status(404).json("Page Non Trouve")
})

if(process.env.NODE_ENV=='production'){
  app.use(express.static('client/build '))
}

app.listen(PORT,(req,res)=>{
    console.log(`Server demarre sur le port ${PORT} avec succes`);
})