import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// default categories for user
const categories = [
    {label: "Food"},
    {label: "Electronics"},
    {label: "Clothes"}
];

export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });  // check if user already exists based on email
    if (userExists) {
        res.status(406).json({ message: "User already exists" });
    } else {
        // hash plaintext password
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        // create user 
        const user = await User({ firstName, lastName, email, password: hashedPassword, categories });
        await user.save();
        res.status(201).json({ message: "User created" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) { 
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (passwordMatched) {
            const payload = {     // properties included to get the right user for the token
                username: email,
                id: user._id
            };
            // create jwt token for authentication
            const token = jwt.sign(payload, process.env.JWT_SECRET);
            res.json({ message: "Logged in successfully", token, user });
        } else {
            res.status(406).json({ message: "Invalid credentials" });
        }
    } else {
        res.status(406).json({ message: "User does not exist" });
    }
}