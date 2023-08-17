
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://himanshu:qcubT8ivsd4DHsn4@cluster0.zmg0v.mongodb.net/Todoist?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect().then(() => console.log("Connected"));

// const db = {  
//   async getProjectById(projectId) {
//     const document = await client.db().collection('projects').findOne({
//       _id: projectId
//     });
//     return document;
//   }
// }
// module.exports = { db };

module.exports = client;