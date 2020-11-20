import React, { Component } from "react";
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import classes from './Posts.module.css';

interface State {
     posts:[],
     selectedPostID:number,
     error: boolean
 }

class Posts extends Component {

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
          }).catch((error)=>{
              console.log(error);
               // this.setState({error: true});
          });
  
      }
  
      postSelected = (id:number) => {
          this.setState({selectedPostID: id});
      }

     render(){
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
               <section className={classes.Posts}>
                    {posts}
               </section>
          )
     }
     
}

export default Posts;