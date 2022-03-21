import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { errorHandler, NotFoundError, currentUser} from '@rh_packages/common'
import { createFormsRouter } from './routes/new'

const app = express()
app.set('trust proxy', true)
app.use(express.json())
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUser);
app.use(createFormsRouter);

// ROUTES

app.get('/',(req,res) => {
    res.send('auth service')
})


app.all('*',async (req,res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export { app }