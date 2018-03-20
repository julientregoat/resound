# tbd dApp
==========

Still working on a name for this one.

This is a web app is a decentralized music marketplace.

The goal here was to develop a front end using React/Redux, and develop an 'always on' decentralized backend. In doing so, people could choose to use the website without this frontend due to the nature of such a backend.

In developing this decentralized serverless architecture, I leveraged two services:
  * The Ethereum Virtual Machine as a database for primitive data types and transaction logic.
    * I was limited to transaction logic here because of the cost of *gas*. Storing large files in here was not an option, since the goal is for this website to be accessible; large files on here would be cost prohibitive for the average artist.
  * IPFS (InterPlanetary File System) as a location for blob storage.
    * One caveat here is that while the IPFS is *designed* to be decentralized, that is contingent on other people 'pinning' your data on their server. As such, it's not *inherently* decentralized. Currently, this web app is designed to be running on a server that is expected to have an IPFS daemon running in the background in order to connect it to the network. While it is yet to be implemented, a solution around this would likely be requiring artists to pin data to their own servers / computers, and the server 're-pinning' it locally for a fee to speed up transmission to the artist's fans. Alternatively, in lieu of a fee, artists could re-pin a certain amount of other artists data. This would force more artists to join the network, and as such, hosting the data, speeding up the network overall. This is the ideal solution, but also the tougher option to convince the masses of. It also unfairly leaves out artists who don't necessarily have access to internet in this way, so that would have to be worked out.


- I definitely don't need Redux for this at this point, but I want to practice with it.
- In its current iteration, the files hashes are exposed to the public. This clearly isn't secure for artists avoiding piracy.
