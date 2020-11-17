import React, { Component } from 'react';
import axios from 'axios';
import classes from './FullPost.module.css';

interface Props {
    id:number;
}
interface State {
    loadedPost:any
}

class FullPost extends Component<Props> {

    state:State = {
        loadedPost:null
    }

    componentDidUpdate(){
        if(this.props.id){
            if( !this.state.loadedPost || (this.state.loadedPost && (this.state.loadedPost.id !== this.props.id))){
                axios.get('https://jsonplaceholder.typicode.com/posts/'+this.props.id).then((response)=>{
                    // console.log(response);
                    this.setState({loadedPost: response.data});
                });
            }  
        }
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id){
            post = <p style={{textAlign: 'center'}}>Loading....!</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className={classes.FullPost}>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p> 
                    <div className={classes.Edit}>
                        <button className={classes.Delete}>Delete</button>
                    </div>
                </div>
    
            ); 
        }
        
        return post;
    }
}

export default FullPost;