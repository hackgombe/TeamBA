import React from "react";
import GNavbar from "../../components/ui/GNavbar";

const AllProductPage = () => {
  return (
    <div>
      <GNavbar />
      <div className="mt-12 flex items-center justify-center w-full">
        <div className="w-[80%]">
          <div className="grid gap-6 grid-cols-4">
            <div className="shadow-xl bg-white h-[300px] ">
              <div></div>
              <div>
                <h5>Rice and Tomatos</h5>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductPage;
