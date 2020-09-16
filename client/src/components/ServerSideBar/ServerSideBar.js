import {
    Button,
    Collapse,
    Divider,
    ListItem,
    makeStyles,
    Paper,
    Typography,
} from "@material-ui/core";
import { ChevronRight, ExpandMore, PersonAdd } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
        flex: 1,
        maxWidth: 768,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        borderRadius: 0,
        backgroundColor: theme.palette.background.default,
        height: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(3),
    },
    title: {
        fontSize: theme.typography.pxToRem(24),
    },
    inviteBlock: {
        flex: 6,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
    },
    roomContainer: {
        flex: 16,
        paddingTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
    },
    roomHeaderTitle: {
        background: "none!important",
        color: theme.palette.grey[300],
        justifyContent:'flex-start'
    },
}));

const ServerSideBar = ({ name, rooms }) => {
    const classes = useStyles();
    const [textChannelExpanded, setTextChannelExpanded] = useState(false);
    const handleTextExpandClick = () => {
        setTextChannelExpanded((v) => !v);
    };
    return (
        <Paper className={classes.paper}>
            <Paper className={classes.header} elevation={1} square>
                <Typography
                    component="span"
                    variant="body2"
                    className={classes.title}
                    color="textPrimary"
                >
                    {name}
                </Typography>
            </Paper>
            <div className={classes.inviteBlock}>
                <PersonAdd color="action" style={{ width: 50, height: 50 }} />
                <Typography
                    style={{
                        margin: "30px 15% 30px 15%",
                    }}
                >
                    {"Invite more peoples to your server and enjoy"}
                </Typography>
                <Button color="primary" variant="contained">
                    Invite people
                </Button>
            </div>
            <Divider />
            <div className={classes.roomContainer}>
                <Button
                    variant="text"
                    onClick={handleTextExpandClick}
                    disableElevation
                    disableRipple
                    disableFocusRipple
                    className={classes.roomHeaderTitle}
                >
                    {textChannelExpanded ? <ExpandMore /> : <ChevronRight />}
                    Text channels
                </Button>
                <Collapse in={textChannelExpanded}>
                    {rooms &&
                        rooms.map((el) => {
                            console.log(el);
                            return (
                                <ListItem key={el.get("_id")}>
                                    <Button variant="text">
                                        {el.get("name")}
                                    </Button>
                                </ListItem>
                            );
                        })}
                </Collapse>
            </div>
        </Paper>
    );
};

export default ServerSideBar;
