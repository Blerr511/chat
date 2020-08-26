/**
 * Handle on message event
 * @param {String|Buffer} data - incoming data
 * @return {void}
 */
module.exports = (data) => {
    console.log(data.toString());
};
