export const DarkButton = ({ children, ...props }: any) => {
  return (
    <button
      {...props}
      className={`text-white disabled:opacity-70 bg-blueDark my-1.5 py-1.5 px-8 focus:outline-none rounded border border-blueDark text-lg ${props.className}`}
    >
      {children}
    </button>
  );
};
