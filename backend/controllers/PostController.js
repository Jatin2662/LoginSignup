
const PostModel = require('../models/PostModel');


const addPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id; 

    try {
        const post = new PostModel({ title, content, userId });
        await post.save();
        res.status(201).json({ message: "Post created", post, success: true });
    } catch (err) {
        res.status(500).json({ message: "Error creating post", success: false });
    }
};

const getMyPost = async (req, res) => {
    const userId = req.user._id;

    try {
        const posts = await PostModel.find({ userId });
        // const posts = await PostModel.find({ userId: req.user._id }).populate('userId', 'firstName lastName email');
        res.status(200).json({posts, success: true});
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch posts", success: false });
    }
};


const getAllPosts = async (req, res, next) => {

    // res.json({ message: "Posts" })

    try {
        const posts = await PostModel.find();

        console.log(posts);
        // const posts = await PostModel.find({ userId: req.user._id }).populate('userId', 'firstName lastName email');
        res.status(200).json({posts, success: true});
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch posts", success: false });
    }
};


module.exports = {
    addPost,
    getMyPost,
    getAllPosts
}
