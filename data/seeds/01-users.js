exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, first_name: "Kim", last_name: "Semenza", username:"ksemenza", email: "ks@gmail.com", password: "123456" },
        { id: 2, first_name: "Colleen", last_name: "Finn", username:"cfinn", email: "cfinn@gmail.com", password: "123456" },
        { id: 3, first_name: "Shanna", last_name: "Blaney", username:"sblaney", email: "sblaney@gmail.com", password: "123456" },

      ]);
    });
};
