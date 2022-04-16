// graphql/resolvers/index.js

const userResolvers = require('./user');
const postResolvers = require('./post');
const commentResolvers = require('./comment');

module.exports = [userResolvers, postResolvers, commentResolvers];

/*


root: This is the result of the parent resolver. We'll see the application later.
args: The arguments or data provided by the graphQL query. This can be seen as the request payload in REST API.
context: An object available to all resolvers. Any data that should be globally accessible to all resolvers are placed in the context. For example, we can pass the Sequelize models to the context.
info: An object which contains specific information to the correct query. This is only useful is advanced cases.

*/
