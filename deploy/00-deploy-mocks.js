const { network } = require("hardhat");
const { ethers } = require("ethers");
const { developmentChains } = require("../helper-hardhat-config");

const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LIMIT = 1e9;

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.name;
  const args = [BASE_FEE, GAS_PRICE_LIMIT];

  if (developmentChains.includes(network.name)) {
    log("local network detected! Deploying mocks ...");
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args,
    });
    log("Mocks Deployed!..");
    log("---------------------------------------------------------------");
  }
};

module.exports.tags = ["all", "mocks"];
