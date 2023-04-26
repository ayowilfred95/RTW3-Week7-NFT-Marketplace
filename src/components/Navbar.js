import {Link} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

function Navbar() {

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState('0x');
  
  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }
  
  function updateButton() {
    const ethereumButton = document.querySelector('.enableEthereumButton');
    ethereumButton.textContent = "Connected";
    ethereumButton.classList.remove("hover:bg-blue-70");
    ethereumButton.classList.remove("bg-blue-500");
    ethereumButton.classList.add("hover:bg-blue-70");
    ethereumButton.classList.add("bg-blue-500");
  }
  
  async function connectWebsite() {
  
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if(chainId !== '0x5')
      {
        //alert('Incorrect network! Switch your metamask network to Rinkeby');
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x5' }],
       })
      }  
      await window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
          updateButton();
          console.log("here");
          getAddress();
          window.location.replace(location.pathname)
        });
  }
  
    useEffect(() => {
      let val = window.ethereum.isConnected();
      if(val)
      {
        console.log("here");
        getAddress();
        toggleConnect(val);
        updateButton();
      }
  
      window.ethereum.on('accountsChanged', function(accounts){
        window.location.replace(location.pathname)
      })
    },[location.pathname]);
  
      return (
        <div className="">
          <nav className="p-3 bg-[#06132d] ">
            <ul className='container flex flex-wrap justify-between items-center mx-auto'>
            <li className='flex items-end ml-5 pb-2'>
              <Link to="/">
             <div className='self-center text-xl font-semibold whitespace-nowrap text-white'> 
               WilFred NFT Marketplace.
              </div>
              </Link>
            </li>
            <li className='w-2/6'>
              <ul className='flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700'>
                {location.pathname === "/" ? 
                <li className='block py-2 pr-4 pl-3 rounded  md:p-0  text-white'>
                  <Link to="/">Marketplace</Link>
                </li>
                :
                <li className='block py-2 pr-4 pl-3 rounded  md:p-0  text-white'>
                  <Link to="/">Marketplace</Link>
                </li>              
                }
                {location.pathname === "/sellNFT" ? 
                <li className='block py-2 pr-4 pl-3 text-white  rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent'>
                  <Link to="/sellNFT">List My NFT</Link>
                </li>
                :
                <li className='block py-2 pr-4 pl-3 text-white  rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent'>
                  <Link to="/sellNFT">List My NFT</Link>
                </li>              
                }              
                {location.pathname === "/profile" ? 
                <li className='block py-2 pr-4 pl-3 text-white  rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent'>
                  <Link to="/profile">Profile</Link>
                </li>
                :
                <li className='block py-2 pr-4 pl-3 text-white  rounded md:bg-transparent  md:p-0 md:dark:text-white dark:bg-blue-600 md:dark:bg-transparent'>
                  <Link to="/profile">Profile</Link>
                </li>              
                }  
                <li>
                  <button className="enableEthereumButton rounded-full bg-[#725bdb] hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm" onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</button>
                </li>
              </ul>
            </li>
            </ul>
          </nav>
          < hr/>
          <div className='text-white text-bold text-right mr-10 text-sm'>
            {currAddress !== "0x" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "0x" ? (currAddress.substring(0,15)+'...'):""}
          </div>
        </div>
      );
    }
  
    export default Navbar;
