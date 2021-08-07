import express from "express";
import fetch from "node-fetch";
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
// import mongoose from "mongoose";
const app = express();
const port = 9683;
let db
var MongoClient = mongodb.MongoClient;
// var url = 'mongodb://localhost:27017/Quanlythongtin';
MongoClient.connect("mongodb://localhost:27017", (err, client) => {
    if (err) {
        return console.log(err)
    }
    db = client.db("Quanlythongtin")
    // console.log("Đã kết nối tới Database")
})
// MongoClient.connect('mongodb://127.0.0.1:27017/Quanlythongtin', function(err, db) {
//     if (err) throw err;
//     var Products = db.collection('Products');
//     Products.findOne({}, function (err,res) {
//         //nếu có lỗi
//         if (err) throw err;
//         //nếu thành công
//         console.log(res);
//     });
//     db.close();
// });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//         console.log('Unable to connect to the mongoDB server. Error:', err);
//     } else {
//         console.log('Connection established to', url);
//         var collection = db.collection('Product');
//         var user1 = { name: 'modulus admin', age: 43, roles: ['admin', 'moderator', 'Product'] };
//         var user2 = { name: 'modulus user', age: 30, roles: ['Product'] };
//         var user3 = { name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'Product'] };
//         collection.insert([user1, user2, user3], function (err, result) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('Inserted %d documents into the "Quanlythongtin" collection. The documents inserted with "_id" are:', result.length, result);
//             }
//         });
//     }
// });
//         collection.update({ name: 'modulus user' }, { $set: { enabled: false } }, function (err, numUpdated) {
//             if (err) {
//                 console.log(err);
//             } else if (numUpdated) {
//                 console.log('Updated Successfully %d document(s).', numUpdated);
//             } else {
//                 console.log('No document found with defined "find" criteria!');
//             }
//             //Close connection
//             db.close();
//         });
// const con= mongoose.connection;
// app.use(express.json());
// try{
//     con.on('open',() => {
//         console.log('connected');
//     })
// }catch(error)
// {
//     console.log("Error: "+error);
// }

app.get("/btc-price", async (req, res,) => {
    const response = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const rs = await response.json();
    // console.log(rs);
    // console.log(typeof (rs));
    res.render('app');
    // console.log('DEMO', db);
})

// cai nay em de lam gi nhi?
// Dòng 74 là đê tích hợp Fe và be bằng ejs còn đâu mục đích là lấy api của coinbase a ạ
// cái này là lấy api à?
// Vâng anh
app.get("/btc-currentprice", async (req, res) => {
    // res.send("Hello World I am Kien");

    const response = await fetch('https://api.coinbase.com/v2/prices/spot?currency=USD');
    const rs = await response.json();
    // console.log(rs);
    // console.log(typeof (rs));
    // res.json(rs);
    res.render('indexx');
});


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/get-btc-price',function (req,res) {
    console.log('GET')
    db.collection("Product").find().toArray().then(results =>{
        res.json(results)
        // chỗ này là khi mình gửi request dạng "GET" với địa chỉ "/btc-price" thì mình lấy data
        // từ trong db ra. ĐÓ em đang gặp khó trong vc lấy data từ mongo
        // hàm này là để lấy data, results chứa data lấy được, sau đó chỉ cần chuyển nó sang json
        //  và gửi về cho client
        // vậy là client nhận được data
        // La NÓ SẼ xuất hiện ở form 1 à  a. E chỉ biết là dùng hàm fineOne gi đó
        // findOne là tìm 1 kết quả, vậy find chắc là tìm tất cả, giống như SELECT * FROM 'Product' ấy
        // Hợp lý a ạ
        // vậy client nhận đượckết quả rồi, thì giờ mình xử lý phía client tiếp

    }).catch(error => {
        // console.error(error)
    })
});

app.post('/btc-price',(req, res)=>{
    //    console.log("Đã nhận request", req.body)
    console.log('POST')
    db.collection("Product").insertOne(req.body).then(results => {
    
    res.json(results)
}).catch(error => {
    console.error(error)
   })
})
// app.get('/Product/:610c00747e3fa80434a40db6',function(req,res){
//     db.collection("Product",function(err,collection){
//         console.log(req.params.id);
//         collection.findOne({_id: req.params._610c00747e3fa80434a40db6},function(err, doc) {
//             if (doc){
//                 console.log(doc._610c00747e3fa80434a40db6);
//             } else {
//                 console.log('no data');
//             }
//         });
//     });
//     res.render(indexx)
//     });
app.listen(port, () => console.log("Linstening on port" + port));
