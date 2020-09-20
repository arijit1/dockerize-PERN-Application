import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class Food extends React.Component {
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
        if(this.props.addPostTest){
            this.testAddpost();
        }else if(this.props.deleteTest){
            this.testDeletePost();
        }
        else{
            this.getRequestToFetchAllBlogPost("food");
        }
        
    }

    //test function for Addinga new post
    testAddpost = () => {
        this.setState({ posts: this.props.testPostData });
    }
    testDeletePost = () =>{
        this.setState({posts: this.props.testPostData , currentPostID:this.props.deletePostid ,viewPost:true});
    }


    getRequestToFetchAllBlogPost = (param) => {
        console.log("inside food");
        axios.get('http://localhost:5001/getblog/' + param).then(resp => {

            console.log(this.props.testPostData);
            this.setState({ posts: resp.data }, () => {
                console.log(this.state.posts);
            });
        });
        //let res = axios.Get("http://localhost:5000/getblog");
        //console.log(res.data);
    }

    createFoodBlog = () => {
        this.setState({ addNew: true });
    }

    //GET METHOD
    viewPost = (e) => {
        let id = e.target.id;
        this.getRequestToFetchAllBlogPost("food");
        this.setState({ viewPost: true }, () => {
            this.setState({ currentPostID: id })
        })
    }

    //POST METHOD
    postblog = () => {
        let postTitle = document.getElementById("blogtitle").value;
        let newPostdata = document.getElementById("bloginputbody").value;
        let postId = Math.ceil(Math.random() * 10000);
        let data = {
            user_id: "853849",
            post_id: postId,
            post_name: postTitle,
            post_type: "food",
            post_data: newPostdata,
            userName: this.props.uname
        }
        //post axios call
        axios.post('http://localhost:5001/postblog', data).then(res => {
            console.log("send post data " + res)
        }).catch(err => { console.log(err) });


        this.setState({ addNew: false }, () => {

            var newBlog = document.getElementById("blogcontent");
            console.log(newBlog);
            var div = document.createElement("div");
            var title = document.createElement("div");
            title.innerHTML = postTitle;
            title.className = "title";

            div.className = "col-sm-4 postDisp bg-success";
            div.id = postId;

            div.addEventListener("click", this.viewPost, false);
            newBlog.appendChild(div).appendChild(title);
        });
        //console.log(document.getElementById("blogcontent").hasChildNodes());
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
    //PUT METHOD
    updatePostRequest = () => {
        console.log(".......")
        var newPostdata = document.getElementById("viewPostBody").value;
        let data = {
            post_data: newPostdata
        }
        axios.put('http://localhost:5001/updateblog/' + this.state.currentPostID + '/' + this.props.uname + '/' + this.state.user_id, data).then(res => {
            console.log("send post data " + res)
        }).catch(err => { console.log(err) });
        this.props.history.push("/blog");
    }

    //DELETE METHOD
    deletePost = (e) => {
        console.log("Deleting post" + this.state.currentPostID);
        axios.delete('http://localhost:5001/deleteblog/' + this.state.currentPostID + '/' + this.props.uname).then(res => {
            // console.log("Delete post  " + res);
        }).catch(err => { console.log(err) });
       // this.props.history.push("/blog");
    }

    back = () => {
        this.setState({ addNew: false, viewPost: false });
    }



    render() {
        return <>

            <span className="head-title">Food</span>
            <h2>welcome {this.props.uname}</h2>

            {this.state.viewPost === false ?
                this.state.addNew === false ?
                    <div className="container">
                        <button className="btn btn-danger" onClick={this.createFoodBlog}>Post New</button>
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
                    :
                    <div>

                        <div className="container">
                            <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-8 type-blog">
                                    <form name="registration">
                                        <div className="form-group">
                                            <h3 >Write Your Blog</h3>
                                            <label htmlFor="blogtitle">Title :</label>
                                            <input type="text" placeholder="Title" id="blogtitle" maxLength="20" required />
                                            <textarea type="text" className="form-control " id="bloginputbody" placeholder="Body..." rows="4" cols="50" required></textarea>
                                        </div>
                                    </form>
                                    <button onClick={this.back} className="btn btn-primary">Back</button>
                                    <button onClick={this.postblog} className="btn btn-primary">Submit</button>
                                </div>
                                <div className="col-sm-2"></div>
                            </div>
                        </div>
                    </div>
                : <div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                                <button onClick={this.back} className="btn btn-primary">Back</button>
                                <button onClick={this.updatePost} className="btn btn-success">Edit</button>
                                <button onClick={this.deletePost}  className="btn btn-danger">Delete</button>
                                <button onClick={this.props.onClick(this.state.currentPostID)} >erase</button>
                            </div>
                            <div className="col-sm-8 displaySelectedPost">
                                {this.state.posts.map((v) => {
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
            }
        </>
    }
}
export default Food;