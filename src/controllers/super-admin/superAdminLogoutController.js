export const superAdminLogoutController = async (req, res) => {
  try {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,      // must match your login cookie
      sameSite: 'lax',
    });

    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error("❌ Logout Error:", error.message);
    return res.status(500).json({ success: false, message: 'Server Error during logout' });
  }
};
