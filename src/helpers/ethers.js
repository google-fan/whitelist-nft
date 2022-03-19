import { ethers } from "ethers"
import detectEthereumProvider from "@metamask/detect-provider"
import contractABI from "abis/EverWeapons.json"
import { NETWORK } from "configs/index"

// Contract can be used to write Contract
export const getContractWithSigner = async () => {
  const provider = await detectEthereumProvider()
  const infuraProvider = new ethers.providers.Web3Provider(provider)
  const signer = infuraProvider.getSigner()

  const contract = new ethers.Contract(
    NETWORK.CONTRACT_ADDRESS,
    contractABI.abi,
    signer
  )

  return contract
}

// Contract can be used to read Contract
const getContractWithoutSigner = async () => {
  const provider = await detectEthereumProvider()
  const infuraProvider = new ethers.providers.Web3Provider(provider)

  const contract = new ethers.Contract(
    NETWORK.CONTRACT_ADDRESS,
    contractABI.abi,
    infuraProvider
  )

  return contract
}

export const getMintedCount = async () => {
  const contract = await getContractWithoutSigner()

  try {
    let count = await contract.totalSupply()

    return ethers.BigNumber.from(count).toNumber()
  } catch (err) {
    console.log(err.message)
    return null
  }
}
