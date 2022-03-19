import AliceCarousel from "react-alice-carousel"
import { ethers } from "ethers"
import { RiNumber1, RiNumber5, RiAddLine, RiSubtractLine } from "react-icons/ri"
import { Evervault, Rings } from "resources/Images"
import "react-alice-carousel/lib/scss/alice-carousel.scss"
import "./style.scss"
import {
  StaffOfShibPic,
  BitcoinBatonPic,
  EverWandPic,
  StaffOfETHPic,
  UsdceptorPic,
  TetherTridentPic,
  EverChestPic,
} from "resources/Images"

import EverWeapons from "resources/videos/1_Staff_of_Shib.mp4"
import BitcoinBaton from "resources/videos/2_Bitcoin_Baton.mp4"
import EverWand from "resources/videos/3_Ever_Wand.mp4"
import StaffofETH from "resources/videos/4_Staff_of_ETH.mp4"
import TheUsceptor from "resources/videos/5_The_Usceptor.mp4"
import TheTetherTrident from "resources/videos/6_The_Tether_Trident.mp4"
import EverChest from "resources/videos/Chest.mp4"

const makeUnified = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const responsive = {
  0: { items: 1 },
  424: { items: 2 },
  767: { items: 3 },
  1024: { items: 4 },
}

const items = [
  <div className="carousel-video">
    <div className="video">
      <img src={StaffOfShibPic} alt="shib" />
    </div>
    <div className="description flex">
      <p>Staff of Shiba</p>
    </div>
  </div>,
  <div className="carousel-video">
    <div className="video">
      <img src={BitcoinBatonPic} alt="bitcoin" />
    </div>
    <div className="description flex">
      <p>Bitcoin Baton</p>
    </div>
  </div>,
  <div className="carousel-video">
    <div className="video">
      <img src={EverWandPic} alt="ever" />
    </div>
    <div className="description flex">
      <p>Ever Wand</p>
    </div>
  </div>,
  <div className="carousel-video">
    <div className="video">
      <img src={StaffOfETHPic} alt="eth" />
    </div>
    <div className="description flex">
      <p>Staff of ETH</p>
    </div>
  </div>,
  <div className="carousel-video">
    <div className="video">
      <img src={UsdceptorPic} alt="usdc" />
    </div>
    <div className="description flex">
      <p>The Usceptor</p>
    </div>
  </div>,
  <div className="carousel-video">
    <div className="video">
      <img src={TetherTridentPic} alt="tether" />
    </div>
    <div className="description flex">
      <p>The Tether Trident</p>
    </div>
  </div>,
]

