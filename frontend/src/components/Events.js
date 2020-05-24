import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Event(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative"className={classes.topBar}>
                {JSON.stringify(props.role)}
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        EventBooker
          </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Events
            </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Look at below events and book yourself on one of the cars for transport!
            </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {props.events.map((event, idx) => (
                            <Grid item key={idx} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {event.name}
                                        </Typography>
                                        <Typography>
                                        {event.description}
                                    </Typography>
                                    <Typography>
                                        Location: {event.location}
                                    </Typography>
                                    </CardContent>
                                    <CardActions>

                                        <button type="button" 
                                            className="btn btn-primary" 
                                            data-toggle="modal"
                                            id={event.event_id} 
                                            data-target="#exampleModalLong"
                                            onClick={props.handleEventClick}
                                            >
                                            View
                                        </button>

                                        <Typography>
                                        {event.date}
                                    </Typography>
                                    <Typography>
                                        | {event.amount_of_people} people
                                    </Typography>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}