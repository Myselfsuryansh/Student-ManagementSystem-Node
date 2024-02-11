const { response } = require("express");
const studentModel = require("../models/studentModel");
const AuthModel = require("../models/AuthModel");
const LoginModel = require("../models/LoginModel");
const bcrypt = require("bcryptjs");
const createStudentController = async (req, res) => {
  try {
    const {
      department,
      empName,
      mobile,
      gender,
      joinDate,
      email,
      salary,
      password,
      confirmPass,
      empStatus,
    } = req.body;

    if (!empName || !email || !mobile) {
      return res.status(404).send({
        success: false,
        message: "Please Provide all fields ",
      });
    }
    const existingEmail = await studentModel.findOne({ email });
    if (existingEmail) {
      return res.status(500).send({
        success: false,
        message: "Email Already Regstered",
      });
    }
    const existingMobile = await studentModel.findOne({ mobile });
    if (existingMobile) {
      return res.status(500).send({
        success: false,
        message: "Mobile Already Regstered",
      });
    }
    const student = new studentModel({
      department,
      empName,
      mobile,
      gender,
      joinDate,
      email,
      salary,
      password,
      confirmPass,
      empStatus,
    });
    await student.save();

    res.status(200).send({
      success: true,
      message: "Successfully created",
      student: student,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      success: false,
      Message: "Can't create a new student Crud",
      error,
    });
  }
};

// const createStudentController = async (req, res) => {
//     try {
//       const studentsData = req.body;

//       if (!Array.isArray(studentsData)) {
//         return res.status(400).send({
//           success: false,
//           message: "Request body should be an array of student data",
//         });
//       }

//       const createdStudents = [];

//       for (const studentData of studentsData) {
//         const {
//           department,
//           empName,
//           mobile,
//           gender,
//           joinDate,
//           email,
//           salary,
//           password,
//           confirmPass,
//           empStatus,
//         } = studentData;

//         if (!empName || !email || !mobile) {
//           return res.status(400).send({
//             success: false,
//             message: "Please provide all fields for each student",
//           });
//         }

//         const existingEmail = await studentModel.findOne({ email });
//         if (existingEmail) {
//           return res.status(400).send({
//             success: false,
//             message: `Email '${email}' already registered`,
//           });
//         }

//         const existingMobile = await studentModel.findOne({ mobile });
//         if (existingMobile) {
//           return res.status(400).send({
//             success: false,
//             message: `Mobile '${mobile}' already registered`,
//           });
//         }

//         const student = new studentModel({
//           department,
//           empName,
//           mobile,
//           gender,
//           joinDate,
//           email,
//           salary,
//           password,
//           confirmPass,
//           empStatus,
//         });

//         await student.save();
//         createdStudents.push(student);
//       }

//       res.status(201).send({
//         success: true,
//         message: "Successfully created",
//         students: createdStudents,
//       });
//     } catch (error) {
//       console.error(error);
//       return res.status(500).send({
//         success: false,
//         message: "Can't create new students",
//         error: error.message,
//       });
//     }
//   };

const getAllStudentController = async (req, res) => {
  try {
    const getAllStudent = await studentModel.find({});

    if (!getAllStudent) {
      return res.status(404).send({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Data get get successful",
      studentCount: getAllStudent.length,
      getAllStudent: getAllStudent,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      succes: false,
      message: "Error while Getting All Student",
    });
  }
};

const getAllStudentByIdController = async (req, res) => {
  try {
    const studentId = await studentModel.findById(req.params.id);
    console.log(studentId);
    if (!studentId) {
      res.status(404).send({
        success: false,
        message: "Student Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Student Found",
      studentId,
    });
  } catch (error) {
    console.log(error);
    response.status(404).send({
      success: false,
      message: "Error while getting Specific Student",
      error,
    });
  }
};

const updateStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const {
      department,
      empName,
      mobile,
      gender,
      joinDate,
      email,
      salary,
      password,
      confirmPass,
      empStatus,
    } = req.body;

    const upateStudent = await studentModel.findByIdAndUpdate(
      id,
      {
        empName,
        mobile,
        gender,
        joinDate,
        email,
        salary,
        password,
        confirmPass,
        empStatus,
      },
      { new: true }
    );

    if (!upateStudent) {
      return res.status(400).send({
        success: false,
        message: "Unable to update the data",
      });
    }

    res.status(200).send({
      succes: true,
      message: "Student Updated Successfully",
      upateStudent: upateStudent,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send({
      succes: false,
      message: "Error while Updating Student",
      error,
    });
  }
};

const deleteStuentController = async (req, res) => {
  try {
    const deleteStudent = await studentModel.findByIdAndDelete(req.params.id);
    if (!deleteStudent) {
      return res.status(404).status({
        succes: false,
        message: "Student Not Found",
      });
    }

    res.status(200).send({
      succes: true,
      message: "Student Deleted Successfully",
      deleteStudent: deleteStudent,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Deleting Student",
      error: error,
    });
  }
};

// const changePasswordController = async(req, res) =>{

//   try {
//     const user = await LoginModel.findById({ _id: req.body.id });
//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User Not Found",
//       });
//     }
   
//   }
//   catch(error){
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error while changing password",
//     })
//   }

// }

// const changePasswordController = async(req, res) => {
//   try {
//     const { id, oldPassword, newPassword } = req.body;

//     const user = await LoginModel.findById(id);

//     if (!user) {
//       return res.status(404).send({
//         success: false,
//         message: "User Not Found",
//       });
//     }

    
//     const isMatch = await bcrypt.compare(oldPassword, user.password);

//     if (!isMatch) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid old password",
//       });
//     }

   
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

   
//     user.password = hashedPassword;
//     await user.save();

//     return res.status(200).send({
//       success: true,
//       message: "Password Updated",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error while changing password",
//     });
//   }
// }

const changePasswordController = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    console.log("id",id)

    const user = await AuthModel.findById(id)
    console.log("user",user)


    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    // Check if old password matches
    if (oldPassword !== user.password) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while changing password",
    });
  }
};



const studentSignUpController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(500).send({
        success: false,
        message: "Pleae Enter all fields",
      });
    }
    const existing = await AuthModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registered, Please Login",
      });
    }
    // var salt = bcrypt.genSaltSync(10);
    // const hashPasword = await bcrypt.hash(password, salt);

    const user = await AuthModel.create({
      userName,
      email,
      password
    });
    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Signing Up",
      error,
    });
  }
};

const studentLoginInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await AuthModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered. Please sign up",
      });
    }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   res.status(500).send({
    //     success: false,
    //     message: "Invalid Password",
    //   });
    // }
    // const JWT_SECRET ="DATA"
    // const token = JWT.sign({id: user._id}, JWT_SECRET,{
    //     expiresIn:"7d",
    // })
    if (user) {
      // const user = await LoginModel.create({
      //   email,
      //   password,
      // });
      res.status(200).send({
        success: true,
        message: "Login Suuccessfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      succes: false,
      message: "Error while SignIng In",
      error,
    });
  }
};

const getUserIdByEmailController = async(req, res) =>{
  const {email} = req.body;

  if(!email){
    return res.status(404).send({
      message:"Email parameter is required"
    })
  }
  try{
    const user = await AuthModel.findOne({email:email});
    if(!user){
      return res.status(404).send({
        success:false,
        message:"User Not Found"
      })
    }

    return res.status(201).send({ 
      id: user._id,
      user
    });

  }

  catch(error){
    console.log(error);
    return res.status(500).send({
      success:false,
      messsage:"Error while getting getUserIdByEmail",
      error
    })
  }

}

module.exports = {
  createStudentController,
  getAllStudentController,
  updateStudentController,
  deleteStuentController,
  getAllStudentByIdController,
  studentSignUpController,
  studentLoginInController,
  changePasswordController,
  getUserIdByEmailController
};
