import {
  EVEBig,
  EverVaultLogo,
  Medium,
  Discord,
  Twitter,
} from "resources/Icons"
import "./style.scss"

const Footer = () => (
  <div className="footer flex">
    <div className="footer-wrapper container flex-column">
      <div className="footer-socials flex">
        <a href="https://evervaultdao.finance" target="_blank" rel="noreferrer">
          <EverVaultLogo />
        </a>
        <a
          href="https://medium.com/@evervault"
          target="_blank"
          rel="noreferrer"
        >
          <Medium />
        </a>
        <a
          href="https://discord.gg/evervaultdao"
          target="_blank"
          rel="noreferrer"
        >
          <Discord />
        </a>
        <a
          href="https://twitter.com/EverVaultDAO"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter />
        </a>
      </div>

      <div className="footer-decoration flex">
        <EVEBig />
      </div>
    </div>
  </div>
)

export default Footer
