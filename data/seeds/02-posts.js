
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
    id: 1,
    created_at: "2021-04-23 20:32:37",
    title: "Post Title Updated",
    entry: "Updating Post you must have the user_id in JSON req and the post's id in the url api/post/#",
    user_id: 1,
    "reactions": null
},
        {
    id: 2,
    created_at: "2021-02-23 20:32:37",
    title: "Second Post Title",
    entry: "Entry for seeded data",
    user_id: 2,
    reactions: null
},
        {
    id: 3,
    created_at: "2020-02-23 20:32:37",
    title: "Third Post Title",
    entry: "Entry for seeded data",
    user_id:3,
    reactions: null
}
      ]);
    });
};
