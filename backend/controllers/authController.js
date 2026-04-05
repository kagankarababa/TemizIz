const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /auth/register
const register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Tüm alanlar zorunludur.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanımda.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      points: user.points,
      totalLikes: user.totalLikes,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

// POST /auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-posta ve şifre zorunludur.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      points: user.points,
      totalLikes: user.totalLikes,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası.', error: error.message });
  }
};

module.exports = { register, login };
