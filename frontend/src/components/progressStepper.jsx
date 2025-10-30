import React from "react";

const ProgressStepper = ({ currentStepIndex }) => {
  const steps = ["Certificate Information", "Payment", "Application Print"];

  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex rounded-md overflow-hidden shadow-sm border border-gray-200">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;

          return (
            <div
              key={step}
              className={`
                flex-1 text-center py-3 md:py-4 font-semibold text-sm md:text-base 
                transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressStepper;
