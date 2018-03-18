pragma solidity ^0.4.19;

contract Releases {

  address owner;

  function Releases() public {
      owner = msg.sender;
  }

  /*  need to look into cost difference for hashing the information about the release vs storing it as a direct string.
      so far it just looks like it's so cheap to upload, it doesn't really matter
  */
  struct Release {
    uint id;
    address artist;
    string artistName;
    string title;
    string description;
    string tracklist;
    uint64 price;
    string artwork;
    byte[46][] files;
  }

  event NewRelease(address artist, string title, string artistName);
  Release[] public releases;
  mapping (address => uint) balance;


  function createRelease(string _artistName, string _title, string _description, string _tracklist, uint64 _price, string _artwork, byte[46][] _files) public {
    uint id = releases.length - 1;
    releases.push(Release(id, msg.sender, _artistName, _title, _description, _tracklist, _price, _artwork, _files));
    NewRelease(msg.sender, _title, _artistName);
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

  function releaseInfo(uint _id) public view returns (address _artist, string _artistName, string _title, string _description, string _tracklist) {
    return (releases[_id].artist, releases[_id].artistName, releases[_id].title, releases[_id].description, releases[_id].tracklist);
  }

  function releaseContent(uint _id) public view returns (uint64, string, byte[46][]){
    return (releases[_id].price, releases[_id].artwork, releases[_id].files);
  }

  function releaseCount() public view returns (uint){
    return releases.length;
  }

}
