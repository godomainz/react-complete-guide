import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import classes from './Blog.module.css';
import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts';

interface State {
    auth: boolean;
}

class Blog extends Component{

    state: State = {
        auth: false
    }

    render () {
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts"
                                    exact 
                                    activeClassName={classes.active} 
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }
                                }>Posts</NavLink></li>
                            <li><NavLink to={{pathname:"/new-post", hash:"#submit", search:"?quick-submit=true"}} activeClassName={classes.active}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={()=><Posts/>} /> */}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Redirect from='/' to='/posts' />
                    {/* <Route path="/" component={Posts} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;