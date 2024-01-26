const express = require('express')
const router = express.Router()
const { authRequired } = require('./utils')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secrets')
const SALT = 10

const { createUser, getUserByUsername } = require('../helperFns/usershelper')

//GET current user
router.get('/', authRequired, async (req, res, next) => {
    try {
        const token = req.get('Authorization').split(' ')[1]
        
        if (!token) {
            throw new Error('User is not logged in')
        }

        const user = jwt.verify(token, JWT_SECRET)
        
        delete user.iat
        res.send(user)
    } catch (error) {
        next(error)
    }
})

//POST create a new user
router.post('/register', async (req, res, next) => {
    try {
        const { name, username, password } = req.body

        if (!username) {
            throw new Error('username is required to create an account')
        } else if (!password) {
            throw new Error('password is required to create an account')
        }
        
        const hashedPW = await bcrypt.hash(password, SALT)

        const user = await createUser({ name, username, password: hashedPW })
        delete user.password

        const token = jwt.sign(user, JWT_SECRET)

        res.cookie("token", token, {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});
        
        res.send({ token, user })
    } catch (error) {
        next(error)
    }
})

//POST login existing user
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await getUserByUsername(username)
        const validPassword = await bcrypt.compare(password, user.password)

        delete user.password

        if (!user) {
            throw new Error('invalid username')
        } else if (!validPassword) {
            throw new Error('invalid password')
        }

        if (validPassword) {
            const token = jwt.sign(user, JWT_SECRET)

        res.cookie("token", token, {
			sameSite: "strict",
			httpOnly: true,
			signed: true,
		});
        
        res.send({ token, user })
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router