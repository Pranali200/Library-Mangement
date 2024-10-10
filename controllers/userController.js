const User = require('../models/User');

exports.getMembers = async (req, res) => {
  try {
    const users = await User.find({ role: 'MEMBER' });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getMemberHistory = async (req, res) => {
  try {
    
    const member = await Member.findById(req.params.id).populate('history.book');

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    
    if (!member.history || member.history.length === 0) {
      return res.status(404).json({ message: 'No borrowing history found for this member' });
    }

    
    res.json({ history: member.history });
  } catch (error) {
    console.error(error);  
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//*exports.getMemberHistory = async (req, res) => {
 // try {
   // const member = await User.findById(req.params.id).populate('history.book');
   // res.json(member.history);
  //} catch (err) {
  //  res.status(500).json({ message: err.message });
 // }
//};*/