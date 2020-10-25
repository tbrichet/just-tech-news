const User = require('./User');
const Post = require("./Post");

// create associations between tables (user and his/her posts)
// This is a "one to many" relationship between a user and his/her posts
// The foregin key is designated in the Post.js model
User.hasMany(Post, {
    foreignKey: 'user_id'
  });

// Create reverse association between posts and user
// We define the relationship with the constraint that a post can belong to one user but not many users
Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = { User };