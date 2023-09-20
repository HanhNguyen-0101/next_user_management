export default function AuthLayout({ children }: any) {
  return (
    <main className="relative bg-auth">
      <div className="absolute top-1/2 left-1/2 md:w-[400px] md:left-auto -translate-x-1/2 md:translate-x-0 -translate-y-1/2 p-10 w-full">
        {children}
      </div>
    </main>
  );
}
