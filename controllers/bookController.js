const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = new Book({ title, author });
    await book.save();
    res.status(201).json({ message: 'Book added' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = await Book.findByIdAndUpdate(id, { title, author }, { new: true });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.status === 'BORROWED') {
      return res.status(400).json({ message: 'Book is already borrowed' });
    }

    // Update the book status to BORROWED
    book.status = 'BORROWED';
    await book.save();

    // Update the member's history
    const member = await Member.findById(req.user.id);
    member.history.push({ book: book._id, borrowedAt: new Date() });
    await member.save();

    res.json({ message: 'Book borrowed successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Return a book
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.status !== 'BORROWED') {
      return res.status(400).json({ message: 'Book is not currently borrowed' });
    }

    // Update the book status to AVAILABLE
    book.status = 'AVAILABLE';
    await book.save();

    // Update the member's history (set returnedAt for this book)
    const member = await Member.findById(req.user.id);
    const historyRecord = member.history.find(record => record.book.toString() === book._id.toString() && !record.returnedAt);
    
    if (historyRecord) {
      historyRecord.returnedAt = new Date();
      await member.save();
    }

    res.json({ message: 'Book returned successfully', book });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
