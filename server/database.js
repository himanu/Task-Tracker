
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://himanshu:vyCSGizSAW9atSf@cluster0.zmg0v.mongodb.net/Todoist?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = {
  async signInUser({email, name, picture}) {
    await client.connect();
    let user = await client.db().collection('Users').findOne({email});

    if(!user) {
      user = await client.db().collection('Users').insertOne({
        email,
        name,
        picture,
        projects: []
      });
    }
    return user;
  },
  async addProject(email, project_name) {
    await client.connect();
    // add the project to the projects collection
    const project = await client.db().collection('projects').insertOne({
      project_name,
      tasks: []
    })
    console.log('Project ', project);

    const document = await client.db().collection('Users').findOneAndUpdate({
        email
      }, {
        $addToSet: {
          'projects': project.insertedId
        }
      }, {
        returnDocument: 'after'
      }
    )
    if(!document)
      return "Authentication error";
    else {
      console.log('document ', document.value.projects);
    }
    
  },
  
  async getProject(projectId) {
    await client.connect();
    const document = await client.db().collection('projects').findOne({
      _id: projectId
    });
    return document;
  },
  async getProjects(email) {
    const user = await client.db().collection('Users').findOne({
      email
    });
    const projectIdArray = user.projects;
    console.log('projectIdArray ', projectIdArray);
    const projectsObject = {};
    for(let i = 0; i<projectIdArray.length; i++) {
      const document = await this.getProject(projectIdArray[i]);
      projectsObject[(projectIdArray[i])] = document;
    }
    return projectsObject;
  }
}
module.exports = { db };