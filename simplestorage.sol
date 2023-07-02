// I' m a comment!

// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

// pragma solidity ^0.8.0 // to use version 0.8.0 above
// pragma solidity >=0.8.0 < 0.9.0 // to use version btw 0.8.0 to 0.9.0
contract SimpleStorage {
    uint256 favoriteNumber;

    struct People {
        uint256 favoriteNumber;
        string name;
    }
    // uint256[] public anArray;
    People[] public people;

    mapping(string => uint256) public nameToFavoriteNumber;

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
    }

    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
}

// contract SimpleStorage {
//     uint265 favoriteNumber;

//     struct People {
//         uint265 favoriteNumber;
//         string name;
//     }

//     // uint265[] public an Array;
//     People[] public people;

//     mapping(string => uint) public nameToFavoriteNunmber;

//     function store() returns () {}
// }

// // function store(uint256 _favoriteNumber) public {
// //     favoriteNumber = _favoriteNumber;
// // }

// // function retrieve() public view return(uint256) {
// //     favoriteNumber = _favoriteNumber;
// // }

// function addPerson(string memory, _name, uint256 _favoriteNumber) public {
//     people.push(People(_favoriteNumber))

// }