const Dashboard = ({
  alert,
  price,
  count,
  mintedCount,
  usdtAllowance,
  onHandleApprove,
  onValueChange,
  updateCount,
  setTxStatus,
  forgeWeapon,
}) => (
  <div className="dashboard flex">
    <div className="dashboard-wrap container flex-column">
      <div className="dashboard-hero grid">
        <div className="dashboard-hero-title flex-column">
          <h1>The Ever Weapons</h1>
          <p>
            6 mighty weapons, forged on the blockchain and delivered to our
            warriors.
          </p>
        </div>
      </div>

      <div className="dashboard-mint grid bordered-lg">
        <div className="dashboard-mint-title flex-column">
          <h1>Mint</h1>
          <p>
            Mighty warriors, you must now choose. How many weapons do you
            require?
          </p>
          <div className="flex">
            <span>
              Total : <span>{makeUnified(price * count)} USDT</span>
            </span>
            <span>
              NFT's Minted: <span>{mintedCount}</span> / 5000
            </span>
          </div>
        </div>
        <div className="dashboard-mint-minter grid">
          <div className="dashboard-mint-minter-option flex-column">
            <div className="counter grid">
              <div
                className="flex bordered-sm shadowed"
                onClick={() => onValueChange(-5)}
              >
                <RiSubtractLine />
                <RiNumber5 />
              </div>
              <div
                className="flex flex bordered-sm shadowed"
                onClick={() => onValueChange(-1)}
              >
                <RiSubtractLine />
                <RiNumber1 />
              </div>
              <input
                type="number"
                className="bordered-sm shadowed"
                readOnly
                value={count}
              />
              <div
                className="flex bordered-sm shadowed"
                onClick={() => onValueChange(1)}
              >
                <RiAddLine />
                <RiNumber1 />
              </div>
              <div
                className="flex bordered-sm shadowed"
                onClick={() => onValueChange(5)}
              >
                <RiAddLine />
                <RiNumber5 />
              </div>
            </div>
          </div>
          <button
            className="bordered-sm shadowed"
            onClick={() => {
              if (usdtAllowance >= price * count) {
                console.log(usdtAllowance >= price * count)
                return forgeWeapon(count, setTxStatus, updateCount, alert)
              } else {
                return onHandleApprove(ethers.constants.MaxUint256, setTxStatus)
              }
            }}
          >
            {usdtAllowance >= price * count ? "forge" : "Approve"}
          </button>
        </div>
      </div>

      <div className="dashboard-carousel flex-column">
        <h1 className="flex-column" title="The Arsenal">
          The Arsenal
        </h1>
        <AliceCarousel
          autoPlay
          autoPlayInterval={3000}
          infinite
          items={items}
          responsive={responsive}
          disableButtonsControls
          mouseTracking
        />
      </div>

      <div className="dashboard-rarity flex-column">
        <h1 className="flex-column" title="The Power of the Ever Weapons">
          The Power of the Ever Weapons
        </h1>
        <div className="dashboard-rarity-main grid">
          <div className="dashboard-rarity-main-staffs grid">
            <div className="item flex-column rounded-md">
              <img className="rounded-sm" src={BitcoinBatonPic} alt="bitcoin" />
              <div className="flex">
                <span>The Bitcoin Baton</span>
                <span>200 USDT</span>
              </div>
            </div>
            <div className="item flex-column rounded-md">
              <img className="rounded-sm" src={StaffOfShibPic} alt="shib" />
              <div className="flex">
                <span>The Staff of Shib</span>
                <span>200 USDT</span>
              </div>
            </div>
            <div className="item flex-column rounded-md">
              <video className="rounded-sm" autoPlay muted loop>
                <source src={EverChest} type="video/mp4" />
                Your browser does not support html video
              </video>
              <div className="flex">
                <span>The Ever Chest</span>
                <span>200 USDT</span>
              </div>
            </div>
          </div>
          <div className="dashboard-rarity-main-info flex-column">
            <span>Forged In Fire</span>
            <h2>The Value Of Utility</h2>
            <div></div>
            <p>
              Each one of our mighty weapons will provide users with passive
              income in the form of the EVE token. Every 2 weeks, our
              blacksmiths will take a snapshot of the Polygon blockchain. Any
              address that is holding one of our mighty weapons will receive
              their share of the hoard to the same address on the Binance Smart
              Chain (BSC). If you are fortunate enough to wield the Staff of
              Shib then alongside your share of the hoard you will also receive
              a X1 whitelist allocation for the EverVault. We will be allocating
              2% of all EVE staking rewards, in the EverVault, to be distributed
              to NFT holders.
            </p>
          </div>
        </div>
        <Evervault />
      </div>

      <div className="dashboard-statistics flex-column">
        <h1 className="flex-column" title="The Mighty Ever Weapons">
          The Mighty Ever Weapons
        </h1>
        <div className="dashboard-statistics-first grid">
          <Rings />
          <div className="dashboard-statistics-item flex-column rounded-md">
            <video className="rounded-sm" autoPlay muted loop>
              <source src={EverWeapons} type="video/mp4" />
              Your browser does not support html video
            </video>
            <h4>The Staff of Shib</h4>
            <div className="flex-column">
              <span>10% Drop Rate (500 Max Supply)</span>
              <span>1X Guaranteed Whitelist Allocation</span>
              <span>31% Of The Allocated Staking Rewards</span>
            </div>
          </div>
          <div className="dashboard-statistics-item flex-column rounded-md">
            <video className="rounded-sm" autoPlay muted loop>
              <source src={BitcoinBaton} type="video/mp4" />
              Your browser does not support html video
            </video>
            <h4>The Bitcoin Baton</h4>
            <div className="flex-column">
              <span>13% Drop Rate (650 Max Supply)</span>
              <span>23% Of The Allocated Staking Rewards</span>
            </div>
          </div>
          <div className="dashboard-statistics-item flex-column rounded-md">
            <video className="rounded-sm" autoPlay muted loop>
              <source src={EverWand} type="video/mp4" />
              Your browser does not support html video
            </video>
            <h4>The Ever Wand</h4>
            <div className="flex-column">
              <span>14% Drop Rate (700 Max Supply)</span>
              <span>18% Of The Allocated Staking Rewards</span>
            </div>
          </div>
        </div>
        <div className="dashboard-statistics-second grid">
          <Rings />
          <div className="dashboard-statistics-item flex-column rounded-md">
            <video className="rounded-sm" autoPlay muted loop>
              <source src={StaffofETH} type="video/mp4" />
              Your browser does not support html video
            </video>
            <h4>The Staff of ETH</h4>
            <div className="flex-column">
              <span>16% Drop Rate (800 Max Supply)</span>
              <span>14% Of The Allocated Staking Rewards</span>
            </div>
          </div>
          <div className="dashboard-statistics-item flex-column rounded-md">
            <video className="rounded-sm" autoPlay muted loop>
              <source src={TheUsceptor} type="video/mp4" />
              Your browser does not support html video
            </video>
            <h4>The Usceptor</h4>
            <div className="flex-column">
              <span>21% Drop Rate (1050 Max Supply)</span>
              <span>9% Of The Allocated Staking Rewards</span>
            </div>
          </div>
          <div className="dashboard-statistics-item flex-column rounded-md">
            <video className="rounded-sm" autoPlay muted loop>
              <source src={TheTetherTrident} type="video/mp4" />
              Your browser does not support html video
            </video>
            <h4>The Tether Trident</h4>
            <div className="flex-column">
              <span>26% Drop Rate (1300 Max Supply)</span>
              <span>6% Of The Allocated Staking Rewards</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-about flex-column">
        <h1 className="flex-column" title="About us">
          About us
        </h1>
        <div className="dashboard-about-main flex">
          <video className="rounded-sm" autoPlay muted loop>
            <source src={EverChest} type="video/mp4" />
            Your browser does not support html video
          </video>
          <div className="title flex-column">
            <h3>The EverVault</h3>
            <p className="flex-column">
              <span>
                EverVault is designed with long-term health in mind. All EVE
                minted for staking rewards are backed with a reserve of
                SafeShiba, BTC, ETH, BNB, and Stablecoins.
              </span>
              <span>
                We are a paradigm shift in the DAO space, we favour long-term
                sustainability over unfeasible APY’s.
              </span>
              <span>
                We are a thought leader in all work that we conduct and push the
                boundaries to make the most incredible products.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-liquidity flex-column">
        <h1 className="flex-column" title="Liquidity Protected">
          Liquidity Protected
        </h1>
        <p>EverVault LP is owned and protected by EverVault itself.</p>
        <p>
          The EverVault Treasury has ownership of nearly all the EVE liquidity,
          which helps provide further stability and security for users.
          Partnering this feature up with our state of the art dual-treasury
          system, we can overcome any unfavourable market conditions.
        </p>
      </div>
    </div>
  </div>
)

export default Dashboard
