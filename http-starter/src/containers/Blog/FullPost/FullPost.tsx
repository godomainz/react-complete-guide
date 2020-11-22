import React, { Component } from 'react';
import axios from 'axios';
import classes from './FullPost.module.css';

interface Props {
    id:number;
    match?:any;
}
interface State {
    loadedPost:any
}

class FullPost extends Component<Props> {

    state:State = {
        loadedPost:null
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        this.loadData();
    }

    componentDidUpdate(){
        console.log(this.props.match.params.id);
        this.loadData();
        
    }

    loadData(){
        if(this.props.match.params.id){
            if( !this.state.loadedPost || (this.state.loadedPost && (this.state.loadedPost.id !== parseInt(this.props.match.params.id)))){
                axios.get('/posts/'+this.props.match.params.id).then((response)=>{
                    // console.log(response);
                    this.setState({loadedPost: response.data});
                });
            }  
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/'+this.props.match.params.id).then((responce)=>{
            console.log(responce);
        });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.match.params.id){
            post = <p style={{textAlign: 'center'}}>Loading....!</p>;
        }
        if(this.state.loadedPost){
            post = (
                <div className={classes.FullPost}>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p> 
                    <div className={classes.Edit}>
                        <button onClick={this.deletePostHandler} className={classes.Delete}>Delete</button>
                    </div>
                </div>
    
            ); 
        }
        
        return post;
    }
}

export default FullPost;