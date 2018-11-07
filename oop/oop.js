/**
 *  Overview of how inheritance 'works' in JS.
 *
 *  I use it rarely, in JS composition is a much
 *  better pattern in my opinion, or just create
 *  objects on the fly as needed.
 */

// Static method on Object: derive Child from Parent. Note that this does not exist natively in JS; you have to implement it yourself
Object.prototype.extend = function(Child, Parent) {
  let Temp = function() {};
  Temp.prototype = new Parent();
  Child.prototype = new Temp();
  Child.prototype.constructor = Child;
};

// Base 'class' constructor
function Animal() {
  this.type = "animal";
  // We want all animals to print their type
  this.toString = function() {
    return `I am a(n) ${this.type}`;
  };
}

// Will be derived 'class' depth 1
function Canid() {
  this.type = "canid";
}

// Will be derived 'class' depth 2
function Dog() {
  this.type = "dog";
}

// Actually extend them
Object.extend(Canid, Animal);
Object.extend(Dog, Canid);

const animal = new Animal();
const canid = new Canid();
const dog = new Dog();

console.log("\n" + animal, "\n" + canid, "\n" + dog);
