import { UilSearch } from "@iconscout/react-unicons"


const MInput = (props) => {
  // eslint-disable-next-line react/prop-types
 

  return (
    <div className="w-[70%] h-[60px] flex items-center rounded-full bg-white px-4 gap-4 cursor-pointer">
      <span className="text-gray-400"><UilSearch /></span>
      <span>Search the Market here</span>
    </div>
  );
};

export default MInput;
