import exprss from 'express';

const authRouter = exprss.Router();

authRouter.post('/signup', (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);
  } catch {
    console.log('There is an error');
  }
});

authRouter.get('/', (req, res) => {
  res.send('Bismillah hir Rahmanir Rahim');
});

export default authRouter;
