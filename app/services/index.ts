// Config
import allowStudentRegister from "./config/allowStudentRegister";
import getHourLabels from "./config/getHourLabels";
import getDomainRestriction from "./config/domainRestriction/getDomainRestriction";
import getNumberSessions from "./config/getNumberSessions";
import getSessionTimes from "./config/getSessionTimes";
import getSessionTitles from "./config/getSessionTitles";
import getSignupAllowed from "./config/signupAllowed/getSignupAllowed";
import getTeacherRegisterAllowed from "./config/teacherRegister/getTeacherRegisterAllowed";
import setDomainRestriction from "./config/domainRestriction/setDomainRestriction";
import setSignupAllowed from "./config/signupAllowed/setSignupAllowed";
import setTeacherRegisterAllowed from "./config/teacherRegister/setTeacherRegisterAllowed";
import setNumberSessions from "./config/setNumberSessions";
import setSessionTimes from "./config/getSessionTimes";
// i added those
import getSessionNames from "./config/getSessionNames"
import setSessionNames from "./config/setSessionNames"

// Data

import getDefaultDay from "./data/getDefaultDay";
import getDefaultReactions from './data/getDefaultReactions';
import getSchoolName from "./data/getSchoolName";
import setDefaultDay from "./data/setDefaultDay";
import setDefaultReactions from "./data/setDefaultReactions";
import setSchoolName from "./data/setSchoolName";

// Enrollment
import batchEnroll from "./enrollment/batchEnroll";
import enrollStudent from "./enrollment/enrollStudent";
import getHourEnrollments from "./enrollment/getHourEnrollments";
import getIsLocked from "./enrollment/getIsLocked";
import getSessionEnrollments from "./enrollment/getSessionEnrollments";
import getStudentEnrollments from "./enrollment/getStudentEnrollments";
import unenrollFromHour from "./enrollment/unenrollFromHour";
import updateEnrollment from "./enrollment/updateEnrollment";

// Groups
import getGroupOptions from "./groups/getGroupOptions";
import getUserGroupOptions from "./groups/getUserGroupOptions";
import setGroupOptions from "./groups/setGroupOptions";
import setUserGroupOptions from "./groups/setUserGroupOptions";

// Sessions
import addTeacherSession from "./sessions/addTeacherSession";
import getHourSessions from "./sessions/getHourSessions";
import getTeacherSessions from "./sessions/getTeacherSessions";
import getUnsignedStudents from "./sessions/getUnsignedStudents";
import removeTeacherSession from "./sessions/removeTeacherSession";
import unenrollFromSession from "./enrollment/unenrollFromSession";
import updateSession from "./sessions/updateSession";

// User
import deleteUser from "./user/deleteUser";
import getAllStudents from "./user/getAllStudents";
import getAllTeachers from "./user/getAllTeachers";
import getAllUsers from "./user/getAllUsers";
import getUser from "./user/getUser";
import getUserType from "./user/getUserType";
import setUserType from "./user/setUserType";
import updateUser from "./user/updateUser";


export {
  // Config
  allowStudentRegister,
  getHourLabels,
  getDomainRestriction,
  getNumberSessions,
  getSessionTimes,
  getSessionTitles,
  getSignupAllowed,
  getTeacherRegisterAllowed,
  setDomainRestriction,
  setSignupAllowed,
  setTeacherRegisterAllowed,
  setNumberSessions,
  setSessionTimes,
  // i added this 
  getSessionNames,
  setSessionNames,
  // Data
  getDefaultDay,
  getDefaultReactions,
  getSchoolName,
  setDefaultDay,
  setDefaultReactions,
  setSchoolName,
  // Enrollment
  batchEnroll,
  enrollStudent,
  getHourEnrollments,
  getIsLocked,
  getSessionEnrollments,
  getStudentEnrollments,
  unenrollFromHour,
  unenrollFromSession,
  updateEnrollment,
  // Groups
  getGroupOptions,
  getUserGroupOptions,
  setGroupOptions,
  setUserGroupOptions,
  // Sessions
  addTeacherSession,
  getAllStudents,
  getHourSessions,
  getTeacherSessions,
  getUnsignedStudents,
  removeTeacherSession,
  updateSession,
  // User
  deleteUser,
  getUser,
  getAllTeachers,
  getAllUsers,
  getUserType,
  setUserType,
  updateUser,
}
