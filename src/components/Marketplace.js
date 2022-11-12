import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";

export default function Marketplace() {
const sampleData = [
    {
        "name": "NFT#1",
        "description": "Wilfred's First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmXRJWYyTdwbxmn5jzRPnyoarSay5tmTdGXNKq13NsHpsb",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2839D76f814EE5D55Ae07785287b836d5979D581",
    },
    {
        "name": "NFT#2",
        "description": "Wilfred's Second NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmQiD9fAqVxeKVKPi1QnTtHA7mBEegnyPog5Q3dT5SCbCj",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2839D76f814EE5D55Ae07785287b836d5979D581",
    },
    {
        "name": "NFT#3",
        "description": "Wilfred's Third NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmSjWMo3EPKTqwDKbNmizaMtow9U4pBGYH3dPvNWYMtGxS",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2839D76f814EE5D55Ae07785287b836d5979D581",
    },
    {
        "name": "NFT#4",
        "description": "Wilfred's Fourth NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmVjz5WCvaJMMxvtzLgWSCRb8TGaTx4cvMe4cUmGihcBKb",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2839D76f814EE5D55Ae07785287b836d5979D581",
    },
    {
        "name": "NFT#5",
        "description": "Wilfred's Fifth NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmYyAC5MbvDFzqbvXK2dJMpzHzrGYWi3PoYdRtUvKQyVA2",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2839D76f814EE5D55Ae07785287b836d5979D581",
    },
    {
        "name": "NFT#5",
        "description": "Wilfred's Sixth NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmTuSFXoHEzxtahJAUDCFVJhoWc3yjVKYqgtnUBDAKbagh",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0x2839D76f814EE5D55Ae07785287b836d5979D581",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

const [email, setEmail ] = useState('');

const handleSubmit =(e)=>{
    e.preventDefault();
    const blog = {email}
    console.log(blog);

}    


return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
           
        <div className="leading-[16px] font-bold text-[12px] text-white container mx-auto">
           THE FUTURE OF ART
            </div>
            <div>
              <br />  
            </div>
            <div className="leading-[56px] font-bold text-[40px] text-white container mx-auto text-start">
           <p>The New Creative</p>
            </div>
            <div className="leading-[56px] font-bold text-[40px] text-white container mx-auto text-start">
            Testnet NFT'S Marketplace
            </div>
            <div className="leading-[56px] font-bold text-[40px] text-white container mx-auto text-start">
           <p className="text-[#e886cc]">Fund Wallet with Goerli</p>
           <a href="https://goerlifaucet.com/" target="_blank" rel="noreferrer">
           <button className="enableEthereumButton bg-[#725bdb] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">
            Fund wallet
           </button>
           </a>
            </div>
            <br />
            <div className="leading-[16px] font-bold text-[12px] text-[#59637d] container mx-auto">
           We're bringing digital creators, crypto natives,
            </div>
            <div className="leading-[16px] font-bold text-[12px] text-[#59637d] container mx-auto">
            and collectors togther to move culture forward
            </div>
            <br />
            <br />
            <br />
            <div className="leading-[56px] font-bold text-[40px] text-white">
           Explore, collect, and sell NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center bg-[#081736]">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div> 
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <hr />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <div >
        <section className=" bg-[url('/img/newsletter.jpeg')] bg-contain bg-auto bg-no-repeat bg-[length:1200px_350px] container mx-auto  ">
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-left sm:text-center">
          <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl text-[#e5e5e5] dark:text-white">Stay in the Loop</h2>
          <p className="mx-auto mb-8 max-w-2xl font-light text-gray-900 md:mb-12 sm:text-xl text-[#e5e5e5] dark:text-white">Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips for navigating Wilfred.</p>
          <form onSubmit={handleSubmit} action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                  <div className="relative w-full">
                      <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div classNmae="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                      </div>
                      
                      <input typeof="text" value={email}
          onChange={(e) => setEmail(e.target.value)} className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required="" />
                  </div>
                  <div>
                      <button onClick={()=> setEmail() } className="rounded-full bg-[#725bdb] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm">Subscribe</button>
                  </div>
              </div>
              <div class="mx-auto max-w-screen-sm text-sm text-left text-[#ffffff]  text-gray-500  newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
          </form>
      </div>
  </div>
</section>
    </div>
    </div>
);

}

   
