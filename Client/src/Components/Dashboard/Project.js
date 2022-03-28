import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Todo from "../Todo";

function getProjectId() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get('projectId');
}

export default function Project() {
  const projectId = getProjectId();
  const {projectsObject} = useSelector((state) => state.projects);
  const project = projectsObject[projectId];

  if(!project) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
  return (
    <div>
      <div style={{fontSize: '1.25rem', fontWeight: 500}}>
        {project && project.project_name}
      </div>
      <div>
        <h6>Tasks</h6>
      </div>
      {project.tasks.length === 0 && <Todo />}
    </div>
  )
}