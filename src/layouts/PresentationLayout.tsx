import { Outlet } from 'react-router-dom';

const PresentationLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <main className="min-h-screen flex items-stretch justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-10 lg:py-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PresentationLayout;
