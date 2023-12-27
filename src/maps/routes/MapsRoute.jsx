import { MapsPage } from "../pages/MapsPage";
import { Navigate, Route, Routes } from "react-router-dom";

export const MapsRoute = () => {
  
  return (
    <Routes>
      <Route path="/" element={<MapsPage />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
