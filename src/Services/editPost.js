import React from 'react';
import { updatePost_PUT, deletePost_DELETE } from './API/api';

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPostID: props.postid,
            posts: props.posts
        }
    }

    updatePost = (e) => {
        console.log("updating post" + this.state.currentPostID);
        document.getElementById("viewPostBody").disabled = false;
        // document.getElementById("editThePost").disabled=false;
        var button = document.createElement("button");
        button.innerHTML = "Done";
        button.addEventListener("click", this.updatePostRequest, false)
        //document.getElementById("viewPostBody").appendChild(button);
        document.getElementById("postViewEdit").appendChild(button);
    }

    updatePostRequest = () => {
        console.log(".......")
        var newPostdata = document.getElementById("viewPostBody").value;
        let data = {
            post_data: newPostdata
        }
        let id = this.state.currentPostID;
        let name = this.props.uname;
        let userId = this.props.userId;
        updatePost_PUT(data, id, name, userId).then(() => { this.props.handleBack(); });
    }

    deletePost = () => {
        let id = this.state.currentPostID;
        let name = this.props.uname;
        deletePost_DELETE(id, name).then(() => { this.props.handleBack(); 
         // this.props.history.push("/blog");
        });
    }

    render() {
        return <>
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-2">
                            <button onClick={this.props.handleBack} className="btn btn-primary">Back</button>
                            <button onClick={this.updatePost} className="btn btn-success">Edit</button>
                            <button onClick={this.deletePost} className="btn btn-danger">Delete</button>
                            {/* <button onClick={this.props.onClick(this.state.currentPostID)} >erase</button> */}
                        </div>
                        <div className="col-sm-8 displaySelectedPost">
                            {this.state.posts.map((v) => {
                                console.log(v, this.state.currentPostID)
                                if (v.post_id === this.state.currentPostID) {
                                    return <div key={v.post_id}>
                                        <p className="postViewTitle">  {v.post_name}</p>
                                        <div id="postViewEdit">
                                            <input type="text" className='postViewBody' id="viewPostBody"
                                                placeholder={v.post_data} disabled></input>
                                        </div>
                                    </div>
                                }
                            })}
                        </div>
                        <div className="col-sm-2">

                        </div>
                    </div>
                </div>
            </div>
        </>
    }

}
export default EditPost;