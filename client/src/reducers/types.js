/**
 * @typedef {Object} Auth
 * @property {Boolean} loggedIn
 * @property {Boolean} loading
 * @property {String} [error]
 * @property {String} [message]
 * @property {User} [user]
 */
/**
 * @typedef {Object} Rooms
 * @property {Boolean} loading
 * @property {Array.<Room>} rooms
 * @property {String} [error]
 * @property {String} [message]
 */

/**
 * @typedef {'loading'|'rooms'|'error'|'message'} RoomsKeys
 */

/**
 * @typedef {Object} Room
 * @property {String} _id - objectId of room
 * @property {Array.<Message>} messages - messages
 * @property {String} createdAt
 * @property {String} updatedAt
 * @property {Array.<User>} admins
 * @property {Array.<User>} members
 */

 /**
  * @typedef {Object} User
  * @property {String} _id - objectId of user
  * @property {String} username
  * @property {String} email
  * @property {Boolean} online
  */

  /**
   * @typedef {Object} Message
   * @property {String} data
   * @property {User} sender
   */