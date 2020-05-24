import React from 'react';
import { Button, Select, MenuItem, InputLabel, TextField } from '@material-ui/core';
import ToggleButton from "@material-ui/lab/ToggleButton";
import useStyles from '../styles/Events'

export default function AddEvent(props) {
    const [selected, setSelected] = React.useState(false);
    const classes = useStyles();

    if (selected) 
        return (
            <div className={classes.addEventContainer}>
                <ToggleButton
                    value="check"
                    selected={selected}
                    onChange={() => {
                        setSelected(!selected);
                    }}
                    >
                    X
                </ToggleButton>
                <form className={classes.form} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="addEventName"
                        label="Name of event"
                        name="addEventName"
                        autoComplete="name"
                        autoFocus
                        onChange={props.handleInputChange}
                        value={props.state.addEventName}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="addEventDescription"
                        label="Description"
                        type="description"
                        id="addEventDescription"
                        autoComplete="description"
                        onChange={props.handleInputChange}
                        value={props.state.addEventDescription}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="addEventDate"
                        label="Date for event"
                        type="date"
                        id="addEventDate"
                        autoComplete="date"
                        onChange={props.handleInputChange}
                        value={props.state.addEventDate}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="addEventAmoutOfPeople"
                        label="Amount of people"
                        type="number"
                        id="addEventAmoutOfPeople"
                        autoComplete="Amount of people"
                        onChange={props.handleInputChange}
                        value={props.state.addEventAmoutOfPeople}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="addEventLocation"
                        label="Location"
                        type="description"
                        id="addEventLocation"
                        autoComplete="Location"
                        onChange={props.handleInputChange}
                        value={props.state.addEventLocation}
                    />
                    <InputLabel id="typeLabel">(Optional) Choose a type</InputLabel>
                    <Select
                        labelId="typeLabel"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="addEventCarType"
                        id="addEventCarType"
                        onChange={props.handleInputChange}
                        // onChange={e => console.log(e.target)}
                        value={props.state.addEventCarType}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="A">A</MenuItem>
                        <MenuItem value="B">B</MenuItem>
                        <MenuItem value="C">C</MenuItem>
                        <MenuItem value="D">D</MenuItem>
                        <MenuItem value="E">E</MenuItem>
                    </Select>
                    <InputLabel id="seatsLabel">(Optional) Minimum number of seats for cars (0-9)</InputLabel>
                    <Select
                        labelId="seatsLabel"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="addEventCarNumberOfSeats"
                        id="addEventCarNumberOfSeats"
                        onChange={props.handleInputChange}
                        value={props.state.addEventCarNumberOfSeats}
                    >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7</MenuItem>
                        <MenuItem value="8">8</MenuItem>
                        <MenuItem value="9">9</MenuItem>
                    </Select>
                    <hr></hr>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={props.addEvent}
                    >
                        Add new event
                        </Button>
                </form>
            </div>
        ); else 
            return (
                <div className={classes.addEventContainer}>
                    <ToggleButton
                    value="check"
                    selected={selected}
                    onChange={() => {
                        console.log(selected);
                        setSelected(!selected);
                    }}
                    >
                    Open Event Creator
                    </ToggleButton>
                </div>
            )
    
}