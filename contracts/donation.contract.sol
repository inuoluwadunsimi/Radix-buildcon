// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./PriceConverter.sol";


contract FundMe {
    using PriceConverter for uint256;

    uint256 public minimumUsd = 50 * 1e18;

    address[] public funders;
    mapping (address => uint256) public addressToAmountFunded;


    function fund() public payable{
      require(msg.value.getConversionRate() >= minimumUsd, "Didn't send enough");
        funders.push(msg.sender);
        addressToAmountFunded[msg.sender] += msg.value;

}

    

    function withdraw() public { 
        for(uint256 funderIndex = 0; funderIndex < funders.length; funderIndex ++) {

            address funder = funders[funderIndex];
            addressToAmountFunded[funder]= 0;
        }
            funders = new address[] (0);

    }
}
