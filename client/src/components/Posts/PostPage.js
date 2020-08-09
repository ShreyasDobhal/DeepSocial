import React, {Component} from 'react';
import { Spinner } from 'reactstrap';
import axiosExpress from '../../axios/axiosExpress';

import NavigationBar from '../Navbar/Navbar';
import AddPost from './AddPost';
import Post from './Post';
import NotFound from '../Error/NotFound';

class PostPage extends Component {
    
    state = {
        postId: null,
        loaded: false,
        notFound: false,
        post: null
    }

    componentDidMount() {
        this.setState({
            postId:this.props.match.params.postId
        });

        axiosExpress.get('/posts/'+this.props.match.params.postId)
            .then(post=>{
                this.setState({
                    post: post.data,
                    loaded: true
                });
            })
            .catch(error=>{
                this.setState({
                    loaded: true,
                    notFound: true
                })
            });
    }

    render() {
        let PostHolder = null;

        if (this.state.loaded) {

            if (this.state.notFound) {
                PostHolder = (
                    <NotFound />
                );
            } else {
                PostHolder = (
                    <Post post={this.state.post}/>
                );
            }
        } else {
            PostHolder = (
                <div className='loadingSpinner'>
                    <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            );
        }

        return (
            <div>
                <NavigationBar/>
                <div className='scroll-container'>
                    {/* <AddPost /> */}
                    {PostHolder}
                </div>
            </div>
            // <div>Post Page {this.state.postId}</div>
        );
    }
}

export default PostPage;