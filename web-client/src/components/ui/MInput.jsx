import { useRef, useState } from "react";

/**
 *
 * @param {React.HTMLInputTypeAttribute<HTMLInputElement>} props
 *
 */
const MInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, ...rest } = props;
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);

  const onInputChange = (ev) => {
    setHasValue(ev.target.value !== "");
  };

  return (
    <div className="w-full">
      <div className="relative h-fit w-full min-w-full">
        <input
          ref={inputRef}
          id="input"
          className="peer bg-white  h-[70px] w-full rounded-2xl border border-blue-gray-200 bg-transparent px-3 pb-2 pt-6 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-transparent placeholder-shown:select-none focus-within:placeholder-current  focus:border-black focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder={
            rest.placeholder || (typeof label === "string" ? label : "")
          }
          onChange={(ev) => onInputChange(ev)}
          {...rest}
        />
        <label
          htmlFor="input"
          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex w-fit select-none text-black transition-all ${
            hasValue
              ? "font-bold text-gray-900 -translate-y-6 text-sm"
              : "peer-focus:font-bold peer-focus:text-gray-900 peer-focus:-translate-y-6 peer-focus:text-sm"
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default MInput;
