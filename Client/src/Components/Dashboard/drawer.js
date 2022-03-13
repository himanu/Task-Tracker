import * as React from "react";
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

function NestedList({projects, setCreateProjectModal}) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

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
            {Object.keys(projects).map((projectId, index) => {
              return (
                <ListItemButton sx={{ pl: 4 }} key={index}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={projects[projectId]['project_name']} />
                </ListItemButton>
              )
            })}
        </List>
      </Collapse>
    </List>
  );
}

export default function ProjectDrawer({projects, setCreateProjectModal}) {
  console.log('projects ', projects);
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
          {<NestedList projects={projects} setCreateProjectModal={setCreateProjectModal}/>}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
