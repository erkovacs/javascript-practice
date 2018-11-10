/**
 *  Overview of how ES6 cleans up JS's inheritance by adding classes
 *
 *  Should be noted though that this is just syntactic sugar over the 
 *  pre-existing prototypal inheritance model.
 */

class Animal {
  constructor(){
    this.type = "animal";
  }
  toString(){
    return `I am a(n) ${this.type}`;
  }
}

class Canid extends Animal {
  constructor(){
    super();
    this.type = "canid";
  }
}


class Dog extends Canid {
  constructor(){
    super();
    this.type = "dog";
  }
}

const animal = new Animal();
const canid = new Canid();
const dog = new Dog();

console.log(`${animal}\n${canid}\n${dog}\n`);
