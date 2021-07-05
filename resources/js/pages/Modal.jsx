import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

export default function TransitionsModal(props) {
    const classes = useStyles();
    const { id, message } = props.editData;

    const [data, setData] = React.useState(message);

    const handleChange = e => {
        setData(e.target.value);
    };

    const handleSave = e => {
        Http.post("api/post/edit", {
            message: data
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.isOpen}
                onClose={props.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500
                }}
            >
                <Fade in={props.isOpen}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Edit Post</h2>

                        <div className="form-group">
                            <textarea
                                className="form-control"
                                name="post-body"
                                id="post-body"
                                rows="5"
                                value={data}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="modal-footer mt-3">
                            <Button
                                className="mx-2"
                                variant="contained"
                                color="primary"
                                onClick={props.handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                className="mx-2"
                                variant="contained"
                                color="secondary"
                                onClick={handleSave}
                            >
                                Save changes
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
