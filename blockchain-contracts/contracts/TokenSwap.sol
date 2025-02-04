pragma solidity ^0.8.0;

contract TokenSwap {

    event TokenLocked(address indexed sender, uint256 amount, uint256 timestamp);

    mapping(address => uint256) public balances;

    constructor() {
        balances[msg.sender] = 1000;
    }

    function lockTokens(uint256 _amount) external {
        require(balances[msg.sender] >= _amount, "Insufficient balance");
        balances[msg.sender] -= _amount;
        emit TokenLocked(msg.sender, _amount, block.timestamp);
    }

    function getBalance(address _account) external view returns (uint256) {
        return balances[_account];
    }
}
