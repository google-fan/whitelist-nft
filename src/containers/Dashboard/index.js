import { useState, useEffect } from "react"
import detectEthereumProvider from "@metamask/detect-provider"
import { connectWallet, addPolygonChain } from "helpers/metamask"
import { forgeWeapon } from "helpers/mint"
import { getMintedCount } from "helpers/ethers"
import { getAllowance, approveUSDT } from "helpers/usdt"
import { useAlert } from "react-alert"

import Header from "components/Header"
import DashboardComponent from "components/Dashboard"
import Footer from "components/Footer"

const Dashboard = () => {
  const [address, setAddress] = useState("")
  const [onMobile, setOnMobile] = useState(false)

  const [status, setStatus] = useState("Connect Metamask")
  const [txStatus, setTxStatus] = useState("")
  const [mintedCount, setMintedCount] = useState(0)
  const [usdtAllowance, setAllowance] = useState(0)

  const [price, setPrice] = useState(200)
  const [count, setCount] = useState(1)

  const alert = useAlert()

  useEffect(() => {
    const initWeb3 = async () => {
      setAllowance(0)
      updateCount()
      const provider = await detectEthereumProvider()

      if (provider) {
        onConnectWallet()
        onChangeWallet()
      }
    }

    initWeb3()

    window.addEventListener("resize", getWindowWidth)

    return () => window.removeEventListener("resize", getWindowWidth)
  }, [])

  const getWindowWidth = () => {
    const { innerWidth: width } = window

    if (width < 1024) {
      setOnMobile(true)
    } else {
      setOnMobile(false)
    }
  }

  const updateCount = async () => {
    let count = await getMintedCount()

    if (count !== null) {
      setMintedCount(count)
    }
  }

  const onConnectWallet = async () => {
    setTxStatus("")
    const response = await connectWallet()

    if (response.status === "Wrong Network") {
      await addPolygonChain()
    }

    let allowance = await getAllowance(response.address)
    setAllowance(allowance)

    setAddress(response.address)
    setStatus(response.status)
  }

  const onHandleApprove = async (amount, setTxStatus) => {
    let res = await approveUSDT(amount, setTxStatus, alert)
    console.log(res)

    if (res.status === true) {
      let allowance = await getAllowance(address)
      setAllowance(allowance)
    }
  }

  const onChangeWallet = async () => {
    const provider = await detectEthereumProvider()

    if (provider) {
      provider.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setAddress(accounts[0])
        } else {
          setAddress("")
        }
      })

      provider.on("chainChanged", async () => {
        onConnectWallet()
      })
    }
  }

  const onValueChange = async (delta) => {
    if (count + delta <= 0) {
      setCount(1)
    } else if (count + delta >= 20) {
      setCount(20)
    } else {
      setCount(count + delta)
    }

    let allowance = await getAllowance(address)
    console.log(allowance)
    setAllowance(allowance)
  }

  return (
    <>
      <Header
        address={address}
        status={status}
        txStatus={txStatus}
        onMobile={onMobile}
        onConnectWallet={onConnectWallet}
      />
      <DashboardComponent
        alert={alert}
        price={price}
        count={count}
        mintedCount={mintedCount}
        usdtAllowance={usdtAllowance}
        approveUSDT={approveUSDT}
        onHandleApprove={onHandleApprove}
        onValueChange={onValueChange}
        updateCount={updateCount}
        setTxStatus={setTxStatus}
        forgeWeapon={forgeWeapon}
      />
      <Footer />
    </>
  )
}

export default Dashboard
