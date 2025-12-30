import userModel from "../model/userModel.js"; 

export const getUserData = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId); 

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      userData: { name: user.name, email: user.email, _id: user._id }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
