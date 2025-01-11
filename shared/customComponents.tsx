import React from 'react';

interface BlockComponents {
  normal: (props: { children: React.ReactNode }) => React.JSX.Element;
  h3: (props: { children: React.ReactNode }) => React.JSX.Element;
}

interface CustomComponents {
  block: BlockComponents;
}

const customComponents: CustomComponents = {
  block: {
    normal: ({ children }) => {
      return (
        <p className="text-[#3B3C4A] text-[20px] leading-[32px] font-normal">
          {children}
        </p>
      );
    },

    h3: ({ children }) => {
      return (
        <h3 className="text-[28px] text-[#181A2A] leading-[28px] font-bold pt-8 pb-3">
          {children}
        </h3>
      );
    },
  },
};

export default customComponents;
