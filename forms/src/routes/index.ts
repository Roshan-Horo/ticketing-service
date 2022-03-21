import express, { Request, Response } from 'express';
import { Form } from '../models/form';

const router = express.Router();

router.get('/api/forms', async (req: Request, res: Response) => {
    const forms = await Form.find({});

    res.send(forms);
})

export { router as indexFormRouter}