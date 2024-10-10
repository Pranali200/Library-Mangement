const express = require('express');
const { addBook, updateBook, deleteBook, getBooks,borrowBook,returnBook } = require('../controllers/bookController');
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const router = express.Router();

router.post('/books', auth, role('LIBRARIAN'), addBook);
router.put('/books/:id', auth, role('LIBRARIAN'), updateBook);
router.delete('/books/:id', auth, role('LIBRARIAN'), deleteBook);
router.get('/books', auth, getBooks);
router.put('/books/:id/borrow', auth, role('MEMBER'), borrowBook);

router.put('/books/:id/return', auth, role('MEMBER'), returnBook);

module.exports = router;
