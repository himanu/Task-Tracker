import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProjectDrawer from "./drawer";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { getProjects } from "../../Store/Slices/Projects";

export default function Home() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const [createProjectModal, setCreateProjectModal] = useState(false);
  useEffect(() => {
    if(user) {
      dispatch(getProjects());
    }
  }, []);

  return (
    <div>
      <ProjectDrawer setCreateProjectModal={setCreateProjectModal}/>
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