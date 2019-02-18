var express = require('express');
var chatWindowControll = require('../controller/chatWindowControll.js')
var chatWindowRouter = express.Router();

chatWindowRouter.route('/ChatWindow.html').get(chatWindowControll.data);
module.exports = chatWindowRouter;