import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectDrawer from "./drawer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
export default function Home() {
  const [projects, setProjects] = useState({});
  const [tasks, setTasks] = useState({});
  const {user} = useSelector((state) => state.auth);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  const [projectLoaded, setProjectLoaded] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setTimeout(() => {
      setProjects({
        0: {
          project_id: 0,
          project_name: 'Todo App',
          project_tasks: [0]
        }
      });
      setProjectLoaded(true);
      setTasks({
        0: {
          task_id: 0,
          task_title: 'UI',
          subtasks: [1],
          parent_task: null
        },
        1: {
          task_id: 1,
          task_title: 'Server',
          subtasks: [],
          parent_task: 0
        }
      });
    }, 1500);
    console.log('user ', user);
  }, []);
  console.log('projectLoaded ', projectLoaded);
  return (
    <div>
      <ProjectDrawer projects={projects} projectLoaded={projectLoaded} error={error} setCreateProjectModal={setCreateProjectModal}/>
      Hii {user.given_name}
      <p>
        Welcome to the todoist <br/>
        You can create new project or can see the todos of your previous projects by clicking the project on left sidebar.
      </p>
      <Modal
        show={createProjectModal}
        onHide={() => setCreateProjectModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="project_name">
              Name
            </label>
            <br />
            <input type="text" id="project_name" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCreateProjectModal(false)}>
            Cancel
          </Button>
          <Button variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}