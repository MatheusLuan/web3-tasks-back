const bcrypt = require('bcryptjs')

const make = value => bcrypt.hash(value, 10)

const compare = (value, hashedValue) => bcrypt.compare(value, hashedValue)

module.exports = {
  make,
  compare
}