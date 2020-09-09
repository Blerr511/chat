import React, { useState } from "react";
import {
    SwipeableDrawer,
    TextField,
    makeStyles,
    Divider,
    Chip,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import useDebounce from "../../hooks/useDebounce.hook";
import { List, fromJS } from "immutable";
import { FaceOutlined } from "@material-ui/icons";

const styles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.default,
        height: "100%",
        width: "400px",
    },
    searchBar: {
        margin: "50px 10px",
    },
    chipContainer: {
        padding: "20px",
        display: "flex",
        flexWrap: "wrap",
    },
    chip: {
        margin: "10px",
    },
}));

const Drawer = ({ open, onOpen, onClose, searchUsers, users }) => {
    const classes = styles();

    const [addedUsers, setAddedUsers] = useState(List());

    const debounced = useDebounce((v) => {
        searchUsers(v);
    }, 300);
    const handleOnChange = (e) => {
        const v = e.target.value;
        debounced(v);
    };
    const handleOnUserSelect = (e, v) => {
        if (v) setAddedUsers((s) => s.push(fromJS(v)));
    };
    const handleOnUserDelete = (_id) => {
        const index = addedUsers.findIndex((user) => user.get("_id") === _id);
        setAddedUsers((v) => v.splice(index, 1));
    };
    return (
        <SwipeableDrawer
            open={open}
            onOpen={onOpen}
            onClose={() => {
                onClose(addedUsers);
                setAddedUsers(List());
            }}
            anchor="left"
        >
            <div className={classes.container}>
                {
                    <div className={classes.searchBar}>
                        <Autocomplete
                            onChange={handleOnUserSelect}
                            getOptionLabel={(opt) => opt.username}
                            getOptionSelected={(opt) => opt.username}
                            style={{ width: "90%", marginLeft: "20px" }}
                            options={users
                                .get("data")
                                .filter((el) => !addedUsers.includes(el))
                                .toJS()}
                            renderInput={(params) => (
                                <TextField
                                    fullWidth
                                    placeholder="Search by email address, phone number, or user UID"
                                    onChange={handleOnChange}
                                    InputProps={{
                                        disableUnderline: true,
                                        // className: classes.searchInput,
                                    }}
                                    {...params}
                                />
                            )}
                        />
                    </div>
                }
                <Divider />
                <div className={classes.chipContainer}>
                    {addedUsers.map((el) => {
                        return (
                            <Chip
                                key={el.get("_id")}
                                icon={<FaceOutlined />}
                                label={
                                    (el.get("firstName") ??
                                        el.get("username") ??
                                        "") +
                                    " " +
                                    (el.get("lastName") ?? "")
                                }
                                onDelete={handleOnUserDelete}
                                className={classes.chip}
                            />
                        );
                    })}
                </div>
            </div>
        </SwipeableDrawer>
    );
};

export default Drawer;
