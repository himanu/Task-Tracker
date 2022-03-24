import { useSelector } from "react-redux";

function getProjectId() {
  const queryParams = new URLSearchParams(window.location.search);
  return queryParams.get('projectId');
}

export default function Project() {
  const {projectsObject} = useSelector((state) => state.projects);
  const projectId = getProjectId();
  return (
    <div>
      <div style={{fontSize: '1.25rem'}}>
        
      </div>
    </div>
  )
}