const express = require('express');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');

const schema = require('../schema/schema');
const User = require('../models/User');

const router = express.Router();

// END PONTS

/** 
 * GraphQL end point
 */
router.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

/**
 * POST method to send a friend request to a given user
 * payload -
 * friendId
 */
router.post('/request/:userId',(req, res)=>{
    User.findById(req.params.userId)
        .then(user => {
            if (user.friendRequests.includes(req.body.friendId)) {
                // Already requested
                res.json({status: 'Already requested'});
            } else if (user.friends.includes(req.body.friendId)) {
                // Already a friend
                res.json({status: 'Already a friend'});
            } else {
                // Sending a request
                user.friendRequests.push(req.body.friendId);
                user.save()
                    .then(doc => {
                        console.log(doc);
                        res.json({status: 'Friend Request sent successfully'});
                    })
                    .catch(error => {
                        res.status(400).json({status: 'Failed', message: 'Sending friend request failed', error: error});
                    });
            }
        })
        .catch(error => {
            res.status(400).json({status: 'Failed', message: 'Sending friend request failed', error: error});
        });
});

/**
 * POST method to cancel a friend request to a given user
 * payload -
 * friendId
 */
router.post('/cancel/:userId',(req, res)=>{
    User.findById(req.params.userId)
        .then(user => {
            if (user.friendRequests.includes(req.body.friendId)) {
                // Cancelling the request
                user.friendRequests.splice(user.friendRequests.indexOf(req.body.friendId),1);
                user.save()
                    .then(doc => {
                        console.log(doc);
                        res.json({status: 'Friend Request cancelled successfully'});
                    })
                    .catch(error => {
                        res.status(400).json({status: 'Failed', message: 'Cancelling friend request failed', error: error});
                    });
                
            } else if (user.friends.includes(req.body.friendId)) {
                // Already a friend
                res.json({status: 'Already a friend, try unfriend'});
            } else {
                // Not requested
                res.json({status: 'No request found to cancel'});
            }
        })
        .catch(error => {
            res.status(400).json({status: 'Failed', message: 'Sending friend request failed', error: error});
        });
});


/**
 * POST method to add a friendship between two users
 * payload -
 * friendId
 */
router.post('/add/:userId',(req, res)=>{
    User.find({$or: [{_id: req.params.userId}, {_id: req.body.friendId}]})
        .then(users => {
            let user1 = null, user2 = null;
            let user1Index = 0, user2Index = 1;
            if (users.length != 2) {
                res.status(400).json({status: 'Failed', message: '1) Issue in finding the given users'});
            } else if (users[0]._id == req.params.userId && users[1]._id == req.body.friendId) {
                user1 = users[0];
                user2 = users[1];
            } else if (users[1]._id == req.params.userId && users[0]._id == req.body.friendId) {
                user1 = users[1];
                user2 = users[0];
                user1Index = 1;
                user2Index = 0;
            } else {
                res.status(400).json({status: 'Failed', message: '2) Issue in finding the given users'});
            }

            if (user1.friendRequests.includes(req.body.friendId)) {
                // Removing request
                console.log('Removing request from user1',user1.fname);
                user1.friendRequests.splice(user1.friendRequests.indexOf(req.body.friendId),1);
            }
            if (user2.friendRequests.includes(req.params.userId)) {
                // Removing request
                console.log('Removing request from user2',user2.fname);
                user2.friendRequests.splice(user2.friendRequests.indexOf(req.params.userId),1);
            }
            if (!user1.friends.includes(req.body.friendId)) {
                // Adding friend
                console.log('Adding friend 1');
                user1.friends.push(req.body.friendId);
            } 
            if (!user2.friends.includes(req.params.userId)) {
                // Adding friend
                console.log('Adding friend 2');
                user2.friends.push(req.params.userId);
            }
            users[user1Index] = user1;
            users[user2Index] = user2;
            users[0].save()
                .then(doc => {
                    console.log(doc);

                    users[1].save()
                        .then(doc => {
                            console.log(doc);
                            res.json({status: 'Friend added successfully'});
                        });
                })
                .catch(error => {
                    res.status(400).json({status: 'Failed', message: '3) Failed to add friend', error: error});
                });
            
            
        })
        .catch(error => {
            console.log('Error : ',error);
            res.status(400).json({status: 'Failed', message: '4) Failed to add friend', error: error});
        });
});

/**
 * POST method to remove a friendship between two users
 * payload -
 * friendId
 */
router.post('/remove/:userId',(req, res)=>{
    User.find({$or: [{_id: req.params.userId}, {_id: req.body.friendId}]})
        .then(users => {
            let user1 = null, user2 = null;
            let user1Index = 0, user2Index = 1;
            if (users.length != 2) {
                res.status(400).json({status: 'Failed', message: '1) Issue in finding the given users'});
                return;
            } else if (users[0]._id == req.params.userId && users[1]._id == req.body.friendId) {
                user1 = users[0];
                user2 = users[1];
            } else if (users[1]._id == req.params.userId && users[0]._id == req.body.friendId) {
                user1 = users[1];
                user2 = users[0];
                user1Index = 1;
                user2Index = 0;
            } else {
                res.status(400).json({status: 'Failed', message: '2) Issue in finding the given users'});
                return;
            }
            console.log("User1",user1);
            console.log("User2",user2);
            if (user1.friendRequests.includes(req.body.friendId)) {
                // Removing request
                console.log('Removing request from user1',user1.fname);
                user1.friendRequests.splice(user1.friendRequests.indexOf(req.body.friendId),1);
            }
            if (user2.friendRequests.includes(req.params.userId)) {
                // Removing request
                console.log('Removing request from user2',user2.fname);
                user2.friendRequests.splice(user2.friendRequests.indexOf(req.params.userId),1);
            }
            if (user1.friends.includes(req.body.friendId)) {
                // Removing friend
                console.log('Removing friend 1');
                user1.friends.splice(user1.friends.indexOf(req.body.friendId),1);
            } 
            if (user2.friends.includes(req.params.userId)) {
                // Removing friend
                console.log('Removing friend 2');
                user2.friends.splice(user2.friends.indexOf(req.params.userId),1);
            }
            users[user1Index] = user1;
            users[user2Index] = user2;
            users[0].save()
                .then(doc => {
                    console.log(doc);

                    users[1].save()
                        .then(doc => {
                            console.log(doc);
                            res.json({status: 'Friend removed successfully'});
                        });
                })
                .catch(error => {
                    res.status(400).json({status: 'Failed', message: '3) Failed to remove friend', error: error});
                });
            
            
        })
        .catch(error => {
            console.log('Error : ',error);
            res.status(400).json({status: 'Failed', message: '4) Failed to remove friend', error: error});
        });
});

/**
 * POST method to get the relationship status between given users
 * payload -
 * userId
 */
router.post('/relation/:userId',(req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (req.params.userId == req.body.userId) {
                // Friend Request was sent
                res.json({relation: 'Self', actionMessage: 'None', actionMethod: 'none'});
            } else if (user.friendRequests.includes(req.body.userId)) {
                // Friend Request was sent
                res.json({relation: 'Requested', actionMessage: 'Cancel Request', actionMethod: 'cancel'});
            } else if (user.friends.includes(req.body.userId)) {
                // Friend
                res.json({relation: 'Friend', actionMessage: 'Remove Friend', actionMethod: 'remove'});
            } else {
                // Nothing
                res.json({relation: 'None', actionMessage: 'Add Friend', actionMethod: 'request'});
            }
        })
        .catch(error => {
            res.status(400).json({status:'Failed', message:'Failed to find relationship', error:error});
        })
});

module.exports = router;