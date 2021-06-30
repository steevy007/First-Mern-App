const express=require('express');
const router=express.Router();
const BlogPost=require('../models/blogPost');

router.get('/api',(req,res)=>{
    BlogPost.find({})
        .then((data)=>{
            console.log('Data : ',data);
            res.json(data);
        })
        .catch((error)=>{
            console.log("Error : ",error);
        })

   // res.json("ok");

})

router.get('/api/wendy',(req,res)=>{
    const user={
        nom:"Wendy",
        prenom:"Tracka"
    }

    res.json(user);
})

router.get('/api/save',(req,res)=>{
    const data={
        title:"rxdtcfyguhijotdxcfyvgubhjngcfh",
        body:"srxdtcfyvgubhjgfxctvyfytcyvhcuvi"
    }
    const newInstance=new BlogPost(data);

    newInstance.save((error)=>{
        if(error){
            console.log("Error : ",error);
        }else{
            res.json({
                msg:"data save",
                data:data
            })
        }
    })
})

router.post('/save',(req,res)=>{
    console.log("Body : ",req.body);

    const data=req.body;

    const instBlogPost=new BlogPost(data);

    instBlogPost.save((error)=>{
        if(error){
            console.log("donnee non sauvegarder");
            return;
        }    
        return res.json({
            msg:'Donnee recu',
            data:data
        });
        
    })

})


module.exports=router;