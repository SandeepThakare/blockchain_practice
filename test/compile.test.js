
var assert = require('assert');

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

    it("It should be return price of car", () => {
        assert.equal(carObj.getCarPrice(), "800K", "It shoild return price of car");
    });
});

describe("Test cases for Person class : ", () => {

    it("Testting case", () => {
        assert.equal("Ok", "Ok", "Testing");
    });
});