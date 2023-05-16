import sha1 from 'sha1'
import dotenv from "dotenv";
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, update, get } from "firebase/database";
import bodyParser from 'body-parser'
import { stat } from 'fs';
dotenv.config('.env')
const app = express()
app.use(express.json()) 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = 443;
app.use(cors());


app.use(bodyParser.json());

const firebaseConfig = {
    apiKey: "AIzaSyBb90KmPJl_5VaqXocgOjdJwuTBJHVWyL4",
    authDomain: "evcsms-aa8e6.firebaseapp.com",
    databaseURL: "https://evcsms-aa8e6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "evcsms-aa8e6",
    storageBucket: "evcsms-aa8e6.appspot.com",
    messagingSenderId: "350225566533",
    appId: "1:350225566533:web:62bd6314f9ed92a7b08c2c"
  };

const ap = initializeApp(firebaseConfig);

 


 
app.use(express.static(__dirname + '/public'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



app.get('/app',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
  })
app.get('/user',function(req,res){
    res.sendFile(path.join(__dirname+'/userdet.html'));
  })



//---------------------------------

app.get('/api1/listbook',async function(req,res){
    
    const dbRef = ref(getDatabase());
    get(child(dbRef, `bookings/`))
    
    .then((snapshot) => {
        let list=snapshot.val()
        console.log(list)
        res.send(list)

})
})

app.get('/api1/status',async function(req,res){
    
    let status=parseInt(req.query.status)
    const dbRef = getDatabase();
    const updates = {};
    updates[`charging/0/`] = {
        "chid":"63bd39",
        "status":status};
    //console.log(ref(db))
    update(ref(dbRef), updates);
    res.send("send"+status);
})


app.post('/api1/addbook1',async function(req,res){

console.log("came this for")
let date= req.body.date
let year = parseInt(date.substring(0, 4));
let month = parseInt(date.substring(5, 7));
let day= parseInt(date.substring(8, 11));   
//console.log(req.body.date);
console.log(year)
console.log(month)
console.log(day)

//time: '22:07'}
let time= req.body.time
let hour = parseInt(time.substring(0, 2));
let min = parseInt(time.substring(3, 5));
   
//console.log(req.body.date);
console.log(hour)
console.log(min)

res.send(req.body)

})
app.post('/api1/addbook',async function(req,res){

    let date= req.body.date
    let year = parseInt(date.substring(0, 4));
    let month = parseInt(date.substring(5, 7));
    let day= parseInt(date.substring(8, 11)); 
    let time= req.body.time
    let hour = parseInt(time.substring(0, 2));
    let min = parseInt(time.substring(3, 5));
    
    let bkid=await sha1(hour+min+day+month)
    let data={
        "bkid": bkid,
        "csid": "cs001",
        "place":"Tata EV, Coimbatore",
        "duration": 0,
        "finish": 0,
        "price": 0,
        "slot": {
            "d": day,
            "hr": hour,
            "m": month,
            "mn": min,
            "y": year
        },
        "evseid": "CS001T2E01",
        "usid":"63838"
    }

    const dbRef = ref(getDatabase());
    get(child(dbRef, `bookings/`))

    .then((snapshot) => {
        let list=snapshot.val()
        console.log(list)
        list.push(data)
        const dbRef = getDatabase();
        const updates = {};
        updates[`bookings/`] = list;
        //console.log(ref(db))
        update(ref(dbRef), updates);
        
        
        
        
        
        res.send(data)

})


})

app.post('/api1/tripbook',async function(req,res){
    console.log(req.body)
    let date= req.body.date
    let year = parseInt(date.substring(0, 4));
    let month = parseInt(date.substring(5, 7));
    let day= parseInt(date.substring(8, 11)); 
    //let time= req.body.time
    let hour = parseInt(8);
    let min = parseInt(30);
    
    let chargingStation="Sai Sakthi Agencies"
    if(req.body.range){
    chargingStation="Zeon Charging Station, Salem"
    }
    else{
        chargingStation="Tata Charging, Coimbatore"
    }
    let bkid=await sha1(hour+min+day+month)
    let data={
        "bkid": bkid,
        "csid": "cs029",
        "place":chargingStation,
        "duration": 0,
        "finish": 0,
        "price": 0,
        "slot": {
            "d": day,
            "hr": hour,
            "m": month,
            "mn": min,
            "y": year
        },
        "evseid": "CS002T2E01",
        "usid":"63838"
    }

    const dbRef = ref(getDatabase());
    get(child(dbRef, `bookings/`))

    .then((snapshot) => {
        let list=snapshot.val()
        console.log(list)
        list.push(data)
        const dbRef = getDatabase();
        const updates = {};
        updates[`bookings/`] = list;
        //console.log(ref(db))
        update(ref(dbRef), updates);
        
        
        
        
        
        res.send(data)

})


})

//-------------------------------------------



app.get('/api1/user/addbook',async function(req,res){
    
    let data={
        "bkid": "21341",
        "csid": "cs001",
        "duration": 0,
        "finish": 0,
        "price": 0,
        "slot": {
            "d": 23,
            "hr": 8,
            "m": 5,
            "mn": 30,
            "y": 2023
        },
        "evseid": "CS001T2E01"
    }
    const dbRef = ref(getDatabase());
    get(child(dbRef, `UserDataBook/0/bookings/`))
    
    .then((snapshot) => {
        let list=snapshot.val()
        console.log(list)
        list.push(data)
        const dbRef = getDatabase();
        const updates = {};
        updates[`UserDataBook/0/bookings/`] = list;
        //console.log(ref(db))
        update(ref(dbRef), updates);
        
        
        data2={
            "bkid": "21341",
            "duration": 0,
            "evseid": "CS001T2E01",
            "finished": 0,
            "price": 0,
            "slot": {
                "d": 23,
                "hr": 8,
                "m": 5,
                "mn": 30,
                "y": 2023
            },
            "usid": "9123a923"
        }
        updates[`EVCSDataBook/0/Bookings/bookinglist`] = data2;
        //console.log(ref(db))
       
        update(ref(dbRef), updates);
        //get(child(dbRef, `UserDataBook/0/bookings/`))
       res.send("done") 


})


   
    
})

app.get('/api1/evcs/listbook',async function(req,res){
   
    const dbRef = ref(getDatabase());
    get(child(dbRef, `EVCSDataBook/0/Bookings/bookinglist`))
    
    .then((snapshot) => {
        let list=snapshot.val()[0]
        console.log(list)
        res.send(list)

})
    
   })
app.post('/api/adduser',async function(req,res){

    let user_num=req.body.user_num
    let user_roll=req.body.user_roll
    console.log(user_num)
    let user_id=await sha1(user_num)
    console.log(user_id)
    res.send({
        "user_num":user_num,
        "user_id":user_id
    })
    const db = getDatabase();
    console.log(db)
    const updates = {};
    updates[`User_DB/${user_id}`] = {"qs":[1000],"email":user_roll};
    console.log(ref(db))
    update(ref(db), updates);

  })

// add db data -----
  app.get('/api/db1',async function(req,res){

    //let user_num=req.body.user_num
    //console.log(user_num)
    //let user_id=await sha1(user_num)
    //console.log(user_id)
    /*
    res.send({
        "user_num":user_num,
        "user_id":user_id
    })*/
    res.send('done')
    
    const db = getDatabase();
    const updates = {};
    updates[`qrr_DB/`] = [
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      {"q_left":3,"q_tot":3,"q_type":1},
      
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},
      {"q_left":3,"q_tot":3,"q_type":2},

      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      {"q_left":2,"q_tot":2,"q_type":3},
      
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},
      {"q_left":2,"q_tot":2,"q_type":4},

      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},
      {"q_left":1,"q_tot":1,"q_type":5},

    ];
    update(ref(db), updates);

  })

