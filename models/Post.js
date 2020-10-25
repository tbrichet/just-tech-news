// This page sets up a Model to allow users to post to the website

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}


// create fields/columns for Post model
Post.init(
    {
        // Assign ids to user posts and have them auto-increment
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // Define the titles of user posts as strings
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // Define the URL of user posts as string and ensure they are verified links
      post_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      // Determine which user created which post - references the user model and the user id
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    // Configure the metadata including naming conventions for user posts
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );

  module.exports = Post;
  