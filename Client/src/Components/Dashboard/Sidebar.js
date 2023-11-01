import * as React from "react";
import { useState } from "react";
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
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function NestedList({ setCreateProjectModal, projectsObject, isFetching, error, setSelectedProject }) {
  const [open, setOpen] = useState(true);

  return (
    <List
      sx={{ width: "100%" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ListItemButton onClick={() => setOpen(!open)}>
          <ArrowRightIcon style={{ fontSize: '1.5rem', ...(open && { transform: `rotate(90deg)` }) }} />
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>
        <AddIcon style={{ cursor: 'pointer' }} onClick={() => setCreateProjectModal(true)} />
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {!isFetching ?
            projectsObject.length ? projectsObject.map(({ id, title }, index) => {
              return (
                <ListItemButton sx={{ pl: 4 }} key={index} onClick={() => setSelectedProject({id, title})}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              )
            })
              : (
                <div>-
                  No projects
                </div>
              ) : (
              <div style={{ textAlign: 'center' }}>
                {error ? (<span style={{ color: 'red' }}> {error} </span>) : <CircularProgress />}
              </div>
            )
          }
        </List>
      </Collapse>
    </List>
  );
}

export default function ProjectDrawer({ addProject, ...props }) {
  const [project_name, setProject_Name] = useState('');
  const [createProjectModal, setCreateProjectModal] = useState(false);


  const handleAddProject = async () => {
    await addProject(project_name);
    setCreateProjectModal(false);
  }

  return (
    <div style={{ borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
      <Drawer
        open={true}
        variant="permanent"
        anchor="left"
        sx={{
          '& .MuiPaper-root': {
            position: 'relative',
            border: '0',
            backgroundColor: "initial"
          }
        }}
      >
        <NestedList setCreateProjectModal={setCreateProjectModal} {...props} />
      </Drawer>
      <Modal
        show={createProjectModal}
        onHide={() => setCreateProjectModal(false)}
        backdrop="static"
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
