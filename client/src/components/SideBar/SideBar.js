import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { LinearProgress } from "@material-ui/core";

import UserList from "./UserList";
import { Set } from "immutable";

const styles = (theme) => ({
    paper: {
        flex: 1,
        maxWidth: 768,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        borderRadius: 0,
    },
    searchBar: {
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        flex: 1,
    },
    searchInput: {
        fontSize: theme.typography.fontSize,
    },
    block: {
        display: "block",
    },
    addUser: {
        marginRight: theme.spacing(1),
    },
    contentWrapper: {
        // margin: "0px 16px 40px 16px",
        flex: 22,
    },
});

/**
 * Chat side container , showing users and searchbar
 * @param {Object} props
 * @param {Object.<String>} props.classes
 * @param {Function} props.onAddUser
 * @param {Boolean} props.loading
 * @param {Array.<Room>} props.rooms
 * @param {Array.<User>} props.users
 */
function SideBar({
    classes,
    onAddUser,
    loading,
    rooms,
    refreshRooms,
    users,
    searchUsers,
    fakeLoading,
    active,
    getMyRooms,
}) {
    const [filter, setFilter] = useState("");
    const ctx = Set(
        rooms.reduce(
            (acc, b) =>
                acc.concat(
                    b
                        .get("members")
                        .map((el) => {
                            return el.get("username");
                        })
                        .toJS()
                ),
            []
        )
    ).toJS();
    // const debouncedSearch = useDebounce((v) => {
    //     searchUsers(v);
    // }, 300);
    const handleOnChange = (e) => {
        setFilter(e.target.value);
        // const v = e.target.value;
        // fakeLoading();
        // debouncedSearch(v);
    };

    return (
        <Paper className={classes.paper}>
            <AppBar
                className={classes.searchBar}
                position="static"
                color="default"
                elevation={0}
            >
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <SearchIcon
                                className={classes.block}
                                color="inherit"
                            />
                        </Grid>
                        <Grid item xs>
                            <Autocomplete
                                id="combo-box-demo"
                                // getOptionLabel={(opt) => opt.username}
                                onChange={(e, v) => setFilter(v)}
                                options={ctx}
                                renderInput={(params) => (
                                    <TextField
                                        fullWidth
                                        placeholder="Search by email address, phone number, or user UID"
                                        onChange={handleOnChange}
                                        InputProps={{
                                            disableUnderline: true,
                                            className: classes.searchInput,
                                        }}
                                        {...params}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title="Reload">
                                <IconButton onClick={() => refreshRooms()}>
                                    <RefreshIcon
                                        className={classes.block}
                                        color="inherit"
                                    />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div style={{ height: "4px" }}>{loading && <LinearProgress />}</div>
            <div className={classes.contentWrapper}>
                {
                    <UserList
                        searchUsers={searchUsers}
                        users={users}
                        active={active}
                        getMyRooms={getMyRooms}
                        rooms={rooms.filter((el) => {
                            if (!filter) return true;
                            return (
                                el
                                    .get("members")
                                    .map((el) => el.get("username"))
                                    .toJS()
                                    .join(" ")
                                    .search(filter) !== -1
                            );
                        })}
                    />
                }
            </div>
        </Paper>
    );
}
// (
//     rooms.map((el) => {
//         return <p key={el._id}>{el._id}</p>;
//     })
SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);
