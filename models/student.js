const { v4: uuidv4 } = require('uuid');

let students = [];
class Student {
  constructor(name, className){
    this.id = uuidv4();
    this.name = name;
    this.className = className;
  }
}

function validateStudentName(name) {
  return students.every(student => student.name !== name);
}



module.exports = {
  students,
  Student,
  validateStudentName,
};