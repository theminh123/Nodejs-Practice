const express = require("express");
const router = express.Router();

const {Class,classes,validateClassName} = require("../models/class");
const {students} = require("../models/student");


router.post("/", (req, res) => {
  const {className} = req.body;

  if(!validateClassName(className)) {
    return res.status(400).json({error: "Class name already exists"});
  }

  const newClass = new Class(className);
  classes.push(newClass); 
  res.status(201).json(newClass);
});

router.put("/:id", (req, res) => {
  const {id} = req.params;
  const {className} = req.body;

  if(!validateClassName(className)) {
    return res.status(400).json({error: "Class name already exists"});
  }

  const classIndex = classes.findIndex((classObj) => classObj.id === id);

  if(classIndex === -1) {
    return res.status(404).json({error: "Class not found"});
  }

  classes[classIndex].className = className;
  res.status(200).json(classes[classIndex]);
})

router.delete("/:id", (req, res) => {
  const {id} = req.params;
  const classIndex = classes.findIndex((classObj) => classObj.id === id);


  if(classIndex === -1) {
    return res.status(404).json({error: "Class not found"});
  }

  const studentsInClass = students.filter((student) => student.className === classes[classIndex].className);
  if(studentsInClass.length > 0) {
    return res.status(400).json({error: "Class cannot be deleted because there are still students in it"});
  }

  classes.splice(classIndex, 1);
  res.status(200).json({message: "Class deleted successfully"});
})

router.get("/:id", (req, res) => {
  const {id} = req.params;

  const classObj = classes.find((classObj) => classObj.id === id);

  if(!classObj) {
    return res.status(404).json({error: "Class not found"});
  }

  res.json(classObj);
});

module.exports = router;