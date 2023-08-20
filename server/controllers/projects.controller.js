const { getProjects, addProject } = require("../services/projects.service");

const getProjectsController = async (req, res) => {
    try{
        const { id } = req.user;
        const projectsObject = await getProjects(id);
        res.send(projectsObject);
    } catch(err) {
        console.log("Error occured getProjectController", err);
        res.status(500).send("Internal Server Error");
    }
};
const addProjectsController = async (req, res) => {
    const { id } = req.user;
    const project_name = req?.body?.project_name ?? "";
    const project = await addProject(id, project_name);
    res.send({
        status: "Successfully created project",
        project
    });
};


module.exports = { getProjectsController, addProjectsController};