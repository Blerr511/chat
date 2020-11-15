/**
 * @typedef {Object} User
 * @property {String} username
 * @property {String} email
 * @property {String} password
 * @property {String} salt
 * @property {Number} [socketId]
 */

/**
 * @typedef {Object} Message
 * @property {String} data
 * @property {User} sender
 */

/**
 * @typedef {Object} Room
 * @property {Array.<User>} members
 * @property {Array.<User>} admins
 * @property {Array.<Message>} messages
 */
