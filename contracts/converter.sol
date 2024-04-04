// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";


library PriceConverter {
    function getPrice() internal  view returns(uint256) {
        //ABI 
        //0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf);
        (, int price,,,) = priceFeed.latestRoundData();
        return uint256 (price * 1e10);
    }

    function getVersion() internal view returns(uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x47Fb2585D2C56Fe188D0E6ec628a38b74fCeeeDf);
        return  priceFeed.version();
    }

    function getConversionRate(uint256 ethAmount) internal view returns (uint256) {
    uint256 ethPrice = getPrice();    
    uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18;
    return ethAmountInUsd;

    }
}
