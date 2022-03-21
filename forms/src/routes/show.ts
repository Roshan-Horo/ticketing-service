import { NotFoundError } from "@rh_packages/common";
import { Form } from "../models/form";
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/api/forms/:id', async (req: Request, res: Response) => {
    const form = await Form.findById(req.params.id);

    if(!form) {
        throw new NotFoundError();
    }

    res.send(form);
})

export { router as showFormRouter}
