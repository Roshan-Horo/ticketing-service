import express,{Request,Response} from 'express'
import { body, validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../midddlewares/validate-request'

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 5, max: 20})
        .withMessage('Password must be between 5 to 20 characters')
],
 validateRequest,
 async (req: Request,res: Response) => {

    const {email, password} = req.body

    const existingUser = await User.findOne({ email })

    if(existingUser) {
       throw new BadRequestError('Email is already registered')

    }

    const user = User.build({ email, password })
    await user.save()

    // Generate jwt token
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, 
    process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
        jwt: userJwt
    }
    
    res.status(201).send(user)

})

export { router as signupRouter}
