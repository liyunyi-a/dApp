import React, { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import TokenSwapABI from "./contracts/TokenSwap.json";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [lockAmount, setLockAmount] = useState("");
  const [contract, setContract] = useState(null);

  const contractAddress = "0x5dfBf4cb9773203231788cEF4965257bD771C59E";

  useEffect(() => {
    async function init() {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAccount = await signer.getAddress();
        setAccount(userAccount);
  
        const tokenSwapContract = new Contract(
          contractAddress,
          TokenSwapABI.abi,
          signer
        );
        setContract(tokenSwapContract);
  
        try {
          const bal = await tokenSwapContract.getBalance(userAccount);
          console.log("User Balance:", bal.toString()); // 输出用户余额
          setBalance(Number(bal));
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
  
      } else {
        alert("Please install MetaMask！");
      }
    }
    init();
  }, []);
  

  const handleLockTokens = async () => {
    if (!contract || !lockAmount) return;
    try {
      const tx = await contract.lockTokens(lockAmount);
      await tx.wait();
      const bal = await contract.getBalance(account);
      setBalance(bal.toNumber());
      alert("Lock Success!");
    } catch (error) {
      console.error("Lock Error:", error);
      alert("Lock failed!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cross-chain token swap Demo</h2>
      <p>Current Account:{account}</p>
      <p>Current Balance:{balance}</p>
      <div>
        <input
          type="number"
          placeholder="Enter the lock quantity"
          value={lockAmount}
          onChange={(e) => setLockAmount(e.target.value)}
        />
        <button onClick={handleLockTokens}>Locking Tokens</button>
      </div>
      <p>
      Note: After locking the tokens, the event will notify the off-chain cross-chain monitoring system (this is only a simulation).
      </p>
    </div>
  );
}

export default App;