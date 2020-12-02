const uuidGenerationRaw = `
  (lower(hex(randomblob(4))) || '-' ||
  lower(hex(randomblob(2))) || '-4' ||
  substr(lower(hex(randomblob(2))),2) || '-' ||
  substr('89ab',abs(random()) % 4 + 1, 1) ||
  substr(lower(hex(randomblob(2))),2) || '-' ||
  lower(hex(randomblob(6))))
`

exports.up = function (knex) {
  return knex.schema.createTable('tasks', table => {
    table.uuid('id').primary().defaultTo(knex.raw(uuidGenerationRaw))

    table
      .string('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('cascade')

    table.string('title').notNullable()
    table.string('description').notNullable()
    table.string('status').notNullable()

    table.timestamp('created_at').notNullable()
    table.timestamp('updated_at').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('tasks')
}