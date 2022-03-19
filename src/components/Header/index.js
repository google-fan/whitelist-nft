import { EverVaultLogo, MetamaskLogo } from "resources/Icons"
import { Link } from "react-scroll"
import { FaTwitter, FaDiscord } from "react-icons/fa"
import { HiOutlineSun, HiOutlineCheck, HiOutlineX } from "react-icons/hi"
import "./style.scss"

const setWalletState = (txStatus) => {
  let component

  switch (txStatus) {
    case "pending":
      component = <HiOutlineSun />
      break
    case "success":
      component = <HiOutlineCheck />
      break
    case "error":
      component = <HiOutlineX />
      break
    default:
      component = ""
      break
  }

  return component
}

const Header = ({
  address,
  status,
  txStatus,
  setTxStatus,
  onConnectWallet,
  onMobile,
}) => (
  <div className="header flex">
    <div className="header-wrap container flex">
      <div className="logo flex">
        <EverVaultLogo />
        <span>EVERVAULT</span>
      </div>
      <div className="navbar flex">
        <Link
          activeClass="navbar-active"
          to={"dashboard-hero"}
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          Home
        </Link>
        <Link
          activeClass="navbar-active"
          to={"dashboard-carousel"}
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          Arsenal
        </Link>
        <Link
          activeClass="navbar-active"
          to={"dashboard-statistics"}
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          Weapons
        </Link>
        <Link
          activeClass="navbar-active"
          to={"dashboard-about"}
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
        >
          About
        </Link>
      </div>
      <div className="flex">
        <a
          href="https://twitter.com/EverVaultDAO"
          target="_blank"
          rel="noreferrer"
        >
          <FaTwitter />
        </a>
        <a
          href="https://discord.gg/evervaultdao"
          target="_blank"
          rel="noreferrer"
        >
          <FaDiscord />
        </a>
        <button className="flex bordered-sm" onClick={onConnectWallet}>
          {address === "" ? (
            <p>{status}</p>
          ) : (
            <>
              {txStatus !== "" && (
                <p className={`flex bordered-xs ${txStatus}`}>
                  {setWalletState(txStatus)}
                  <span>{txStatus}</span>
                </p>
              )}
              {onMobile === true ? (
                <p>{`${address.slice(0, 2)}...${address.slice(-4)}`}</p>
              ) : (
                <p>{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
              )}
            </>
          )}
          <MetamaskLogo />
        </button>
      </div>
    </div>
  </div>
)

export default Header
