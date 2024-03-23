import { Button } from "@mui/material";
import { setUserAddress } from "../../../app/appSlice";
import { useSelector, useDispatch } from "react-redux";
declare let window: any;

export default function WalletConnector() {
  const userAddress = useSelector((state: any) => state.app.userAddress);
  const isConnected = userAddress !== "";
  const dispatch = useDispatch();

  // 檢查 MetaMask 是否已安裝
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
  } else {
    return (
      <Button variant="contained" color="primary">
        Install that damned Mask {">"}:[
      </Button>
    );
  }

  async function getAddress() {
    try {
      // 請求用戶授權連接到 MetaMask
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // accounts 是一個包含用戶賬戶地址的陣列
      const account: string = accounts[0];
      dispatch(setUserAddress(account));
      console.log(`User's address: ${userAddress}`);
    } catch (error) {
      // 處理錯誤，可能是用戶拒絕了連接請求
      console.error("An error occurred:", error);
    }
  }

  console.log("isConnected", isConnected);
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={getAddress}
        disabled={isConnected}
        sx={{ width: "80%" }}
      >
        {isConnected
          ? "Connected as " +
            userAddress.slice(0, 6) +
            "..." +
            userAddress.slice(-4)
          : "Connect"}
      </Button>
    </>
  );
}
