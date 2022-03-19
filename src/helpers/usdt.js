import { BigNumber, ethers } from "ethers"
import detectEthereumProvider from "@metamask/detect-provider"
import contractABI from "configs/usdt.json"
import { NETWORK } from "configs/index"

// Contract can be used to write Contract
export const getContractWithSigner = async () => {
  const provider = await detectEthereumProvider()
  const infuraProvider = new ethers.providers.Web3Provider(provider)
  const signer = infuraProvider.getSigner()

  const contract = new ethers.Contract(
    NETWORK.USDT_ADDRESS,
    contractABI,
    signer
  )

  return contract
}

// Contract can be used to read Contract
const getContractWithoutSigner = async () => {
  const provider = await detectEthereumProvider()
  const infuraProvider = new ethers.providers.Web3Provider(provider)

  const contract = new ethers.Contract(
    NETWORK.USDT_ADDRESS,
    contractABI,
    infuraProvider
  )

  return contract
}

export const getAllowance = async (address) => {
  const contract = await getContractWithoutSigner()

  console.log(address)

  try {
    let count = await contract.allowance(address, NETWORK.CONTRACT_ADDRESS)

    return ethers.BigNumber.from(count).toBigInt()
  } catch (err) {
    console.log(err.message)
    return null
  }
}

export const approveUSDT = async (amount, setTxStatus, alert) => {
  setTxStatus("pending")
  const contract = await getContractWithSigner()

  try {
    let txHash = await contract.approve(NETWORK.CONTRACT_ADDRESS, amount)

    let res = await txHash.wait()

    if (res.transactionHash) {
      setTxStatus("success")
      alert.success("Successfully approved")

      return {
        status: true,
        message: "Successfully approved",
      }
    } else {
      setTxStatus("error")
      alert.error("Transaction failed")

      return {
        status: false,
        message: "Transaction failed",
      }
    }
  } catch (error) {
    setTxStatus("error")
    alert.error(`Transaction failed: ${error}`)

    return {
      status: false,
      message: error,
    }
  }
}
