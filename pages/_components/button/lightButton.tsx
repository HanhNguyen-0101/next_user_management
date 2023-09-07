
export const LightButton = ({ children, ...props }: any) => {
    return (
      <button
        {...props}
        className={`flex justify-center items-center w-full text-blueDark bg-white my-1.5 py-1.5 px-8 focus:outline-none hover:bg-slate-50 rounded border border-blueDark text-lg ${props.className}`}
      >
        {children}
      </button>
    );
  };
  