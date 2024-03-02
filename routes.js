const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  getAllCategories,
  getMoviesByCategory,
} = require("./query");

router.get("/movies", async (req, res) => {
  try {
    const movies = await getAllMovies();
    res.render("movies", { movies });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await getMovieById(movieId);
    res.render("movie", { movie });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.render("categories", { categories });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/categories/:category/movies", async (req, res) => {
  const category = req.params.category;
  try {
    const movies = await getMoviesByCategory(category);
    res.render("movies", { movies });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
