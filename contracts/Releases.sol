pragma solidity ^0.4.19;

contract Releases {

  address owner;

  function Releases() public {
      owner = msg.sender;
  }

  struct Release {
    address artist;
    string artistName;
    string title;
    uint id;
  }

  event NewRelease(address artist, string title, string artistName);
  Release[] public releases;
  mapping (address => uint) balance;


  function createRelease(string _artist, string _title) public {
    uint id = releases.length - 1;
    releases.push(Release(msg.sender,_artist, _title, id));
    NewRelease(msg.sender, _title, _artist);
  }

  function purchaseRelease(uint id) public payable {
    require(msg.value > 1000000000000000000);
    balance[releases[id].artist] = balance[releases[id].artist] + msg.value;
  }

  function viewBalance() public view returns (uint){
    return balance[msg.sender];
  }

  function withdraw() public {
    msg.sender.transfer(balance[msg.sender]);
  }

  function releaseInfo(uint _id) public view returns (string artistName, string title, address artist){
    return (releases[_id].artistName, releases[_id].title, releases[_id].artist);
  }

  function releaseCount() public view returns (uint){
    return releases.length;
  }

}
