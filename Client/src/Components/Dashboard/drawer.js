import * as React from "react";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import { CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from "react-redux";
import {logout} from '../../Store/Slices/Auth';
import {useNavigate} from 'react-router-dom';
import { getProjects, addProject } from "../../Store/Slices/Projects";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NestedList({setCreateProjectModal}) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const {isFetching, error, projectsObject}= useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const handleClick = () => {
    setOpen(!open);
  };
  
  if(error === 'Authentication Failed') {
    dispatch(logout());
  } 

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <div style={{display: 'flex', alignItems: 'center'}}>
        <ListItemButton onClick={handleClick}>
          {open ? <ArrowRightIcon style={{fontSize: '1.5rem', transform: `rotate(90deg)`}} /> : <ArrowRightIcon style={{fontSize: '1.5rem'}} />}
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>
        <AddIcon style={{cursor: 'pointer'}} onClick={() => setCreateProjectModal(true)}/>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            { !isFetching? 
              (Object.keys(projectsObject).length? (Object.keys(projectsObject).map((projectId, index) => {
                return (
                  <ListItemButton sx={{ pl: 4 }} key={index} onClick={() => navigate(`project/${projectsObject[projectId]['_id']}`)}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={projectsObject[projectId]['project_name']} />
                  </ListItemButton>
                )
                })
              ): (
                <div>-
                  No projects
                </div>
              )): (
                <div style={{textAlign: 'center'}}>
                  {error? (<span style={{color: 'red'}}> {error} </span>): <CircularProgress />}
                </div>  
              )
            }
        </List>
      </Collapse>
    </List>
  );
}

export default function ProjectDrawer({projects, projectLoaded, error}) {
  const dispatch = useDispatch();
  const [project_name, setProject_Name] = useState('');
  const {user} = useSelector((state) => state.auth);
  const [createProjectModal, setCreateProjectModal] = useState(false);

  useEffect(() => {
    if(user) {
      dispatch(getProjects());
    }
  }, []);

  const handleAddProject = async() => {
    await dispatch(addProject(project_name));
    setCreateProjectModal(false);
  }

  return (
    <div>
      <React.Fragment>
        <Drawer 
          open={true} 
          variant="permanent"
          anchor="left"
          sx={{
            '& .MuiPaper-root': {
              top: '80px'
            }
          }}
        >
          {<NestedList projects={projects} projectLoaded={projectLoaded} error={error} setCreateProjectModal={setCreateProjectModal}/>}
        </Drawer>
      </React.Fragment>
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
            <input type="text" id="project_name" value={project_name} onChange={(e) => setProject_Name(e.target.value)} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCreateProjectModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
