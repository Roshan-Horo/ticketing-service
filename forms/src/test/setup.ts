import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'



let mongo: any;

beforeAll( async () => {
    mongo = new MongoMemoryServer({})
    await mongo.start()
    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

beforeEach( async () => {
    const collections = await mongoose.connection.db.collections()

    for(let collection of collections){
        await collection.deleteMany({})
    }
})

afterAll( async () => {
    if(mongo){

    await mongo.stop()
    }
    if(mongoose.connection) {

    await mongoose.connection.close()
    }

})