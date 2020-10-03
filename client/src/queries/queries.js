import {gql} from 'apollo-boost';


const getUsersQuery = gql`
{
    users {
        _id
        fname
        lname
        userDP
    }
}
`

const getUserQuery = gql`
query($_id:ID) {
    user(_id:$_id) {
        _id
        fname
        lname
        userDP
    }
}
`

const getFriendsQuery = gql`
query($_id:ID) {
    user(_id:$_id) {
        _id
        fname
        lname
        friends {
            _id
            fname
            lname
            userDP
        }
    }
}
`

const getFriendRequestsQuery = gql`
query($_id:ID) {
    user(_id:$_id) {
        _id
        fname
        lname
        friendRequests {
            _id
            fname
            lname
            userDP
            info {
                location
                phone
                work
                about
                education
                birthday
            }
        }
    }
}
`

const getPostsByFriendsQuery = gql`
query($_id:ID) {
    user(_id:$_id) {
        _id
        fname
        lname
        friends {
            _id
            fname
            lname
            userDP
            posts {
                _id
                postBody
                postImages
                postDate
                likes
                dislikes
                commentCount
                authorName
                authorId
                author {
                    userDP
                }
            }
        }
    }
}
`

const getPostsQuery = gql`
{
    posts {
        _id
        postBody
        postImages
        postDate
        likes
        dislikes
        commentCount
        authorName
        authorId
        author {
            userDP
        }
    }
}
`

const getPostQuery = gql`
query($_id:ID) {
    post(_id:$_id) {
        _id
        postBody
        postImages
        postDate
        likes
        dislikes
        commentCount
        authorName
        authorId
        author{
            userDP
        }
    }
}
`

export {
    getUsersQuery,
    getUserQuery, 
    getFriendsQuery, 
    getPostsByFriendsQuery,
    getFriendRequestsQuery,
    getPostsQuery, 
    getPostQuery
};