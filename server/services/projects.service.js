const sequelize = require("../database");
const ProjectModel = sequelize.models.Projects;
/** get list of user projects */
const getProjects = async (email) => {
    const projectsCursor = await ProjectModel.findOne({
        user_id: email
    })
    const projectsObject = {};
    await projectsCursor.forEach((project) => {
        projectsObject[project._id] = project;
    })
    return projectsObject;
};

/** add a project */
const addProject = async (userEmail, project_name) => {
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
}
module.exports = { getProjects, addProject };