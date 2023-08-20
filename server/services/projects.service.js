const sequelize = require("../database");
const ProjectModel = sequelize.models.Projects;

/** get list of user projects */
const getProjects = async (id) => {
    const projectsCursor = await ProjectModel.findAll({
        user_id: id
    })
    console.log("projects ", projectsCursor);
    return projectsCursor;
};

/** add a project */
const addProject = async (userId, project_name) => {
    // add the project to the projects collection
    const project = await ProjectModel.create({
        title: project_name,
        user_id: userId
    });
    console.log('Project ', project);
    return {
        project_id: project.id,
        project_name
    };
}
module.exports = { getProjects, addProject };