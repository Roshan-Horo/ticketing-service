import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    if(!process.env.JWT_KEY){
            throw new Error('JWT_KEY must be defined')
    }

    try {
        
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Connected to MongoDB')

    } catch (error) {
        console.log('Error: ',error)
    }

    app.listen(8000, () => {
        console.log('Listening on PORT 8000')
    })

}

start()