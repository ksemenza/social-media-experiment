module.exports = {
    getCommentsAll,
    addComment,
    getComment,
    getPostComment,
    removeComment,
    updateComment,
    // getCommentDetails
}

const db = require('../data/db-config.js')
// const notificationModel = require('./notification-model.js')


function getCommentsAll(){
    return db('comments')
}

function addComment(newComment) {
    return db('comments')
        .insert(newComment)
        .then(ids => {
            return getComment(ids[0]);
        });
}

function getComment(post_id) {
    return db('posts')
    .where({id: post_id})
    .first();
}

function getPostComment(post_id) {
    return db('comments')
    .where({'post_id' : post_id}) 
}

function removeComment(comment_id) {
    return db('comments')
        .where({ id: comment_id })
        .del();
}

function updateComment(comment_id, updatedComment) {
    return db('comments')
    .where({id: comment_id})
    .update(updatedComment)
    .then(count => {
        return getComment(comment_id)
    })
}

/*
async function getCommentDetails(comment_id) {
    const comment = await getComment(comment_id)
    const notification = await notificationModel.getCommentNotification(comment_id)

    return {
        'user_id':comment.user_id,
        'post_id': comment.post_id,
        'author':comment.author,
        'id': comment.id,
        'comment':comment.comment,
        'notification':notification
    }
}

*/
