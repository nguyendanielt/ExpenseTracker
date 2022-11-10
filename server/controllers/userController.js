export const index = async (req, res) => {   
    res.json({ user: req.user });
}