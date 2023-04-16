import {AppBar, Toolbar, IconButton, Typography , Button} from '@mui/material';
import {Menu } from '@mui/icons-material';

const Navbar = () => {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" style={style}>
                        React User Application
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

const style = {
    flexGrow: 1
}

export default Navbar;