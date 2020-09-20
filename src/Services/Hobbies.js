import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import { hobby_GET, postblog } from './API/api';
import { WritetPost, EditPost } from './blogindex';

class Hobbies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '853849',
            addNew: false,
            viewPost: false,
            currentPostID: "",
            posts: []
        }
    }
    componentDidMount() {
        hobby_GET("hobby")
            .then((data) => { let postdata = data; this.setState({ posts: postdata }) });
    }
    createHobbyBlog = () => {
        this.setState({ addNew: true });
    }
    viewPost = (e) => {
        let id = e.target.id;
        //this.getRequestToFetchAllBlogPost("hobby");
        this.setState({ currentPostID: id }, () => this.setState({ viewPost: true }));
    }
    back = () => {
        hobby_GET("hobby")
            .then((data) => {
                let postdata = data; this.setState({ posts: postdata })
                this.setState({ addNew: false, viewPost: false });
            });
    }

    render() {
        return <>
            {this.state.viewPost === false ?
                this.state.addNew === false ?
                    <div>
                        <span className="head-title">Hobby</span>
                        <h2>welcome {this.props.uname}</h2>
                        <div className="container">
                            <button className="btn btn-danger" onClick={this.createHobbyBlog}>Post New</button>
                            <div className="row" id="blogcontent">
                                {this.state.posts.map((v) => {
                                    return <div className="col-sm-4 postDisp " data-testid={v.post_id} id={v.post_id} key={v.post_id} onClick={this.viewPost}>
                                        <div className="title" key={v.post_id}>
                                            {v.post_name}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    : <WritetPost handleBack={this.back} />
                : <EditPost userId={this.state.user_id} postid={this.state.currentPostID} posts={this.state.posts} handleBack={this.back} />
            }
        </>
    }
}
export default Hobbies;