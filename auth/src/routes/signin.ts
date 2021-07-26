import express,{Request, Response} from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/bad-request-error'
import { RequestValidationError } from '../errors/request-validation-error'
import { validateRequest } from '../midddlewares/validate-request'
import { User } from '../models/user'
import { Password } from '../utils/password'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/api/users/signin', [
   body('email')
      .isEmail()
      .withMessage('Email must be valid'),
   body('password')
      .trim()
      .notEmpty()
      .withMessage('YOu must supply a password')
],
 validateRequest ,
 async (req: Request,res: Response) => {
   const {email, password} = req.body

   const existingUser = await User.findOne({ email })
   if(!existingUser){
     throw new BadRequestError('Invalid Credentials')
   }

   const passwordMatch = await Password.compare(
      existingUser.password,
      password
   )
   if(!passwordMatch){
      throw new BadRequestError('Password not correct')
   }
    // Generate jwt token
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    },
     process.env.JWT_KEY!
     );

    // Store it on session object
    req.session = {
        jwt: userJwt
    }
    
    res.status(200).send(existingUser)
  
})

export { router as signinRouter}
