import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
    console.log('Starting app.....');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KET must be defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        console.error(error);
    }
    console.log('Connected to mongo db');
};

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});

start();