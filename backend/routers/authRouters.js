import exprss from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const authRouter = exprss.Router();

authRouter.post('/signup', async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: 'Email already used', status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      userName,
      password: hashedPassword,
    });
    return res.json({ status: true, user, msg: 'Account create successfull' });
  } catch (ex) {
    console.log('There is an error');
    next(ex);
  }
});

authRouter.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //console.log(email, password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: 'Incorrect Username or Password', status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: 'Incorrect Username or Password', status: false });
    }
    return res.json({ status: true, user });
  } catch (ex) {
    console.log('There is an error');
    next(ex);
  }
});
authRouter.get('/allusers/:id', async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      'email',
      'username',
      'avatarImage',
      '_id',
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
});
authRouter.get('/', (req, res) => {
  res.send('Bismillah hir Rahmanir Rahim');
});

export default authRouter;
