const express = require("express");
const router = express.Router();

const {Student,students,validateStudentName} = require("../models/student");
const {classes} = require("../models/class");


router.post("/", (req, res) => {
  const {name, className} = req.body;

  if(!className) {
    return res.status(400).json({error: "Student must have a class"});
  }

  const classExists = classes.some((classObj) => classObj.className === className);

  if(!classExists) {
    return res.status(404).json({error: "Class not found"});
  }

  if(!validateStudentName(name)) {
    return res.status(400).json({error: "Student name already exists"});
  }

  const newStudent = new Student(name, className);
  students.push(newStudent);
  res.status(201).json(newStudent);
});

router.put("/:id", (req, res) => {
  const {id} = req.params;
  const {name, className} = req.body;

  if(!className) {
    return res.status(400).json({error: "Student must have a class"});
  }

  const classExists = classes.some((classObj) => classObj.className === className);

  if(!classExists) {
    return res.status(404).json({error: "Class not found"});
  }

  if(!validateStudentName(name)) {
    return res.status(400).json({error: "Student name already exists"});
  }

  const studentIndex = students.findIndex((student) => student.id === id);

  if(studentIndex === -1) {
    return res.status(404).json({error: "Student not found"});
  }

  students[studentIndex].name = name;
  students[studentIndex].className = className;

  res.status(200).json(students[studentIndex]);

});

router.delete("/:id", (req,res) => {
  const {id} = req.params;
  const studentIndex = students.findIndex((student) => student.id === id);

  if(studentIndex === -1) {
    return res.status(404).json({error: "Student not found"});
  }

  students.splice(studentIndex, 1);
  res.status(200).json({message: "Student deleted successfully"});
});

router.get("/", (req, res) => {
  res.json(students);
});

router.get("/search/:id", (req, res) => {
  const {id} = req.params;

  const student = students.find((student) => student.id === id);

  if(!student) {
    return res.status(404).json({error: "Student not found"});
  }

  res.json(student);
});

router.get("/search", (req,res) => {
  const {name} = req.query;

  const matchedStudents = students.filter((student) => student.name.toLowerCase().includes(name.toLowerCase()));

  if (!matchedStudents) {
    return res.status(404).json({error: 'Student not found' });
  }

  res.json(matchedStudents);
});

router.get("/class/:className", (req, res) => {
  const {className} = req.params;
  const matchedStudents = students.filter((student) => student.className.replace(/\s/g,'').toLowerCase() === className.replace(/\s/g,'').toLowerCase());

  if (!matchedStudents) {
    return res.status(404).json({error: 'Student not found' });
  }
  res.json(matchedStudents);
});

module.exports = router;