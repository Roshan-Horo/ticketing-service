import express, {Request, Response} from 'express'
import { body } from 'express-validator'
import { requireAuth, validateRequest } from '@rh_packages/common';
import { Form } from '../models/form';

const router = express.Router();

router.post('/api/forms', requireAuth,
[
    body('title').not().isEmpty().withMessage('Title is required'),
]
,async (req: Request, res: Response) => {
    const { title, questions} = req.body;

    const form = Form.build({
        title,
        userId: req.currentUser!.id,
        questions
    })

    await form.save();

    res.status(201).send(form);
})

export { router as createFormsRouter}