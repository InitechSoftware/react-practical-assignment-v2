const { getTable, updateTable } = require("../db/dbUtils");
const { TABLE_NAMES } = require("../db/tables/tables");
const { addPostDB, editPostDB, getPostDB, getPostsTable, deletePostDB } = require("../models/post");
const { upload } = require("../utils/fileUploader");

exports.addPost = async (req, res, next) => {
    const { getSocket } = require("../index");
    try {
        const post = await addPostDB(req.body);
        delete post.imageSrc;
        getSocket().emit('message', `message #${post.id} added, sender ${post.username} receiver ${post.to}`);
        return res.status(201).send({success: true, result: post});
    } catch (e) {
        return res.status(400).send({success: false, result: e.message});
    }
}

exports.editPost = async (req, res, next) => {
    const { getSocket } = require("../index");
    try {
        const id = +req.params.id;
        let post = req.body;
        delete post.imageSrc;
        delete post.id;
        delete post.username;
        post = await editPostDB(id, post);
        getSocket().emit('message', `message #${id} edited, sender ${post.username} receiver ${post.to}`);
        return res.status(200).send({success: true, result: post});
    } catch (e) {
        return res.status(400).send({success: false, result: e.message});
    }
};

exports.getPost = async (req, res, next) => {
    try {
        const post = await getPostDB(+req.params.id);
        if (!post) throw new Error(`Post ${req.params.id} not found`);
        return res.status(200).send({success: true, result: post});
    } catch (e) {
        return res.status(400).send({success: false, result: e.message});
    }
}

exports.searchPosts = async (req, res, next) => {
    try {
        const filter = req.params.filter.trim().toLowerCase();
        const posts = await getPostsTable();
        const postsFiltered = posts.filter(post => {
            return post.title.toLowerCase().indexOf(filter) > -1 || post.username.toLowerCase().indexOf(filter) > -1;
        });
        return res.status(200).send({success: true, result: postsFiltered});
    } catch (e) {
        return res.status(400).send({success: false, result: e.message});
    }
}

exports.getPosts = async (req, res, next) => {
    try {
        const posts = await getPostsTable();
        return res.status(200).send({success: true, result: posts || []});
    } catch (e) {
        return res.status(400).send({success: false, result: e.message});
    }
}

exports.getPostsPage = async (req, res, next) => {
    const COUNT_PER_PAGE = 9;
    const pageNumber = +req.params.pageNumber;
    const userName1 = req.params.userName1;
    const userName2 = req.params.userName2;
    const firstIdx = (pageNumber - 1) * COUNT_PER_PAGE;
    const lastIdx = pageNumber * COUNT_PER_PAGE;
    try {
        if (pageNumber > 0) {
            let posts = await getPostsTable();
            if (userName1 && userName2) posts = posts.filter(post => (post.username === userName1 && post.to === userName2) || (post.to === userName1 && post.username === userName2));
            const totalPages = posts ? Math.ceil(posts.length / COUNT_PER_PAGE) : 0;
            return res.status(200).send({success: true, result: posts.slice(firstIdx, lastIdx) || [], totalPages: totalPages, total: posts ? posts.length : 0, page: pageNumber});
        } else {
            throw new Error('Unvalid page number param. It should be number more than 0');
        }
    } catch (e) {
        return res.status(400).send({success: false, result: e.message});
    }
}

exports.deletePost = async (req, res, next) => {
    const { getSocket } = require("../index");
    try {
        const postId = +req.params.id;
        const post = await deletePostDB(postId);
        let comments = await getTable(TABLE_NAMES.comment);
        comments = comments.filter(comment => comment.postId !== postId);
        await updateTable(TABLE_NAMES.comment, comments);
        getSocket().emit('message', `message #${req.params.id} deleted, sender ${post.username} receiver ${post.to}`);
        return res.status(200).send({success: true, result: post});
    } catch (e) {
        return res.status(400).send({success: false, result: e.message});
    }
}

exports.uploadPostPic = async (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            res.send({success: false, result: err});
        }
        else {
            res.send({success: true});
        }
    })
};