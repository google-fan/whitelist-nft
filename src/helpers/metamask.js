import detectEthereumProvider from "@metamask/detect-provider"
import { NETWORK } from "configs/index"

export const connectWallet = async () => {
  const provider = await detectEthereumProvider()

  if (provider) {
    try {
      const walletChainId = await provider.request({
        method: "eth_chainId",
      })

      if (parseInt(walletChainId) === parseInt(NETWORK.CHAIN_ID)) {
        const addressArray = await provider.request({
          method: "eth_requestAccounts",
        })

        if (addressArray.length) {
          return {
            address: addressArray[0],
            status: "",
          }
        } else {
          return {
            address: "",
            status: "Connect Metamask",
          }
        }
      } else {
        return {
          address: "",
          status: "Wrong Network",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "Connect Metamask",
      }
    }
  } else {
    return {
      address: "",
      status: "Install Metamask",
    }
  }
}

export const getCurrentWalletConnected = async () => {
  const provider = await detectEthereumProvider()

  if (provider) {
    try {
      const addressArray = await provider.request({
        method: "eth_accounts",
      })
      const walletChainId = await provider.request({
        method: "eth_chainId",
      })
      if (addressArray.length && walletChainId === NETWORK.CHAIN_ID) {
        return {
          address: addressArray[0],
          status: "",
        }
      } else {
        return {
          address: "",
          status: "Connect Metamask",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "RPC Error",
      }
    }
  } else {
    return {
      address: "",
      status: "Install Metamask",
    }
  }
}

export const addPolygonChain = async () => {
  const provider = await detectEthereumProvider()

  if (provider) {
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            // chainId: "0x13881",
            chainName: "Matic Mainnet",
            // chainName: "Matic Testnet",
            nativeCurrency: {
              name: "Matic",
              symbol: "MATIC",
              decimals: 18,
              // name: "tMatic",
              // symbol: "tMATIC",
              // decimals: 18,
            },
            rpcUrls: ["https://rpc-mainnet.maticvigil.com/"],
            // rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://polygonscan.com/"],
            // blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          },
        ],
      })
    } catch (err) {
      console.log("Chain Add Error")
    }
  }
}
