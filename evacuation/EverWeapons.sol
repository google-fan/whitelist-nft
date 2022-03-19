// SPDX-License-Identifier: MIT

/**
 * ███████╗██╗   ██╗███████╗██████╗     ██╗    ██╗███████╗ █████╗ ██████╗  ██████╗ ███╗   ██╗███████╗
 * ██╔════╝██║   ██║██╔════╝██╔══██╗    ██║    ██║██╔════╝██╔══██╗██╔══██╗██╔═══██╗████╗  ██║██╔════╝
 * █████╗  ██║   ██║█████╗  ██████╔╝    ██║ █╗ ██║█████╗  ███████║██████╔╝██║   ██║██╔██╗ ██║███████╗
 * ██╔══╝  ╚██╗ ██╔╝██╔══╝  ██╔══██╗    ██║███╗██║██╔══╝  ██╔══██║██╔═══╝ ██║   ██║██║╚██╗██║╚════██║
 * ███████╗ ╚████╔╝ ███████╗██║  ██║    ╚███╔███╔╝███████╗██║  ██║██║     ╚██████╔╝██║ ╚████║███████║
 * ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝     ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═══╝╚══════╝
 * 
 * MINT PRICE : 200 USDT
 */

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./TransferHelper.sol";
import "./Pausable.sol";

contract EverWeapons is ERC721Enumerable, Pausable {
    using Counters for Counters.Counter;

    address private USDT = 0xc2132D05D31c914a87C6611C10748AEb04B58e8F; // USDT-polygon address

    struct SaleConfig {
        uint256 startTime;
        uint256 maxCount;
        uint256 duration;
    }

    Counters.Counter private _tokenIds;
    string private baseURI;

    uint256 public constant MAX_SUPPLY = 5000;
    uint256 public totalCount = 0;

    uint256 public price;

    bool public isBurnEnabled = false;

    SaleConfig public saleConfig;

    event SaleConfigChanged(
        uint256 _startTime,
        uint256 _maxCount,
        uint256 _duration
    );

    event PriceChanged (uint256 _price);
    event BaseURIChanged (string _baseURI);
    event BurnEnableChanged (bool _isBurnEnabled);
    event EverWeaponMinted(address _to, uint256 _amount);

    constructor () ERC721("EverWeapons", "EVEWEAPONS") {
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string calldata _tokenBaseURI) public onlyOwner {
        baseURI = _tokenBaseURI;
        emit BaseURIChanged(_tokenBaseURI);
    }

    function setBurnEnable(bool _enableBurn) public onlyOwner {
        isBurnEnabled = _enableBurn;
        emit BurnEnableChanged(_enableBurn);
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function setUpSale(uint256 _startTime, uint256 _maxCount, uint256 _duration) public onlyOwner {
        require(_startTime > 0, "EverWeapons_Setup: Start time can't be 0.");
        require(_startTime > block.timestamp, "EverWeapons_Setup: Start time can't be history.");
        require(_maxCount > 0, "EverWeapons_Setup: Max count can't be 0");
        require(_duration > 0, "EverWeapons_Setup: Duration can't be 0");

        saleConfig = SaleConfig(_startTime, _maxCount, _duration);
        emit SaleConfigChanged(_startTime, _maxCount, _duration);
    }

    function mint (uint256 _amount) public whenNotPaused {
        SaleConfig memory _saleConfig = saleConfig;

        require(_amount > 0, "EverWeapons_Mint: Can't mint zero Weapon.");
        require(_saleConfig.startTime > 0, "EverWeapons_Mint: Sale is not active now.");
        require(
            block.timestamp >= _saleConfig.startTime,
            "EverWeapons_Mint: Please wait a bit until sell time."
        );
        require(
            block.timestamp <= _saleConfig.startTime + _saleConfig.duration,
            "EverWeapons_Mint: Sale has ended."
        );
        require(_amount <= _saleConfig.maxCount, "EverWeapons_Mint: Count exceeds max mint.");
        require(totalCount + _amount <= MAX_SUPPLY, "EverWeapons_Mint: Max supply exeeded");

        require(IERC20(USDT).balanceOf(msg.sender) > price * _amount, "EverWeapons_Mint: Insufficient USDT");

        TransferHelper.safeTransferFrom(address(USDT), address(msg.sender), address(owner()), price * _amount);

        uint256 _newIndex;
        for (uint256 i = 0; i < _amount; i++) {
            _tokenIds.increment();
            _newIndex = _tokenIds.current();

            _safeMint(msg.sender, _newIndex);
            totalCount = totalCount + 1;
        }

        emit EverWeaponMinted(msg.sender, _amount);
    }

    function burn (uint256 tokenId) public {
        require(isBurnEnabled, "EverWeapons_Burn: Burning is currently disabled.");
        require(
            _isApprovedOrOwner(msg.sender, tokenId),
            "EverWeapons_Burn: Burn caller is not the owner nor approved."
        );

        _burn(tokenId);

        totalCount = totalCount - 1;
    }

    function getTokenIdsOfWallet(address _owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(_owner);

        uint256[] memory tokensId = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }
}