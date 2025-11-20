// middleware/auth.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// Middleware to verify access tokens
function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Expect: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access token is required' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Check if token is revoked or expired in the database
    AccessToken.findOne({ token, is_revoked: false, is_expired: false })
      .then((accessToken) => {
        if (!accessToken) {
          return res.status(403).json({ message: 'Token is revoked or expired' });
        }

        // Attach decoded user info to request
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error("❌ Error checking access token:", err);
        return res.status(500).json({ message: 'Internal server error' });
      });

    // Check if token has permissions to access this route
    // if (!accessToken.permissions[user.role][req.method.toLowerCase()]) {
    //   return res.status(403).json({ message: 'Unauthorized' });
    // }



    // Attach decoded user info to request
    req.user = user;
    next();
  });
}

export default authenticateToken;


