const jwt = require('jsonwebtoken');

function login(req, res) {
  try {
    const { user, password } = req.body;

    if(user && password){
      const jwtString = jwt.sign({ user }, process.env.JWT_SECRET);
      res.status(200).json({ jwt: jwtString });
    }

    return res.status(401).send()
  } catch (error) {
    console.error('Error getting sign in user:', error);
    res.status(500).json({ error: 'Missing user and password' });
  }
}

module.exports = login;
