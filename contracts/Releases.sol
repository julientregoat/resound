pragma solidity ^0.4.19;

contract Releases {

  address owner;

  function Releases() public {
      owner = msg.sender;
  }
:
    struct Release {
    uint id;
    address owner;
    string artist;
    string title;
    string description;
    string tracklist;
    /*  price is a 5 digit float 0.0000 */
    uint64 price;
    string artwork;
    byte[120][] files;
  }

  Release[] public releases;
  mapping (address => uint) balance;
  mapping (address => uint[]) userPurchases;
  mapping (address => uint[]) artistReleases;
  event NewRelease(address owner, string title, string artist);

  modifier onlyReleaseOwner(uint _id) {
    require(releases[_id].owner == msg.sender);
    _;
  }

  modifier verifyPayment(uint _id) {
    uint weiPrice = releases[_id].price * 100000000000000;
    require(msg.value >= weiPrice);
    _;
  }

  /* modifier verifyPurchase(uint _id) {
    check the userPurchases mapping
  } */

  function createRelease(string _artist, string _title, string _description, string _tracklist, uint64 _price, string _artwork, byte[120][] _files) public {
    uint id = releases.length;
    releases.push(Release(id, msg.sender, _artist, _title, _description, _tracklist, _price, _artwork, _files));
    artistReleases[msg.sender].push(id);
    NewRelease(msg.sender, _title, _artist);
  }

  /*  transaction calls */

  function purchaseRelease(uint _id) public payable verifyPayment(_id) {
    balance[releases[_id].owner] = balance[releases[_id].owner] + msg.value;
    userPurchases[msg.sender].push(_id);
  }

  function viewBalance() public view returns (uint){
    return balance[msg.sender];
  }

  function withdraw() public {
    msg.sender.transfer(balance[msg.sender]);
    balance[msg.sender] = 0;
  }

  /*  release info data calls */

  function getArtistReleases() public view returns (uint[]) {
    return artistReleases[msg.sender];
  }

  function getUserPurchases() public view returns (uint[]) {
    return userPurchases[msg.sender];
  }

  function releaseInfo(uint _id) public view returns (address, string, string, string, string) {
    return (releases[_id].owner, releases[_id].artist, releases[_id].title, releases[_id].description, releases[_id].tracklist);
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
