import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import Tasks from "../Tasks";
import {useParams} from 'react-router-dom';

export default function Project() {
  let params = useParams();
  const projectId = params.projectId;
  const {projectsObject} = useSelector((state) => state.projects);
  const project = projectsObject[projectId];

  if(!project) {
    return <CircularProgress />
  }
  return (
    <div style={{flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column'}}>
      <div style={{fontSize: '1.25rem', fontWeight: 500}}>
        {project && project.project_name}
      </div>
      <div>
        <h6>Tasks</h6>
      </div>
      {project && <Tasks projectId={projectId}/>}
    </div>
  )
}