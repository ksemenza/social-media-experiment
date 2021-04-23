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
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .string("reactions")
        .unsigned()
        .references("post_id")
        .inTable("post_reactions")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })

    .createTable("comments", (tbl) => {
      tbl.increments("id").index().unique();
      tbl.timestamp("created_at").defaultTo(knex.fn.now());
      tbl.string("comment").notNullable();
      tbl
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
              tbl
                .string("reactions")
                .unsigned()
                .references("reactions")
                .inTable("comment_reactions")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
    })

    .createTable("post_reactions", (tbl) => {
      tbl.integer("like");
      tbl.integer("dislike")
      tbl.integer("love")
       tbl
         .integer("post_id")
         .unsigned()
         .references("id")
         .inTable("posts")
         .onUpdate("CASCADE")
         .onDelete("CASCADE");
    })

    .createTable("comment_reactions", (tbl) => {
      tbl.integer("like");
      tbl.integer("dislike");
      tbl.integer("love");
        tbl
          .integer("comment_id")
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
    .dropTableIfExists("post_reactions")
    .dropTableIfExists("comment_reactions");
};
