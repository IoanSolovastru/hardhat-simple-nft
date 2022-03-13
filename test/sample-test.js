const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

describe("EmployeeAdventureNFT", function () {
  it("Mint and transfer", async function () {
    const eaNFT = await ethers.getContractFactory("EmployeeAdventureNFT");
    const eaNFTContract = await eaNFT.deploy();
    await eaNFTContract.deployed();

    const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const metadataURI = 'img/ea.png';

    let balance = await eaNFTContract.balanceOf(recipient);
    expect(balance).to.equal(0);
    const newlyMintedToken = await eaNFTContract.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05'), from: recipient });

    balance = await eaNFTContract.balanceOf(recipient);
    expect(balance).to.equal(1);
  });
});
