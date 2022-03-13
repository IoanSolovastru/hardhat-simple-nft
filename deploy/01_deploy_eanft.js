const { ethers } = require("hardhat")
let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    log("-------- Starting deploying EA NFT ------------")
    const EANFT = await deploy("EmployeeAdventureNFT", {
        from: deployer,
        log: true
    });
    log("-------- EA NFT deployed ------------")

    // Tehnically isn't part of the deployement process => we act like we do not have the above info
    const eanftContract = await ethers.getContractFactory("EmployeeAdventureNFT")
    const accounts = await hre.ethers.getSigners()
    const signer = accounts[0]
    const eanft = new ethers.Contract(EANFT.address, eanftContract.interface, signer)
    const networkName = networkConfig[chainId]['name']
    // Verify contract
    log(`Verify with: \n npx hardhat verify --network ${networkName} ${eanft.address}`)

    let transactionResponse = await eanft.payToMint(deployer, 'https://ipfs.io/ipfs/QmPQFjUuEohvtPXxzee81Npx8fq6fToC52pE2osshZSbCB', { value: ethers.utils.parseEther('0.05'), from: deployer })
    let recipient = await transactionResponse.wait(1)
    log(`You've made an NFT`)
    log(`You can view the token URI here ${await eanft.tokenURI(0)}`)

}
module.exports.tags = ['all', 'mocks', 'rsvg', 'svg', 'main']
