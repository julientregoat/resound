pragma solidity ^0.4.19;

contract Releases {

  address owner;

  function Releases() public {
      owner = msg.sender;
  }

  struct Release {
    uint id;
    address artist;
    string artistName;
    string title;
    string description;
    string tracklist;
    uint64 price;
    string artwork;
    byte[120][] files;
  }

  Release[] public releases;
  mapping (address => uint) balance;
  mapping (address => uint[]) userPurchases;
  event NewRelease(address artist, string title, string artistName);

  modifier onlyReleaseOwner(uint _id) {
    require(releases[_id].artist == msg.sender);
    _;
  }

  modifier verifyPayment(uint _id) {
    uint weiPrice = releases[_id].price * 1000000000000000000;
    require(msg.value >= weiPrice);
    _;
  }

  function createRelease(string _artistName, string _title, string _description, string _tracklist, uint64 _price, string _artwork, byte[120][] _files) public {
    uint id = releases.length - 1;
    releases.push(Release(id, msg.sender, _artistName, _title, _description, _tracklist, _price, _artwork, _files));
    NewRelease(msg.sender, _title, _artistName);
  }

  /*  transaction calls */

  function purchaseRelease(uint _id) public payable verifyPayment(_id) {
    balance[releases[_id].artist] = balance[releases[_id].artist] + msg.value;
    userPurchases[msg.sender].push(_id);
  }

  function viewBalance() public view returns (uint){
    return balance[msg.sender];
  }

  function withdraw() public {
    msg.sender.transfer(balance[msg.sender]);
  }

  /*  release info data calls */

  function releaseInfo(uint _id) public view returns (address, string, string, string, string) {
    return (releases[_id].artist, releases[_id].artistName, releases[_id].title, releases[_id].description, releases[_id].tracklist);
  }

  function releaseContent(uint _id) public view returns (uint64, string, byte[120][]) {
    return (releases[_id].price, releases[_id].artwork, releases[_id].files);
  }

  function releaseCount() public view returns (uint){
    return releases.length;
  }

  /*  release management calls */

  function changePrice(uint _id, uint64 _newPrice) public onlyReleaseOwner(_id) {
    releases[_id].price = _newPrice;
  }

}
