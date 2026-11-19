import { FlaskConical, Sun, Moon, ChevronDown, Menu } from "lucide-react"
import { useState } from 'react'
import { Link } from "react-router-dom"
import { useTheme } from "../context/themeContext"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { isDark, toggleTheme } = useTheme()
    const [openInv, setOpenInv] = useState(false)
    const [openPrak, setOpenPrak] = useState(false)
    const [openLab, setOpenLab] = useState(false)
    return (
        <nav className={`${isDark} z-50 w-full fixed bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-amber-50 px-4 border-b dark:border-stone-500 border-stone-300 `}>
            <div className="flex items-center justify-between">
                <Link to="/" className="flex gap-1 cursor-pointer p-2">
                    <FlaskConical size={30} className={`${isDark ? 'text-amber-200' : 'text-amber-500'}`} />
                    <span className="font-bold text-xl">
                        Lab IPA
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    {/* desktop */}
                    {/* <div className="hidden sm:flex gap-5">
                        <div className="relative group">
                            <button
                                type="button"
                                className="flex items-center gap-2 p-4 font-bold hover:bg-stone-500 hover:text-white">
                                Inventaris
                                <ChevronDown size={20} />
                            </button>

                            <div
                                className="absolute top-full left-0 z-50
                               flex min-w-40 flex-col bg-stone-500
                               p-4 text-white shadow-md
                               invisible opacity-0
                               group-hover:visible group-hover:opacity-100
                               group-focus-within:visible
                               group-focus-within:opacity-100
                               transition-opacity duration-200"
                            >
                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Alat Fisika
                                </Link>

                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Alat Kimia
                                </Link>
                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Alat Biologi
                                </Link>
                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Bahan
                                </Link>
                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Perabotan
                                </Link>
                            </div>
                        </div>
                        <div className="relative group">
                            <button
                                type="button"
                                className="flex items-center gap-2 p-4 font-bold hover:bg-stone-500 hover:text-white">
                                Praktikum
                                <ChevronDown size={20} />
                            </button>

                            <div
                                className="absolute top-full left-0 z-50
                               flex min-w-40 flex-col bg-stone-500
                               p-4 text-white shadow-md
                               invisible opacity-0
                               group-hover:visible group-hover:opacity-100
                               group-focus-within:visible
                               group-focus-within:opacity-100
                               transition-opacity duration-200"
                            >
                                <Link
                                    to="/lkpd"
                                    className="my-1 hover:underline"
                                >
                                    LKPD
                                </Link>

                                <Link
                                    to="/labvirtual"
                                    className="my-1 hover:underline"
                                >
                                    Lab Virtual
                                </Link>
                                <Link
                                    to="/jadwal"
                                    className="my-1 hover:underline"
                                >
                                    Jadwal Praktikum
                                </Link>
                                <Link
                                    to="/sop"
                                    className="my-1 hover:underline"
                                >
                                    SOP
                                </Link>
                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Dokumentasi
                                </Link>
                            </div>
                        </div>
                        <div className="relative group">
                            <button
                                type="button"
                                className="flex items-center gap-2 p-4 font-bold hover:bg-stone-500 hover:text-white">
                                Laboratorium
                                <ChevronDown size={20} />
                            </button>

                            <div
                                className="absolute top-full left-0 z-50
                               flex min-w-40 flex-col bg-stone-500
                               p-4 text-white shadow-md
                               invisible opacity-0
                               group-hover:visible group-hover:opacity-100
                               group-focus-within:visible
                               group-focus-within:opacity-100
                               transition-opacity duration-200"
                            >
                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Tata Tertib
                                </Link>

                                <Link
                                    to="/"
                                    className="my-1 hover:underline"
                                >
                                    Struktur Organisasi
                                </Link>
                            </div>
                        </div>
                    </div> */}
                    <button
                        className="text-xl cursor-pointer"
                        onClick={toggleTheme}>
                        {isDark ? (
                            <Moon size={30} className="text-amber-300" />
                        ) : (
                            <Sun size={30} className="text-amber-500" />
                        )}
                    </button>
                    {/* mobile */}
                    {/* <button onClick={() => setOpen(!open)} className="flex sm:hidden group relative cursor-pointer p-4">
                        <Menu size={20} />
                    </button> */}
                    {/* mobile nav */}
                </div>
            </div>
            {/* {open && (
                <div className="flex flex-col items-center gap-2 p-4 sm:hidden dark:bg-stone-800">
                    <button onClick={() => setOpenInv(!openInv)} className="flex font-bold items-end cursor-pointer">
                        Inventaris
                        <ChevronDown size={20} />
                    </button>
                    {openInv && (
                        <div className="flex flex-col items-center duration-200">
                            <a className="hover:underline cursor-pointer my-1">
                                Alat Fisika
                            </a>
                            <a className="hover:underline cursor-pointer my-1">
                                Alat Kimia
                            </a>
                            <a className="hover:underline cursor-pointer my-1  ">
                                Alat Biologi
                            </a>
                            <a className="hover:underline cursor-pointer my-1">
                                Bahan
                            </a>
                            <a className="hover:underline cursor-pointer my-1">
                                Perabotan
                            </a>
                        </div>
                    )}
                    <button onClick={() => setOpenPrak(!openPrak)} className="flex font-bold items-end cursor-pointer">
                        Praktikum
                        <ChevronDown size={20} />
                    </button>
                    {openPrak && (
                        <div className="flex flex-col items-center duration-200">
                            <Link to="/lkpd" className="hover:underline cursor-pointer my-1">
                                LKPD
                            </Link>
                            <Link to="/labvirtual" className="hover:underline cursor-pointer my-1">
                                Lab Virtual
                            </Link>
                            <Link to="/jadwal" className="hover:underline cursor-pointer my-1  ">
                                Jadwal Praktikum
                            </Link>
                            <Link to="/sop" className="hover:underline cursor-pointer my-1">
                                SOP
                            </Link>
                            <a className="hover:underline cursor-pointer my-1">
                                Dokumentasi
                            </a>
                        </div>
                    )}
                    <button onClick={() => setOpenLab(!openLab)} className="flex font-bold items-end cursor-pointer">
                        Laboratorium
                        <ChevronDown size={20} />
                    </button>
                    {openLab && (
                        <div className="flex flex-col items-center duration-200">
                            <a className="hover:underline cursor-pointer my-1">
                                Tata Tertib
                            </a>
                            <a className="hover:underline cursor-pointer my-1">
                                Struktur Organisasi
                            </a>
                        </div>
                    )}
                    <button
                        className="text-xl cursor-pointer sm:hidden"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    >
                        {theme === "light" ? "🔆" : "🌕"}
                    </button>
                </div>
            )} */}
        </nav>
    )
}

export default Navbar