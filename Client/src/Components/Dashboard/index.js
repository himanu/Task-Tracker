import ProjectDrawer from "./Sidebar";
import api from "../../api";
import { useEffect, useState } from "react";
import Project from "./Project";


export default function Home() {
  const [projectsObject, setProjectsObject] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const loadProject = async () => {
    try {
      setIsFetching(true);
      const project = (await api.getProjects()).data;
      setProjectsObject(project);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  }

  const addProject = async (project_name) => {
    const project = (await api.addProject(project_name)).data.project;
    setProjectsObject((projects) => ([
      ...projects,
      project
    ]));
  };

  useEffect(() => {
    loadProject();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <ProjectDrawer projectsObject={projectsObject} isFetching={isFetching} error={error} addProject={addProject} setSelectedProject={setSelectedProject} />
      <Project project={selectedProject}/>
    </div>
  )
}