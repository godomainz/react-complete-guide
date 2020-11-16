import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import classes from './Blog.module.css';

class Blog extends Component {

    state = {
        posts: [],
        selectedPostID: null
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts').then((response)=>{
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
        });

    }

    postSelected = (id:number) => {
        this.setState({selectedPostID: id});
    }

    render () {
        const posts = this.state.posts.map((post:any)=>{
            return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author}
                        clicked={() => this.postSelected(post.id)}/>
        });
        return (
            <div>
                <section className={classes.Posts}>
                    {posts}
                </section>
                <section>
                    <FullPost id={Number(this.state.selectedPostID)}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;