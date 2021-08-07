import mongodb from 'mongodb'

var MongoClient = mongodb.MongoClient;

var url = 'mongodb://localhost:27017/Quanlythongtin';


MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);


        var collection = db.collection('Product');
        var user1 = { name: 'modulus admin', age: 88, roles: ['admin', 'moderator', 'Product'] };
        var user2 = { name: 'modulus user', age: 30, roles: ['Product'] };
        var user3 = { name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'Product'] };


        collection.insert([user1, user2, user3], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "Quanlythongtin" collection. The documents inserted with "_id" are:', result.length, result);
            }
            collection.update({ name: 'kien' }, { $set: { enabled: false } }, function (err, numUpdated) {
                if (err) {
                    console.log(err);
                } else if (numUpdated) {
                    console.log('Updated Successfully %d document(s).', numUpdated);
                } else {
                    console.log('No document found with defined "find" criteria!');
                }
                //Close connection
                db.close();
            });
            db.close();
        });
    }
});