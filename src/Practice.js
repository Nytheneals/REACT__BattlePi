// IMPLICIT BINDING
// EXPLICIT BINDING
// new Binding
// WINDOW BINDING

// This Keyword is based off where the function is invoked.

// IMPLICIT BINDING

// const me = {
//  name: 'Tyler',
//  age: 25,
//  sayName: function () {
//   console.log(this.name)
//  }
// }

// note the this keyword is the object itself

// me.sayName();

const sayNameMixin = function(obj) {
  obj.sayName = function() {
    console.log(this.name);
  };
};

const me = {
  name: 'Tyler',
  age: 25,
};

const you = {
  name: 'Joey',
  age: 14,
};

sayNameMixin(me);
sayNameMixin(you);

me.sayName();
you.sayName();

// EXPLICIT BINDING
// call, apply, bind

// call applies argumemnt on by one
// apply applies all arguements without implicitly adding them
// bind attaches the this keyword to the place its called ie the left of the keyword this

// CALL
const sayName = function() {
  console.log(`My name  is ${this.name}`);
};

const stacey = {
  name: 'Stacey',
  age: 34,
};

sayName.call(stacey);

// CALL WITH ARGUMENTS--> It invokes the function by us passing in arguments one by one from a array

const sayName = function(lang1) {
  console.log(`My name  is ${this.name} and i know ${lang1}`);
};

const stacey = {
  name: 'Stacey',
  age: 34,
};

const langs = ['JavaCript', 'React', 'Redux'];

sayName.call(stacey, [...langs]);

// APPLY WITH ARGUMENTS --> It invokes the function without us passing in arguments one by one from a array

const sayName = function(lang1, lang2, lang3) {
  console.log(`My name  is ${this.name} and i know ${lang1}, ${lang2}, ${lang3}`);
};

const stacey = {
  name: 'Stacey',
  age: 34,
};

const langs = ['JavaScript', 'React', 'Redux'];

sayName.apply(stacey, langs);

// BIND WITH ARGUMENTS -> RETURNS A FUNCTION

const sayName = function(lang1, lang2, lang3) {
  console.log(`My name  is ${this.name} and i know ${lang1}, ${lang2}, ${lang3}`);
};

const stacey = {
  name: 'Stacey',
  age: 34,
};

const langs = ['JavaScript', 'React', 'Redux'];
const newStacey = sayName.bind(stacey, langs); // bind binds this (stacey) to sayName();

// NEW BINDING

const Animal = function(color, name, age) {
  this.color = color;
  this.name = name;
  this.age = age;
};

const zebra = new Animal('Black and white', 'Zoobi', 24);
