import React from 'react';
import { BrowserRouter as router, useRouteMatch, useParams, withRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Food, Travel ,Hobbies } from './blogindex';
import '../CSS/service.css';

const Service = (props) => {
    const routematch = useRouteMatch();
    console.log("check");
    console.log(props);
    const { path, url } = useRouteMatch();
  

    return <>
        <div className="blogNavBar">
            <NavLink className="blogNavBar_blog" to={`${url}/food-type`}>FOOD</NavLink>
            <NavLink className="blogNavBar_blog" to={`${url}/travel-type`}>TRAVEL</NavLink>
            <NavLink className="blogNavBar_blog" to={`${url}/hobby-type`}>HOBBY</NavLink>
        </div>


        <Switch>
            <Route path={`${path}/food-type`}>
                <Food testPostData={[]} uname={props.bloggername}/>
            </Route>
            <Route path={`${path}/travel-type`}>
                <Travel uname={props.bloggername}/>
            </Route>
            <Route path={`${path}/hobby-type`}>
                <Hobbies testPostData={[]} uname={props.bloggername}/>
            </Route>
        </Switch>
    </>
}

export default withRouter(Service);