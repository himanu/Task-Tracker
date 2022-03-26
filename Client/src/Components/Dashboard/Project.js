import { useSelector } from "react-redux";

function getProjectId() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get('projectId');
}

export default function Project() {
  const projectId = getProjectId();
  const {projectsObject} = useSelector((state) => state.projects);
  const project = projectsObject[projectId];
  console.log('Project ', project);
  return (
    <div>
      <div style={{fontSize: '1.25rem', fontWeight: 500}}>
        {project.project_name}
      </div>
    </div>
  )
}