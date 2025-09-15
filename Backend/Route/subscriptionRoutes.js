const express = require('express');
const router = express.Router();

const subscriptionController = require('../Controller/subscriptionController');
const auth = require("../middleware/auth");

router.post('/', auth , subscriptionController.createSubscription);
router.get('/', auth , subscriptionController.getSubscriptions);
router.put('/:id', auth , subscriptionController.updateSubscription);
router.delete('/:id', auth , subscriptionController.deleteSubscription);
router.get('/stats', auth , subscriptionController.subscriptionStats);

module.exports = router;
