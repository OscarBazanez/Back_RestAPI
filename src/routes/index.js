const expres = require('express');
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../../config')
const { port } = config;
const router = expres.Router();
const endpoint = require('../../config/endpoint')
const favModel = require('../models')

const baseURL = endpoint.movies.api.v1.baseURL
const favoritesEndPoint = endpoint.movies.api.v1.favorites
const healthEndPoint = endpoint.movies.api.v1.health
const loginEndPoint = endpoint.movies.api.v1.user.login
const profileEndPoint = endpoint.movies.api.v1.user.profile
const signupEndPoint = endpoint.movies.api.v1.user.signup

router.get(`${baseURL}${healthEndPoint}`, (req, res) =>{
  res.send({msg:'Server online', port:port})
})

router.get(`${baseURL}${favoritesEndPoint}`, async (req, res) => {
    res.send(await favModel.getAll());
});

router.post(`${baseURL}${favoritesEndPoint}`, async (req, res) => {
    try {
        const favCreated = await favModel.add(req.body);
        res.send({ ...favCreated });
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete(`${baseURL}${favoritesEndPoint}/:movieId`, async (req, res) => {
    try {
        const { movieId } = req.params
        if(!movieId) {
            res.status(403).send({ code: 403, message: 'Movie ID param is required for delete'});
            return;
        }
        const favRemove = await favModel.deleteById(movieId);
        if (!favRemove) {
            res.status(404).send({ code: 404, message: `Fav movie: ${movieId} not found`});
            return;
        }
        res.send({result: favRemove});
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post(`${baseURL}${signupEndPoint}`, passport.authenticate('signup', { session: false }), async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    })
})
  
router.post(`${baseURL}${loginEndPoint}`, async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        console.log(err)
        const error = new Error('new Error')
        return next(error)
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err)
        const body = { _id: user._id, email: user.email }

        const token = jwt.sign({ user: body }, 'top_secret')
        return res.json({ token })
      })
    }
    catch(e) {
      return next(e)
    }
  })(req, res, next)
})

router.get(`${baseURL}${profileEndPoint}`, passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({
    message: 'Bienvenido',
    user: req.user,
    token: req.query.secret_token,
  })
})
module.exports = router
