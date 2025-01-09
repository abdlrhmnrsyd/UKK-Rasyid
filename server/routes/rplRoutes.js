const express = require('express');
const {
  createRpl,
  getRpls,
  getRplById,
  updateRpl,
  deleteRpl,
} = require('../controllers/rplController');

const router = express.Router();

router.post('/rpl', createRpl);
router.get('/rpl', getRpls);
router.get('/rpl/:id', getRplById);
router.put('/rpl/:id', updateRpl);
router.delete('/rpl/:id', deleteRpl);

module.exports = router;
