pragma solidity ^0.4.17;

contract Lottery {
    
    address public manager;
    address[] public players;
    address public winner;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        
        require(
            msg.value > .01 ether,
            "Must send an ether amount > .01 ether"
            );
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    function pickWinner() public restricted {
        // address frod = 0x706043818BFB7E199DBb0bcf55AB6e0e309291A4;
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        winner = players[index];
        players = new address[](0);
    }
    
    modifier restricted() {
        require(
            msg.sender == manager,
            "Sender must be a manager"
            );
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

    function getBalance() public view returns (uint) {
        return this.balance;
    }
}