// -----

  app.post('/api',async function(req,res){
    console.log('came')
    let User_ID=req.body.user_ID
    console.log(User_ID)
    let qr_id_proxy=req.body.QR_id_p
    let qr_id = qr_proxy2.indexOf(qr_id_proxy);
    console.log(qr_id)

    if (qr_id>=56 && qr_id<=70){
     // type.innerHTML="Empty Question"
      //points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/empty2.png"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
        "qr_status":"1",
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else if (qr_id>=71 && qr_id<=95){
     // type.innerHTML="Funny Question"
      //points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/no-questions2.jpg"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
        "qr_status":"1" ,
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else if (qr_id>=96 && qr_id<=110){
    //  type.innerHTML="Hint Question"
    //  points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/no-questions.jpg"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
       
        "qr_status":"1" ,
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else if (qr_id>=111 && qr_id<=130){
    //  type.innerHTML="Jackpot Question"
     // points.innerHTML="5 pts"
      let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/empty/no-questions3.jpg"
      let SendObj={
        "UserID":User_ID,
        "QR_ID":qr_id,
        "Q_Link":Ques_Curr_Link,
       
        "qr_status":"1" ,
        "question-status":"2"
      }

      res.send(SendObj)
    }
    else{
    
    }
    
    //let qr_id=qr_proxy[qr_id_proxy]
   

    const dbRef = ref(getDatabase());
    get(child(dbRef, `qrr_DB/${qr_id}/q_left`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        let Q_left=snapshot.val()
        console.log("left:",Q_left)
        if (Q_left>0)
        {
// is q there in list starts
console.log('working-1')
  const dbRef = ref(getDatabase());
  console.log('working0')
  get(child(dbRef, `User_DB/${User_ID}/qs`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log('working1')
      console.log(snapshot.val());
      let arr =  snapshot.val()
      let qthere=0
     // console.log(qr_id)
      for (var i = 0; i < arr.length; i++) {
          if (arr[i] == qr_id)
          {//console.log('true');
            qthere=1
            console.log("qr code has questions and user has picked this")
            res.send({
             qr_status:"2"   
            })
          } 
      }
      if ( qthere ==0){
     // console.log('False')
     get(child(dbRef, `qrr_DB/${qr_id}`)).then((snapshot) => {
      if (snapshot.exists()) {

        let QR_Det =  snapshot.val()
        let Ques_tot=QR_Det["q_tot"]
        
        
        let ques_n=[Ques_tot - Q_left+1]      
        let Ques_Curr_Link="https://ik.imagekit.io/hrhrhr/CH/live/"+qr_id+"/q"+ques_n+".png"
        let SendObj={
          "UserID":User_ID,
          "QR_ID":qr_id,
          "Q_Link":Ques_Curr_Link,
          "Q_type":QR_Det["q_type"],
          "qr_status":"1" ,
          "question-status":"1",
          "qr-id":qr_id,
          "question-num":ques_n
        }

        res.send(SendObj)
        console.log("qr code has questions and user has not picked this yet")
        const db = getDatabase();
        const updates = {};
        updates[ `qrr_DB/${qr_id}/q_left`] = Q_left-1;
        updates[`User_DB/${User_ID}/qs/${arr.length}`] = parseInt(qr_id);
        update(ref(db), updates);

      }
     }).catch((e)=>console.log(e))
    
    
     
    }
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  }); 
  // is q there in list ends

        }
        else{
          console.log("qr code is empty")
          res.send({
            "qr_status":"3"   
           })
        }
        //return snapshot.val()
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });



  })

