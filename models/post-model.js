module.exports = {
    getPostsAll,
    getPosts,
    addPost,
    getPost,
    getUserPost,
    removePost,
    updatePost,
    // getPostDetails
}

const commentModel = require('./comment-model.js')
const db = require('../data/db-config.js')

function getPostsAll(){
    return db('posts')
}

function addPost(newPost) {
    return db('posts')
        .insert(newPost)
        .then(ids => {
            return getPost(ids[0]);
        });
}

function getPost(post_id) {
    return db('posts')
    .where({id: post_id})
    .first();
}

function getPosts(post_id) {
    return db('posts')
    .join('users', 'users.id', 'post.user_id')
    .select(
        'post.id as post_id',
        'post.title as title',
        'post.entry as entry',
        'users.username as username'
    )
    .where({'post_id':post_id})
    .first();
}

function getUserPost(user_id) {
    return db('posts')
    .where({'user_id' : user_id}) 
}

function removePost(post_id) {
    return db('posts')
        .where({ id: post_id })
        .del();
}

function updatePost(post_id, updatedPost) {
    return db('posts')
    .where({id: post_id})
    .update(updatedPost)
    .then(count => {
        return getPost(post_id)
    })
}

/*
async function getPostDetails(post_id) {
    const post = await getPost(post_id)
    const comment = await commentModel.getPostComment(post_id)

    return {
        'user_id': post.user_id,
        'author':post.author,
        'id': post.id,
        'title':post.title,
        'content':post.content,
        'topic':post.topic,
        'comments':comment
    }
}
*/

