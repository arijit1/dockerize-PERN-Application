import React, { Component } from 'react';
import { About } from './blogindex';
import axios from 'axios';
import Service from './service';
import '../CSS/header.css';
import { BrowserRouter as Router, NavLink, Switch, Route, withRouter } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            name: "test",
            status: true,
            inputName:false
        }
    }
    

    login = () => {
        var authenticate= document.getElementById("authenticate").value;
        axios.get('http://localhost:5001/loggedin/'+authenticate).then(resp => {
            console.log(resp.data);
            this.setState({ name: authenticate, status: false ,inputName:true});
        });
    }
    logout=()=>{
        var authenticate= document.getElementById("authenticate").value;
        axios.get('http://localhost:5001/logout/'+authenticate).then(resp => {
            console.log(resp.data);
            this.setState({ status: true ,inputName:false});
        });
    }   

    render() {
        return <>
            <input id="authenticate" type="text"  placeholder="EnterName" disabled={this.state.inputName}/>
            <input type="button" onClick={this.login} value="login"/>
            <input type="button" onClick={this.logout} value="logout"/>
            {this.state.status ? <span id="nameErr"><br/>Authenticate First </span> :
                <Router>
                    <nav className="navbar navbar-expand-lg navbar-dark navBar">
                        <NavLink to="/" className="nav-item NavLink btn">Blog It Out</NavLink>
                        <NavLink to="/blog" className="nav-item NavLink btn" onClick={this.handleClick} >Blogs</NavLink>

                    </nav>
                    <hr />
                    <Switch>
                        <Route path="/" component={About} exact />
                        <Route path="/blog" render={() => <Service bloggername={this.state.name} />} />
                    </Switch>
                </Router>
            }


        </>
    }
}
export default Header;