import User from '../models/User.js';

export const createCategory = async (req, res) => {
    const { label } = req.body;
    const response = await User.updateOne(
        { _id: req.user.id}, 
        { $set: { categories: [...req.user.categories, { label }] } }
    );
    res.json({ response });
}

export const editCategory = async (req, res) => {
    const { label } = req.body;
    const response = await User.updateOne(
        { _id: req.user.id}, 
        { 
            $set: { 
                categories: req.user.categories.map((category) => {
                    if (category._id == req.params.id) {
                        return { label };
                    }
                    return category;
                }) 
            } 
        }
    );
    res.json({ response });
}

export const deleteCategory = async (req, res) => {
    const categories = req.user.categories;
    const newCategories = categories.filter((category) => category._id != req.params.id);
    const response = await User.updateOne(
        { _id: req.user.id}, 
        { $set: { categories: newCategories } }
    );
    res.json({ response });
}