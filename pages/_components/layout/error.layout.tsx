export default function ErrorLayout({ children }: any) {
  return (
    <main className="relative bg-error">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto">
        {children}
      </div>
    </main>
  );
}
