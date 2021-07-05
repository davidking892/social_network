import React, { Component } from "react";
import {
    Grid,
    Typography,
    Card,
    CardActionArea,
    CardContent,
    Button,
    CardActions
} from "@material-ui/core";
import Http from "../services/Http";
import SimpleModal from "./Modal";

class Display extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            users: [],
            likes: [],
            open: false,
            editData: ""
        };
    }

    componentDidMount() {
        Http.post("api/fetchPost")
            .then(res => {
                const posts = res.data.posts.data;
                const users = res.data.users.data;
                const likes = res.data.likes;
                this.setState({
                    posts,
                    users,
                    likes
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    getUser = id => {
        return this.state.users.find(user => user.id == id);
    };

    handleStatus = (status, id) => {
        const credentials = { status, id };
        Http.post("api/like", credentials)
            .then(res => {
                this.setState({
                    likes: res.data.likes
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    getLikeStatus = (userId, postId) => {
        let data = this.state.likes.find(
            item => item.post_id == postId && item.user_id == userId
        );

        if (data) {
            return data.like;
        }
    };

    handleEdit = item => {
        this.setState({
            open: true,
            editData: item
        });
    };

    handleDelete = id => {
        Http.post("api/posts/delete", { id: id })
            .then(res => {
                if (res.data.status === 200) {
                    const { posts } = this.state;
                    const newPost = posts.filter(
                        item => item.id !== parseInt(id)
                    );
                    this.setState({
                        posts: newPost
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const { posts, users, likes } = this.state;
        const { authUser, isAuthenticated } = this.props;

        return (
            <>
                <Grid container spacing={3}>
                    <Grid className="text-center my-4" item md={12}>
                        <Typography variant="h4">
                            What other people say...
                        </Typography>
                    </Grid>
                    <Grid className="mt-2" item sm={12} md={12}>
                        <Grid
                            container
                            className="text-center px-4"
                            spacing={8}
                        >
                            {posts.map((item, index) => (
                                <Grid item md={4} sm={4} key={index}>
                                    <Card className="w-75">
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography
                                                    gutterBottom
                                                    variant="h5"
                                                    component="h2"
                                                >
                                                    {
                                                        this.getUser(
                                                            item.user_id
                                                        ).email
                                                    }
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    component="p"
                                                >
                                                    {item.message}
                                                </Typography>
                                                <Typography className="mt-2">
                                                    Posted by userName on
                                                    created_at
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    this.handleStatus(
                                                        true,
                                                        item.id
                                                    )
                                                }
                                            >
                                                {this.getLikeStatus(
                                                    authUser.id,
                                                    item.id
                                                ) == 1
                                                    ? "done"
                                                    : "Like"}
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    this.handleStatus(
                                                        false,
                                                        item.id
                                                    )
                                                }
                                            >
                                                {this.getLikeStatus(
                                                    authUser.id,
                                                    item.id
                                                ) == 0
                                                    ? "done"
                                                    : "Dislike"}
                                            </Button>
                                        </CardActions>
                                        <CardActions>
                                            {item.user_id == authUser.id && (
                                                <>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() =>
                                                            this.handleEdit(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() =>
                                                            this.handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </>
                                            )}
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                {this.state.open && (
                    <SimpleModal
                        handleClose={this.handleClose}
                        editData={this.state.editData}
                        isOpen={this.state.open}
                    />
                )}
            </>
        );
    }
}

export default Display;
