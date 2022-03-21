import express, { Request, Response} from 'express'
import { body } from 'express-validator'
import {
   validateRequest,
   NotFoundError,
   requireAuth,
   NotAuthorizedError
} from '@rh_packages/common'
import { Form } from '../models/form'

const router = express.Router();

router.put('/api/forms/:id', requireAuth,
[
    body('title').not().isEmpty().withMessage('Title is required'),
]
,async (req: Request, res: Response) => {
    const form = await Form.findById(req.params.id);

    if(!form) {
        throw new NotFoundError();
    }

    if (form.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    form.set({
       title: req.body.title,
       questions: req.body.questions
    })
    await form.save();

    res.send(form);
})

export { router as updateFormRouter}