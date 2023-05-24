var express = require('express');
var router = express.Router();

const { getAllMessages, viewMessages } = require('./controller');

router.get('/messages', getAllMessages);
router.get('/messages_view/:id', viewMessages);

module.exports = router;
