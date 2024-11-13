import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Bash from "../components/Bash";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bash" element={<Bash />} />
        </Routes>
    );
}

export default AppRoutes;