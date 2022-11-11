import express from 'express';
import connect from './database/mongodb.js'
import cors from 'cors';
import passport from 'passport';
import bodyParser from 'body-parser';
import expenseRoutes from './routes/expenseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import passportConfig from './config/passport.js';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
passportConfig(passport);

app.get('/', (req, res) => {
    res.send("SERVER");
});

app.use('/expense', passport.authenticate('jwt', { session: false }), expenseRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

await connect();

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});