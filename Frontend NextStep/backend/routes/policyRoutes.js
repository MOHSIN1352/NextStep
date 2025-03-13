const express = require('express');
const {
  getPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy
} = require('../controllers/policyController');

const router = express.Router();

// Routes for Policy model
router.get('/', getPolicies);
router.get('/:id', getPolicyById);
router.post('/', createPolicy);
router.put('/:id', updatePolicy);
router.delete('/:id', deletePolicy);

module.exports = router;
