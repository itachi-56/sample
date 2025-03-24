'use client';

const Loader = () => {
  return (
    <>
      <div
        className="h-full w-full flex justify-center items-center absolute z-20"
      >
        <div className="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
};

export default Loader;
