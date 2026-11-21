import { FlaskConical, Sun, Moon } from "lucide-react"
import { Link } from "react-router-dom"
import { useTheme } from "../context/themeContext"

const Navbar = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <nav className={`${isDark} z-50 w-full fixed bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-amber-50 px-4 border-b dark:border-gray-500 border-gray-300 `}>
            <div className="flex items-center justify-between">
                <Link to="/" className="flex gap-1 cursor-pointer p-2">
                    <FlaskConical size={30} className={`dark:text-amber-200 text-amber-500`} />
                    <span className="font-bold text-xl">
                        Lab IPA
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        className="text-xl cursor-pointer"
                        onClick={toggleTheme}>
                        {isDark ? (
                            <Moon size={30} className="text-amber-300" />
                        ) : (
                            <Sun size={30} className="text-amber-500" />
                        )}
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar