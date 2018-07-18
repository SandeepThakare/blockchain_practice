pragma solidity ^0.4.18;

contract Inbox {
    string public message;
    
    constructor(string InputMessage) public {
        message = "Hello";
    }
    
    function setMessage(string InputMessage) public  {
        message = InputMessage;
    }
}