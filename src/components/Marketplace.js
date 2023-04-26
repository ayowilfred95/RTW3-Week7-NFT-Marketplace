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
    </div>
);

}

   
