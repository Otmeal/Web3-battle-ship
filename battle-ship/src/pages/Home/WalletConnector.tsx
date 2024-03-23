import { Button } from "@mui/material";
import { setUserAddress } from "../../../app/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { connectWallet } from "../../util/contractInit";
declare let window: any;

export default function WalletConnector() {
  const userAddress = useSelector((state: any) => state.app.userAddress);
  const isConnected = userAddress !== "";
  const dispatch = useDispatch();

  // 檢查 MetaMask 是否已安裝
  if (typeof window.ethereum !== "undefined") {
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
      const accounts = await connectWallet();
      // accounts 是一個包含用戶賬戶地址的陣列
      const account: string = accounts[0];
      dispatch(setUserAddress(account));
    } catch (error) {}
  }

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
