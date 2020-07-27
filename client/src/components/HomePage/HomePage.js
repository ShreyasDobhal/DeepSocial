import React, {Component} from 'react';
import {connect} from 'react-redux';

import NavigationBar from '../Navbar/Navbar';
import AddPost from '../Posts/AddPost';
import Post from '../Posts/Post';



class HomePage extends Component {

    state = {
        posts: [
            {
                userName: 'Shreyas Dobhal',
                userDP: '/images/profile.jpg',
                date: '25 Jul 2020 at 00:23 AM',
                body: 'Sunset by the ocean.',
                postImages: [
                    '/images/img4.jpg'
                ],
                like: '1.5k',
                dislike: '25',
                commentCount: '37'
            },
            {
                userName: 'Shreyas Dobhal',
                userDP: '/images/profile.jpg',
                date: '29 Jun 2020 at 03:45 PM',
                body: 'Random clicks 😅',
                postImages: [
                    '/images/img'+(Math.floor(Math.random()*4)+1)+'.jpg',
                    '/images/img'+(Math.floor(Math.random()*4)+1)+'.jpg',
                    '/images/img'+(Math.floor(Math.random()*4)+1)+'.jpg'
                ],
                like: '1.5k',
                dislike: '25',
                commentCount: '37'
            },
            {
                userName: 'Shreyas Dobhal',
                userDP: '/images/profile.jpg',
                date: '19 Jun 2020 at 07:31 PM',
                body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, delectus? Temporibus, asperiores. Eaque nobis itaque nam dolorum ea? Velit inventore quae accusamus earum voluptate praesentium. Praesentium laboriosam atque, libero eius rem nam modi? In eius magnam alias iste dolores at.',
                like: '1.5k',
                dislike: '25',
                commentCount: '37'
            }
        ]
    }

    componentDidMount() {
        console.log("Home page ready");
    }
    render() {
        return (
            <div>
                <NavigationBar/>
                <div className='scroll-container'>
                    <AddPost />
                    <Post post={this.state.posts[0]}/>
                    <Post post={this.state.posts[1]}/>
                    <Post post={this.state.posts[2]}/>
                </div>
                

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.currentUser.name
    }
}



export default connect(mapStateToProps)(HomePage);