 import { Navigate, Route, Routes } from "react-router-dom"
import { MapsPage } from "../pages/MapsPage"


 export const MapsRoute = () => {
   return (
     <Routes>
         <Route path="/" element={ <MapsPage /> } />

         <Route path="/*" element={ <Navigate to="/" /> } />
     </Routes>
   )
 }