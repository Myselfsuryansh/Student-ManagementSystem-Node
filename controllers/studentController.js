const { response } = require("express");
const studentModel = require("../models/studentModel");
const AuthModel = require("../models/AuthModel");
const studentDepartmentModel = require("../models/studentDepartmentModel");
const jwt = require("jsonwebtoken");
const employeeFilterModel = require("../models/employeeFilterModel");
const userModel = require("../models/userModel");


const department = [
  { name: "Accounts" },
  { name: "Manager" },
  { name: "Administrator" },
  { name: "HR" },
  { name: "IT" },
];

const docSize = 50;
const documentsData = [];
for (let i = 0; i < department.length; i += docSize) {
  documentsData.push(department.slice(i, i + docSize));
}

documentsData.forEach((docSize) => {
  studentDepartmentModel
    .insertMany(docSize)
    .then(() => {
      console.log(`Inserted ${docSize.length} documents`);
    })
    .catch((err) => {
      console.error(err);
    });
});

const EployeeFilter = [
  { name: "Department" },
  { name: "Employee Name" },
  { name: "Mobile" },
  { name: "Gender" },
  { name: "Joining Date" },
  { name: "Email" },
];
const empSize = 50;
const employees = [];

for (let i = 0; i < EployeeFilter.length; i += empSize) {
  employees.push(EployeeFilter.slice(i, i + empSize));
}

employees.forEach((empSize) => {
  employeeFilterModel
    .insertMany(empSize)
    .then(() => {
      console.log(`Inserted ${empSize.length} documents`);
    })
    .catch((err) => {
      console.error(err);
    });
});



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
const departmentDataController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;

    const department = await studentDepartmentModel
      .find()
      .skip(startIndex)
      .limit(limit)
      .exec();

    if (!department || department.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Student Department not found",
      });
    }

    const totalDepartment = await studentDepartmentModel
      .countDocuments()
      .exec();

    res.status(200).send({
      success: true,
      message: "Department Fetched successfully",
      department,
      totalDepartment,
      totalPages: Math.ceil(totalDepartment / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    response.status(404).send({
      success: false,
      message: "Error while getting Student Department",
      error,
    });
  }
};

const employeeFilterController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;

    const employeeFilter = await employeeFilterModel
      .find()
      .skip(startIndex)
      .limit(limit)
      .exec();

    if (!employeeFilter || employeeFilter.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Employee Filter Not Found",
      });
    }

    const totalemployeeFilter = await employeeFilterModel
      .countDocuments()
      .exec();
    res.status(200).send({
      success: true,
      message: "Employee Data Fetched Successfully",
      employeeFilter,
      totalemployeeFilter,
      totalPages: Math.ceil(totalemployeeFilter / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    response.status(404).send({
      success: false,
      message: "Error while fetching All employee",
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
      message: "Data fetched successful",
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

const changePasswordController = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    console.log("id", id);

    const user = await AuthModel.findById(id);
    console.log("user", user);

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

const resetPasswordController = async (req, res) => {
  try {
    const { newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({
          success: false,
          message: "New password and confirm password do not match",
        });
    }

    const user = await userModel.findOne();
    console.log("user", user);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
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
      password,
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
    if (password !== user.password) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }
    const JWT_SECRET = "DATA";

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });
    if (user) {
      const userData = {
        email: user.email,
        id: user._id,
        userName: user.userName,
        password: user.password,
      };
      return res.status(201).send({
        id: user._id,
        user: userData,
        token: token,
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

const getUserIdByEmailController = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(404).send({
      message: "Email parameter is required",
    });
  }
  try {
    const user = await AuthModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(201).send({
      id: user._id,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      messsage: "Error while getting getUserIdByEmail",
      error,
    });
  }
};

const clockInController = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const user = await studentModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.isClockedIn) {
      return res
        .status(400)
        .json({ success: false, message: "User is already clocked in" });
    }
    user.isClockedIn = true;
    user.clockInTime = new Date();
    await user.save();
    res.status(200).send({
      success: true,
      message: user.isClockedIn
        ? "User clocked In successfully"
        : "User is already clocked in",
      data: user,
    });
  } catch (error) {
    console.error("Error clocking in user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const clockOutController = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const user = await studentModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.isClockedIn) {
      return res
        .status(400)
        .json({ success: false, message: "User is already clocked out" });
    }
    user.isClockedIn = false;
    user.clockOutTime = new Date();
    await user.save();
    res.status(200).send({
      success: true,
      message: user.isClockedIn
        ? "User is already clocked in"
        : "User clocked out successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error clocking in user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const takeBreakController = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const user = await studentModel.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.isOnBreak) {
      return res
        .status(400)
        .json({ success: false, message: "User is already on Break" });
    }
    user.isOnBreak = false;
    user.clockInTime = new Date();
    await user.save();
    res.status(200).send({
      succes: true,
      message: "User Started Break successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error clocking in user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
module.exports = {
  createStudentController,
  departmentDataController,
  employeeFilterController,
  getAllStudentController,
  updateStudentController,
  deleteStuentController,
  getAllStudentByIdController,
  studentSignUpController,
  studentLoginInController,
  changePasswordController,
  getUserIdByEmailController,
  resetPasswordController,
  clockInController,
  clockOutController,
  takeBreakController,
};
