import mongoose from 'mongoose';

const connect = async () => {
    const username = process.env.MONGO_DB_USERNAME;
    const password = process.env.MONGO_DB_PASSWORD;
    const url = process.env.MONGO_DB_URL;

    await mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority`)
        .then(() => console.log("DB connection successful"))
        .catch((err) => console.error(err));
}

export default connect;