import { makeStyles } from '@material-ui/core/styles';
import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';


const useStyles = makeStyles({
    container: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '25vw',
        borderRadius: 10,
        height: 'fit-content',
        margin: 20,
        marginTop: 0
    },
    description: {
        display: 'flex',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 0
    },
    flagContainer: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    title: {
        marginTop: 10,
        fontSize: '2.5vh',
        fontWeight: 500,
    }
});


export default function Goal(props) {
    const classes = useStyles();
    return (
        <div className={ classes.container } style={ { backgroundColor: props.color } } onClick={ () => props.editGoal(props.id) }>
            {props.meaningful ? <div className={ classes.flagContainer }><PriorityHighIcon className={ classes.flagOutlined } /></div> : null }

            <h1 className={ classes.title }>
                { props.title }
            </h1>

            <p className={ classes.description }>
                { props.description }
            </p>

            <Box width='80%' display="flex" alignItems="center">
                <Box width="90%" mr={ 1 }>
                    <LinearProgress variant="determinate" style={ { width: '100%' } } value={ props.progress } />
                </Box>
                <Box minWidth={ 35 }>
                    <Typography variant="body2" color="textSecondary">
                        { `${props.progress}%` }
                    </Typography>
                </Box>
            </Box>
        </div>
    )
}


