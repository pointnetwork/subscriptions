// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Subscriptions is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    using Counters for Counters.Counter;
    Counters.Counter internal _subscriptionIds;

    struct Subscription {
        address contractAddress;
        string[] topics;
    }

    mapping (address => uint256[]) public subscriptionsIdsByUser;
    mapping (uint256 => Subscription) public subscriptionsById;
    mapping (address => uint256) public blockNumbersByUser;

    function initialize() public initializer onlyProxy {
        __Ownable_init();
        __UUPSUpgradeable_init();
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function subscribe(
        address contractAddress,
        string[] calldata topics
    ) public {
        require(topics.length > 0, "Event filter should have at least 1 topic");
        require(topics.length <= 4, "Event filter cannot have more than 4 topics");

        _subscriptionIds.increment();
        uint256 newSubscriptionId = _subscriptionIds.current();

        subscriptionsIdsByUser[msg.sender].push(newSubscriptionId);
        subscriptionsById[newSubscriptionId] = Subscription(contractAddress, topics);
        blockNumbersByUser[msg.sender] = block.timestamp;
    }

    function unsubscribe(uint256 index) public {
        uint256 userSubscriptionsLength = subscriptionsIdsByUser[msg.sender].length;

        require(index < userSubscriptionsLength, "Non-existent subscription index");

        subscriptionsIdsByUser[msg.sender][index] = subscriptionsIdsByUser[msg.sender][userSubscriptionsLength - 1];
        subscriptionsIdsByUser[msg.sender].pop();
    }

    function updateBlockTimeStamp() public {
        blockNumbersByUser[msg.sender] = block.timestamp;
    }

    function getSubscriptionsByUser(address userAddress)
        public
        view
        returns (Subscription[] memory)
    {
        uint256 userSubscriptionsLength = subscriptionsIdsByUser[userAddress].length;

        Subscription[] memory userSubscriptions = new Subscription[](userSubscriptionsLength);
        for (uint i = 0; i < userSubscriptionsLength; i++) {
            userSubscriptions[i] = subscriptionsById[subscriptionsIdsByUser[userAddress][i]];
        }

        return userSubscriptions;
    }
}
