const {v4 : uuidv4} = require('uuid');

let classes = []; 
class Class{
  constructor(className){
    this.id = uuidv4();
    this.className = className;
  }

}

function validateClassName(className) {
  return classes.every(classObj => classObj.className !== className);
}

module.exports = {
  classes,
  Class,
  validateClassName,
};