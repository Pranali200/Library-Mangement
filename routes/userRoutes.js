const express = require('express');
const { getMembers, updateMember, deleteMember, getMemberHistory } = require('../controllers/userController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

router.get('/members', auth, role('LIBRARIAN'), getMembers);
router.put('/members/:id', auth, role('LIBRARIAN'), updateMember);
router.delete('/members/:id', auth, role('LIBRARIAN'), deleteMember);
router.get('/members/:id/history', auth, role('LIBRARIAN', 'MEMBER'), getMemberHistory);

module.exports = router;
