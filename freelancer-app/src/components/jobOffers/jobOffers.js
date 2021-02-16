import { makeStyles } from '@material-ui/core/styles';
import { URL } from '../../constants';
import React, { useState, useContext, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../../userContext';
import axios from 'axios'
import JobList from '../jobs/jobsList'
import Popup from '../FormModal/popup'

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        boxShadow: 'none',
        marginBottom: '10vh',
    },
    title: {
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: '#3b1687',

    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }

});


export default function UserPage(props) {

    const [jobOffers, setJobOffers] = useState(null);
    const { user } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const classes = useStyles();
    const [popupTitle, setpopupTitle] = useState("");
    const [popupDescription, setpopupDescription] = useState("");
    const [price, setPrice] = useState(-1);
    const [customerId, setCustomerId] = useState(-1);
    const [projectId, setProjectId] = useState(-1);

    const accept = (event, description, title, price, customerId, projectId) => {
        event.preventDefault();
        setpopupTitle(title);
        setpopupDescription(description);
        setPrice(price);
        setCustomerId(customerId);
        setProjectId(projectId);


        setIsOpen(true);

    }


    useEffect(() => {
        getJobOffers();
    }, [user]);

    const getJobOffers = () => {
        axios.get(URL + `api/freelancerApi/projects`, { withCredentials: true, credentials: 'include' })
            .then((response) => {
                setJobOffers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    if (!user) {
        return (
            <>
            </>
        )
    }
    return (
        <Paper className={classes.container}>
            <div className={classes.headerContainer}>
                <h1 className={classes.title}>{user.first_name} welcome!</h1>

                <Typography />
                <h3 className={classes.title} style={{ margin: '0' }}> Here are some interesting job offers for you</h3>
            </div>
            { jobOffers ? <JobList jobs={jobOffers} accept={accept} user={user} /> : null}

            <Popup

                user={user}
                openPopup={isOpen}
                setOpenPopup={setIsOpen}
                title={'Create map for - ' + popupTitle}
                customerId={customerId}
                price={price}
                description={popupDescription}
                projectId={projectId}
                setClosePopup={setIsOpen}
            />
        </Paper >
    )
}