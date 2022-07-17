const express = require('express');
const usernames = require('../utils/usernames');
const router = express.Router();

router.get('', async (req, res, next) => {
    return res.status(200).send(
        {
            success: true,
            result: usernames
        }
    );   
});

module.exports = router;
