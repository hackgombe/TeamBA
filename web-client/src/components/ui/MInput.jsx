import { UilSearch } from "@iconscout/react-unicons"


const MInput = (props) => {
  // eslint-disable-next-line react/prop-types
 

  return (
    <div className="relative w-[50%] h-[60px]">
      <input className="w-full h-full flex items-center rounded-full bg-white px-4 pl-10" placeholder={props.placeholder} />
      <span className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"><UilSearch /></span>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 text-white rounded-full bg-black flex items-center justify-center"><UilSearch /></span>
    </div>
  );
};

export default MInput;