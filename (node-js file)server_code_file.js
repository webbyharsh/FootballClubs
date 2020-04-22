var admin = require("firebase-admin");
var express=require('express');

var app=express();
var serviceAccount = require("./secretkey/upbringo-aad6e-firebase-adminsdk-kg39k-08778dcf4b.json");
var bihar=require("./data/bihar.json")

app.listen(process.env.PORT);

app.get("/",(req,res)=>{
    res.send("<h1>UPBRINGO's BACKEND API TO GET FOOTBALL CLUB NAMES - HARSH YELNE");
});
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://upbringo-aad6e.firebaseio.com"
});
  
let db = admin.firestore();
//console.log(db);



app.get("/api/getclubs/:state/:id",(req,res)=>{
    var obj={}
    var off=req.params.id;
    var first=db.collection('FootBallClubs').doc(req.params.state).collection("clubs").limit(10).orderBy("id").startAfter(parseInt(req.params.id));
    
    var paginate=first.get()
    .then((snapshot)=>{
        console.log(req.params.id);
        snapshot.forEach((doc)=>{
            obj[doc.id]=doc.data();
        });
        
        var last=snapshot.docs[snapshot.docs.length-1];
        obj["for-pagination"]=last.data();
        
        res.send(obj);
        
    })
    .catch((err)=>{console.log(err)});

});

app.get('/api/add/:filename',(req,res)=>{
    var f=req.params.filename;
       var ref=db.collection("FootBallClubs").doc(f).collection("clubs");
    for(var i=0;i<bihar.length;i++){
        var d={
            "city":bihar[i].city,
            "likes":0,
            "id":i+1
        }
        ref.doc(bihar[i].Club).set(d);
        
     }
    // ref.doc("three").set({
    //     "test":2
    // });
    // console.log(bihar[2].Club);
    res.send("ok");

});
app.get('/api/like/:statename/:clubname',(req,res)=>{
    ref=db.collection("FootBallClubs").doc(req.params.statename).collection("clubs").doc(req.params.clubname);
    ref.get().then((doc)=>{
        if(doc){
            //console.log(doc.likes);
            var l=parseInt(doc.data().likes);
            l=l+1;
            ref.update({likes:l});
            //console.log(doc.data());
            res.send({likes:l});
        }else{
            res.send('Some problem');
        }
    })
    .catch((err)=>{console.log(err)});
});

app.get('/api/dislike/:statename/:clubname',(req,res)=>{
    ref=db.collection("FootBallClubs").doc(req.params.statename).collection("clubs").doc(req.params.clubname);
    ref.get().then((doc)=>{
        if(doc){
            //console.log(doc.likes);
            var l=parseInt(doc.data().likes);
            l=l-1;
            ref.update({likes:l});
            //console.log(doc.data());
            res.send({dislikes:d});
        }else{
            res.send('Some problem');
        }
    })
    .catch((err)=>{console.log(err)});
})

app.get('/api/totalclubs/:statename',(req,res)=>{
   // console.log(req.params.statename);
    var refa=db.collection("FootBallClubs").doc(req.params.statename).collection("clubs");
    var arr=[];
    var i=0;

    refa.get()
    .then((snapshot)=>{
       // console.log(snapshot.length());
        snapshot.forEach((doc)=>{
            // arr.push(doc.data());
            // console.log(doc.data());
            // //console.log(snapshot.length)
            i++;

        })
        res.send({
            total_clubs:i, 
        })
    })
    .catch((err)=>{console.log("ERROR"+err);res.send({total_clubs:0})});
    
})