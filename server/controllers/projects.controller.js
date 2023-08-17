const { getProjects, addProject } = require("../services/projects.service");

const getProjectsController = async (req, res) => {
    try{
        const { email } = req.auth;
        const projectsObject = await getProjects(email);
        console.log('All projects ', projectsObject);
        res.send(projectsObject);
    } catch(err) {
        console.log("Error occured getProjectController", err);
        res.status(500).send("Internal Server Error");
    }
};
const addProjectsController = async (req, res) => {
    const { email } = req.auth;
    const project_name = req.body.project_name;
    const project = await addProject(email, project_name);
    res.send(project);
};


module.exports = { getProjectsController, addProjectsController};