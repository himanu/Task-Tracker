import Tasks from "../Tasks";
import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

export default function Project({project}) {
  const { user } = useContext(UserContext);
  return (
    <>
      {!project ? (
        <div style={{ margin: '1em' }}>
          Welcome {user.name}, please select one of the project
        </div>) : (
        <div style={{flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column'}}>
          <div style={{fontSize: '1.25rem', fontWeight: 500}}>
            {project?.title ?? ""}
          </div>
          <div>
            <h6>Tasks</h6>
          </div>
          <Tasks projectId={project?.id ?? null} />
        </div>
      )}
    </>
  )
}