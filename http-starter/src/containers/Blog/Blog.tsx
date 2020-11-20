import React, { Component } from 'react';
// import axios from 'axios';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import classes from './Blog.module.css';

interface State {
    posts:[],
    selectedPostID:number,
    error: boolean
}

class Blog extends Component{

    state:State = {
        posts: [],
        selectedPostID: null,
        error:false
    }

    componentDidMount() {
        axios.get('/posts').then((response)=>{
            // console.log(response.data);
            const posts = response.data.slice(0,4);
            const updatedPosts = posts.map((post:any) =>{
                return {
                    ...post,
                    author: 'Max'
                }
            });
            // console.log(updatedPosts);
            this.setState({posts: updatedPosts});
        }).catch(()=>{
            // console.log(error);
            this.setState({error: true});
        });

    }

    postSelected = (id:number) => {
        this.setState({selectedPostID: id});
    }

    render () {
        let posts:any = <p style={{textAlign: "center"}}>Something went wrong</p>;
        if (!this.state.error){
            posts = this.state.posts.map((post:any)=>{
                return <Post 
                            key={post.id} 
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelected(post.id)}/>
            });
        }
        
        return (
            <div className={classes.Blog}>
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className={classes.Posts}>
                    {posts}
                </section>
            </div>
        );
    }
}

export default Blog;