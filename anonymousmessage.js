const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/anonymous_posts', { useNewUrlParser: true, useUnifiedTopology: true });

const PostSchema = new mongoose.Schema({ message: String, timestamp: { type: Date, default: Date.now } });
const Post = mongoose.model('Post', PostSchema);

app.post('/submit', async (req, res) => {
    const newPost = new Post({ message: req.body.message });
    await newPost.save();
    res.json({ success: true, message: 'Post submitted successfully' });
});

app.get('/posts', async (req, res) => {
    const posts = await Post.find().sort({ timestamp: -1 });
    res.json(posts);
});

app.listen(3000, () => console.log('Server running on port 3000'));
