const User = require('./users.model');
const bcrypt = require('bcrypt');
const {generateToken} = require('../../utils/jwt/jwt');
const { setError } = require('../../utils/error/error');

const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const userExist = await User.findOne({ email: user.email })
        if (userExist) {
            return next(setError(404, 'Este usuario ya existe'))
        }
        const userDB = await user.save();
        return res.status(201).json(userDB.name)
    } catch (error) {
        return next(setError(404, 'No se ha podido crear el usuario'))
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return next(setError(404, 'No estas registrado'))
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = generateToken(user._id, user.email);
            return res.status(200).json(token);
        }
    } catch (error) {
        
    }
}

const logout = (req, res, next) => {
    try {
        const token = null;
        return res.status(201).json(token)
    } catch (error) {
        return next(setError(404, 'Fallo al deslogear'))
    }
}

module.exports = { register, login, logout }