import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { ThemeProvider } from './context/themeContext.jsx'
import HomePage from './pages/home.jsx'
import './index.css'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import JadwalPage from './pages/jadwal.jsx'
import SopPage from './pages/sop.jsx'
import DetailInventarisPage from './pages/detailInventaris.jsx'
import TataTertibPage from './pages/tataTertib.jsx'
import StrukturOrganisasiPage from './pages/strukturOrganisasi.jsx'
import DokumentasiPage from './pages/dokumentasi.jsx'

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'jadwal',
        element: <JadwalPage />,
      },
      {
        path: 'sop',
        element: <SopPage />,
      },
      {
        path: 'detailInventaris/:kode',
        element: <DetailInventarisPage />,
      },
      {
        path: 'tataTertib',
        element: <TataTertibPage />,
      },
      {
        path: 'strukturOrganisasi',
        element: <StrukturOrganisasiPage />,
      },
      {
        path: 'dokumentasi',
        element: <DokumentasiPage />,
      },
    ],
  },
],
  {
    basename: import.meta.env.BASE_URL.replace(/\/$/, ''),
  }
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
