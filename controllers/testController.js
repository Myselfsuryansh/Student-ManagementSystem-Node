const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Test User Data Api",
    });
  } catch (error) {
    console.log("Error in the Test Api", error);
  }
};
module.exports = { testUserController };
