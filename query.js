const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

const Movie = sequelize.define('movie', {
  title: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  }
});


const getAllMovies = async () => {
  try {
    const movies = await Movie.findAll();
    return movies;
  } catch (error) {
    throw new Error(error);
  }
};

const getMovieById = async (id) => {
  try {
    const movie = await Movie.findByPk(id);
    return movie;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await Movie.findAll({
      attributes: [[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']]
    });
    return categories.map(category => category.category);
  } catch (error) {
    throw new Error(error);
  }
};

const getMoviesByCategory = async (category) => {
  try {
    const movies = await Movie.findAll({
      where: { category }
    });
    return movies;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getAllCategories,
  getMoviesByCategory
};
