module.exports = {
  getPostReactions,
  /*
    getReactions,
  getPostId,
  addLike,
  addLove,
  addDislike,
  removeLike,
  removeLove,
  removeDislike,
  getLikes,
  getLoves,
  getDislikes,
  getPostReactions,
  getCommentReactions
  */
};



const commentModel = require("./comment-model.js");
const db = require("../data/db-config.js");

function getPostsAll() {
  return db("posts");
}

function getPostReactions(post_id) {
  return db("post_reactions").where({ post_id: post_id });
}

function addPost(newPost) {
  return db("posts")
    .insert(newPost)
    .then((ids) => {
      return getPost(ids[0]);
    });
}

function getPost(post_id) {
  return db("posts").where({ id: post_id }).first();
}


//Get Post Reactions
function getPostReactions(post_id) {
  return db("post_reactions")
    .join("posts", "post.id", "post_reaction.post_id")
    .select(
      "post.title as title",
      "post_reactions.post_id as post_id",
      "post_reactions.like as like",
      "post_reactions.dislike as dislike",
      "post_reactions.love as love"

      //   "users.username as username"
    )
    .where({ post_id: post_id })
    .first();
}

function getUserPost(user_id) {
  return db("posts").where({ user_id: user_id });
}

function removePost(post_id) {
  return db("posts").where({ id: post_id }).del();
}

function updatePost(post_id, updatedPost) {
  return db("posts")
    .where({ id: post_id })
    .update(updatedPost)
    .then((count) => {
      return getPost(post_id);
    });
}

async function getPostDetails(post_id) {
  const post = await getPost(post_id);
  const comment = await commentModel.getPostComment(post_id);

  return {
    user_id: post.user_id,
    user: post.user,
    id: post.id,
    title: post.title,
    entry: post.entry,
    comments: comment,
  };
}


