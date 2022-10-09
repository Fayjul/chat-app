module.exports.signUp = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    console.log(userName, email, password);
  } catch {
    console.log('There is an error');
  }
};
