import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { inviteServices } from "../../services/invite.service";

const DialogCreateInvite = ({ open, handleOnClose, server }) => {
    const classes = styles();
    const [token, setToken] = useState("");
    useEffect(() => {
        if (open)
            inviteServices
                .generate({
                    serverId: server.get("_id"),
                })
                .then((data) => {
                    console.log(data.data);
                    setToken(data.data);
                })
                .catch(console.error);
    }, [open, server]);
    return (
        <Dialog open={open} onClose={handleOnClose}>
            <DialogTitle>
                <Typography style={{ textAlign: "center" }}>
                    Invite friends to server {server.get("name")}
                </Typography>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    name="inviteToken"
                    fullWidth
                    value={window.location.href + "invite/" + token}
                />
            </DialogContent>
            <DialogActions>
                <div className={classes.wrapper}></div>
            </DialogActions>
        </Dialog>
    );
};

const styles = makeStyles((theme) => ({
    dialogContent: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minWidth: "500px",
    },
    wrapper: {
        margin: theme.spacing(1),
        position: "relative",
    },
}));

export default DialogCreateInvite;
