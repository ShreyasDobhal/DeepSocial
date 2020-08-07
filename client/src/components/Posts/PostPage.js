import React, {Component} from 'react';
import { Spinner } from 'reactstrap';

import NavigationBar from '../Navbar/Navbar';
import AddPost from './AddPost';
import Post from './Post';

class PostPage extends Component {
    
    state = {
        postId: null,
        loaded: false,
        post: null
    }
        
    componentDidMount() {
        this.setState({
            postId:this.props.match.params.postId
        });
    }

    render() {
        let PostHolder = null;

        if (this.state.loaded) {
            PostHolder = this.state.posts.map(post=>{
                return (
                    <Post post={post}/>
                );
            });
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