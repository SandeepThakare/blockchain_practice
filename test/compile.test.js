
var chai = require('chai');
var assert = chai.assert

class Car {

    getCarStatus() {
        return "stopped";
    }

    getCarPrice() {
        return "800K";
    }
}

class Person {

    getPersonName() {
        return "Sandeep";
    }

    getPersonAge() {
        return 25;
    }
}

describe("Test cases for Car class : ", () => {
    
    let carObj;
    beforeEach("Setting up car object: ", () => {
        carObj = new Car();
        // console.log('beforeEach')
    });

    it("It should be return car status", () => {
        assert.equal(carObj.getCarStatus(), "stopped", "It shoild be run");
    });

    it("It should be return car status is string or not", () => {
        assert.isString(carObj.getCarStatus(), "It shoild be a string");
    });

    it("It should be return price of car", () => {
        assert.equal(carObj.getCarPrice(), "800K", "It shoild return price of car");
    });
});

describe("Test cases for Person class : ", () => {

    let personObj;
    beforeEach('Setting up the Persons object', () => {
        personObj = new Person();
    });

    it("It should return person name", () => {
        assert.equal(personObj.getPersonName(), "Sandeep", "Returning name of person");
    });

    it("It should return persons age", () => {
        assert.equal(personObj.getPersonAge(), 25, "Returning age of person");
    });

    it("It should return person age in number", () => {
        assert.isNotString(personObj.getPersonAge(), "Return integer - Number");
    });
});