// graphql/resolvers/post.js

const { Post } = require('../../database/models');

const { AuthenticationError } = require('apollo-server-express');

module.exports = {
  Mutation: {
    async createPost(_, { content, title }, { user = null }) {
      if (!user) {
        throw new AuthenticationError('You must login to create a post');
      }
      return Post.create({
        userId: user.id,
        content,
        title,
      });
    },
  },

  Query: {
    async getAllPosts(root, args, context) {
      return Post.findAll();
    },
    async getSinglePost(_, { postId }, context) {
      return Post.findByPk(postId);
    },
  },

  Post: {
    author(post) {
      return post.getAuthor();
    },

    comments(post) {
      return post.getComments();
    },
  },
};

/*

Notice that we added a resolver for Post itself, in the Post schema we have author and comments. Here we made use of the root object which is post in this case. GraphQL implicitly resolves the Post to the result of the Post query passing the post object as the root object. We then made use of Sequelize mixin to return the related author and comments for the Post.

*/
