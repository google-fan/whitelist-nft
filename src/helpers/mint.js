import { getContractWithSigner, getMintedCount } from "./ethers"

export const forgeWeapon = async (counts, setTxStatus, updateCount, alert) => {
  setTxStatus("pending")
  const contract = await getContractWithSigner()

  contract.on("EverWeaponMinted(address, uint256)", () => {
    updateCount()
  })

  try {
    let txHash = await contract.mint(counts)

    let res = await txHash.wait()

    if (res.transactionHash) {
      setTxStatus("success")
      alert.success(`Successfully forged ${counts} weapon`)
      updateCount()

      return {
        status: true,
        message: "Success",
      }
    } else {
      setTxStatus("error")
      alert.error(`Transaction failed`)

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
