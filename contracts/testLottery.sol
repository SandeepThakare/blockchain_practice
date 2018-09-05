pragma solidity ^0.4.17;

contract mypool{
    address public manager;
    string poolname;
    uint256 poolEndDate;
    uint256 poolAmount;
    
    constructor () public {
        manager = msg.sender;
    }
    
    struct Payer {
        string name;
        address player;
        uint256 amount;
    }
    
    Payer[] public players;
    
    function enterPoolInfo(string name,uint256 endDate, uint256 amount) public {
        poolname = name;
        poolEndDate = endDate;
        poolAmount = amount;
    }
    
    function enter(string name,uint256 amount) public payable {
        require(msg.value > .01 ether);
        // console.log(name, amount, msg.sender, msg.value);
        Payer memory m;
        // players.push(Payer{player:msg.sender,amount:amount});
        m.player = msg.sender;
        m.amount = amount;
        m.name = name;
        players.push(m);
    }
    
    // function getplayer() public returns (address[]){
    //     return players;
    // }
}