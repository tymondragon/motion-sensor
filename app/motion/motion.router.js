const express = require('express');
const router = express.Router();
const endpoints = require('./motion.controller')
const middleware = require('../../web/lib/middleware')
router.get('', middleware.withErrorHandling(endpoints.useMotion));

module.exports = router;