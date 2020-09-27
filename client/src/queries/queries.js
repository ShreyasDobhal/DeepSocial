import {gql} from 'apollo-boost';


const getUsersQuery = gql`
{
    users {
        id
        fname
        lname
        userDP
    }
}
`

const getUserQuery = gql`
query($id:ID) {
    user(id:$id) {
        id
        fname
        lname
        userDP
    }
}
`

const getFriendsQuery = gql`
query($id:ID) {
    user(id:$id) {
        id
        fname
        lname
        friends {
            id
            fname
            lname
            userDP
        }
    }
}
`

const getPostsByFriendsQuery = gql`
query($id:ID) {
    user(id:$id) {
        id
        fname
        lname
        friends {
            id
            fname
            lname
            userDP
            posts {
                id
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
        id
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
query($id:ID) {
    post(id:$id) {
        id
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
    getPostsQuery, 
    getPostQuery
};