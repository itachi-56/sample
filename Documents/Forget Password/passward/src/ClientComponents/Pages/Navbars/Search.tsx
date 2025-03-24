const Search = (props: { setNavOpen?: any; showInput?: boolean }) => {
  return (
    <div className="flex items-center duration-500">
      <div className="flex gap-[4px] md:gap-[6px]">
        <div className=" self-center text-[14px] font-medium">
          <label htmlFor="top-search">
            <i className="icon-search"></i>
          </label>
        </div>
        {props.showInput && (
          <div className="">
            <input
              type="text"
              id="top-search"
              placeholder="Search..."
              className="focus:outline-0 text-lg w-[57px] md:w-[150px] text-color-header-search-default-text-color font-header-search-font-weight md:text-header-search-font-size bg-header-bg-color"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
