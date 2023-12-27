import React from "react";
import { useSelector } from "react-redux";
import { GeneralMap } from "../views/GeneralMap";
import { MapLayout } from "../layout/MapLayout";
import { MedellinMap } from "../views/MedellinMap";

export const MapsPage = () => {
  
  const { generalMapActive, medellinMapActive } = useSelector(
    (state) => state.map
  );

  return (
    <MapLayout>
      {generalMapActive && <GeneralMap />}
      {medellinMapActive && <MedellinMap />}
    </MapLayout>
  );
};
