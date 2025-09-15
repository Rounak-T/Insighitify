export default function UI({ children }) {
  return (
    <>
      <div className="h-screen flex items-center justify-center font-georgia text-lg " >
        {children}
      </div>
    </>
  );
}
