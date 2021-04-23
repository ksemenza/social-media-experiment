exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id").index().unique();
      tbl.string("first_name", 255).notNullable();
      tbl.string("last_name", 255).notNullable();
      tbl.string("username", 255).notNullable().unique();
      tbl.string("email", 255).notNullable().unique();
      tbl.string("password", 255).notNullable();
    })

    .createTable("posts", (tbl) => {
      tbl.increments("id").index().unique();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.string("title", 255).notNullable();
      tbl.string("entry").notNullable();    
      tbl
        .int("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("comments", (tbl) => {
      tbl.increments("id").index();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.string("comment").notNullable();
      tbl
        .string("post_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("reactions", (tbl) => {
      tbl.string("like").notNullable();
      tbl.string("dislike").notNullable();
      tbl.string("love").notNullable();
       tbl
          .string("post_id")
          .unsigned()
          .references("id")
          .inTable("posts")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        tbl
          .string("comment_id")
          .unsigned()
          .references("id")
          .inTable("comments")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
    })


};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("posts")
    .dropTableIfExists("comments")
    .dropTableIfExists("notifications");
};
