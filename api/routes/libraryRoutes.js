const router = require('express').Router();
const libraryController = require('../controllers/libraryController');
const authController = require('../controllers/authController');
const fetch = require('isomorphic-unfetch');
const jwt = require('jsonwebtoken');
const cache = require('../../cache');
const { spotifyFetch } = require('../../utils/fetch');

router.route('/all').get((req, res) => {
  const spotifyID = req.query.id;
  const { library: cachedUserLibrary } = cache.get(spotifyID);
  if (!cachedUserLibrary) {
    //retrieve user library from database

    //and/or retrieve library from spotify API
    let library = spotifyFetch();
  }
});

router.route('/top').get((req, res) => {
  const token = req.query.jwt;
  const { spotifyID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
});

module.exports = router;
