import React from "react";
import { StickyNavbar } from "../../components/Navabar";

import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  return (
    <div className="bg-black">
      <StickyNavbar />
    </div>
  );
};

export default SingleProduct;
