const uuidGenerationRaw = `
  (lower(hex(randomblob(4))) || '-' ||
  lower(hex(randomblob(2))) || '-4' ||
  substr(lower(hex(randomblob(2))),2) || '-' ||
  substr('89ab',abs(random()) % 4 + 1, 1) ||
  substr(lower(hex(randomblob(2))),2) || '-' ||
  lower(hex(randomblob(6))))
`

exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw(uuidGenerationRaw))

    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()

    table.timestamp('created_at').notNullable()
    table.timestamp('updated_at').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}