
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://himanshu:vyCSGizSAW9atSf@cluster0.zmg0v.mongodb.net/Todoist?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let isClientConnected = false;
async function connectTheClient() {
  if(isClientConnected) {
    return;
  }
  await client.connect();
  isClientConnected = true;
}
const db = {
  async signInUser({email, name, picture}) {
    await connectTheClient();
    let user = await client.db().collection('Users').findOne({email});

    if(!user) {
      user = await client.db().collection('Users').insertOne({
        email,
        name,
        picture
      });
    }
    console.log('User ', user);
  },
  async addProject(userEmail, project_name) {
    await connectTheClient();
    // add the project to the projects collection
    const project = await client.db().collection('projects').insertOne({
      project_name,
      userEmail,
      tasks: []
    })
    console.log('Project ', project);
    const projectId = project.insertedId;

    return {
      _id: projectId,
      project_name,
      userEmail,
      tasks: []
    };
  },
  
  async getProjectById(projectId) {
    await connectTheClient();
    const document = await client.db().collection('projects').findOne({
      _id: projectId
    });
    return document;
  },
  async getProjects(email) {
    await connectTheClient();
    const projectsCursor = await client.db().collection('projects').find({
      userEmail: email
    })
    const projectsObject = {};
    await projectsCursor.forEach((project) => {
      projectsObject[project._id] = project;
    })
    return projectsObject;
  }, 
  async addTask({projectId, taskHeading, taskDescription}) {
    await connectTheClient();
    const task = await client.db().collection('tasks').insertOne({
      taskHeading,
      taskDescription,
      parentProject: projectId,
      completed: false
    })
    await client.db().collection('projects').findOneAndUpdate(
      {
        _id: new ObjectId(projectId),
      }, {
        $push: {
          tasks: task.insertedId
        }
      }, {
        returnDocument: 'after'
      }
    )
    return {
      _id: task.insertedId,
      taskHeading,
      taskDescription,
      parentProject: projectId,
      completed: false
    }
  }
}
module.exports = { db };