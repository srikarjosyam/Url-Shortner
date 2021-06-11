import { AppBar,IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Body } from "./body";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

export const HomePage =()=>{
    
    const classes = useStyles();

    return(
        <>
        <AppBar style={{background:'black'}} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Url Shortner
          </Typography>
        </Toolbar>
      </AppBar>
      <Body/>
      </>
    )
}