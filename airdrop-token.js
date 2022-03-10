import { ethers } from "ethers";

// // This is the address to our ERC-1155 membership NFT contract.
// const bundleDropModule = sdk.getBundleDropModule(
//   "0xd61752C932beBaf0A4067C64DeF97C63564888E8",
// );

// This is the address to our ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
  "0x1234",
);

(async () => {
  
    
    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const dropAmount = Math.floor( 1+ 2);
      console.log("✅ Going to airdrop", dropAmount, "tokens to", address);
      
      // Set up the target.
      const airdropTarget = {
        address,
        // Remember, we need 18 decimal placees!
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
      };
  
      return airdropTarget;
    });
    
    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...")
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to");
  } 
  catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();