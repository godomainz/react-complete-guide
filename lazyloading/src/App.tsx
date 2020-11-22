import React, { Component, Suspense} from 'react';
// import { BrowserRouter, Route, NavLink } from 'react-router-dom';
import './App.css';

import Posts from './containers/Posts';
import User from './containers/User';
// import Welcome from './containers/Welcome';

// const Posts = React.lazy(() => import('./containers/Posts'));


interface State {
  showPosts: boolean;
}

class App extends Component  {

  state:State = {
    showPosts: false
  }
  modeHandler = () => {
    this.setState((prevState:State) => {
      return { showPosts: !prevState.showPosts };
    });
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.modeHandler}>Toggle Mode</button> 
          { this.state.showPosts ? (<Suspense fallback={<div>Loading....</div>}><Posts /></Suspense>) : (<User />) }
      </React.Fragment>
      
      // <BrowserRouter>
      //     <React.Fragment>
      //       <nav>
      //         <NavLink to="/user">User Page</NavLink> |&nbsp;
      //         <NavLink to="/posts">Posts Page</NavLink>
      //       </nav>
      //       <Route path="/" component={Welcome} exact />
      //       <Route path="/user" component={User} />
      //       <Route path="/posts" render={() => <Suspense fallback={<div>Loading....</div>}><Posts /></Suspense>} />
      //     </React.Fragment>
      //   </BrowserRouter>
    );
  }
}

export default App;
