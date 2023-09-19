import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const DesktopNav = ({ pages }) => {
    const navigate = useNavigate();
    return (
        <Container sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
            <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{ mr: 2, cursor: 'pointer' }}
                onClick={() => navigate('/')}
            >
                Todoist
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
                {pages.map((page) => (
                    <Button
                        key={page.title}
                        onClick={() => { navigate(`/${page.route}`); }}
                        sx={{ my: 2, color: '#fff', display: 'block', fontSize: '0.75rem' }}
                    >
                        {page.title}
                    </Button>
                ))}
            </Box>
        </Container>
    )
};

export default DesktopNav;
