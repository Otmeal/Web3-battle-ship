import { createBrowserRouter } from "react-router-dom";
import HomeRoute from "./Home.tsx";
import GameRoute from "./Game.tsx";

const router = createBrowserRouter([HomeRoute, GameRoute]);

export default router;
