import React from 'react';
interface Step {
  id: string;
  name: string;
}

interface StepperComponentProps {
  stepper: Step[];
  componentsId: string;
  setComponentsId: (id: string) => void;
}

const StepperComponent: React.FC<StepperComponentProps> = ({
  stepper,
  componentsId,
  setComponentsId,
}) => {
  return (
    <div className="flex flex-row items-center gap-4 cursor-pointer">
      {stepper.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center gap-2"
          onClick={() => setComponentsId(step.id)}
        >
          <div
            className={`flex items-center justify-center h-[32px] w-[32px]   rounded-full border-2 
              ${
                step.id <= componentsId ? ' border-[rgba(29,87,199,1)]    ' : ''
              }`}
          >
            {step.id >= componentsId ? (
              <div
                className={`${step.id <= componentsId ? 'text-[rgba(29,87,199,1)]' : 'text-[rgba(206,215,232,1)]'}`}
              >
                {step.id}
              </div>
            ) : (
              <div className="bg-[rgba(29,87,199,1)] h-[32px] w-[39px] flex items-center justify-center   rounded-full">
                <svg
                  width="17"
                  height="13"
                  viewBox="0 0 17 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.57825 9.642L15.2202 0L16.5005 1.28025L5.57825 12.2025L0.5 7.12575L1.78025 5.8455L5.57825 9.642Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </div>

          <div
            className={`${
              step.id <= componentsId
                ? 'text-[rgba(29,87,199,1)]'
                : 'text-[rgba(129,134,140,1)]'
            }`}
          >
            {step.name}
          </div>

          {index < stepper.length - 1 && (
            <div
              className={`border-b-2 border-solid w-[40px] pt-1 border-[rgba(206,215,232,1)]`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepperComponent;
