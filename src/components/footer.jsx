import { Link } from "react-router-dom"

const Footer = () => {
    const icons = [
        {
            name: "time and date icons",
            author: "Aranagraphics - Flaticon",
            url: "https://www.flaticon.com/free-icons/time-and-date",
        },
        {
            name: "rules icons",
            author: "Smashicons - Flaticon",
            url: "https://www.flaticon.com/free-icons/rules",
        },
        {
            name: "flowchart icons",
            author: "Magnific - Flaticon",
            url: "https://www.flaticon.com/free-icons/flowchart",
        },
        {
            name: "organization chart icons",
            author: "surang - Flaticon",
            url: "https://www.flaticon.com/free-icons/flowchart",
        },
        {
            name: "picture icons",
            author: "Magnific - Flaticon",
            url: "https://www.flaticon.com/free-icons/picture",
        },
    ]
    return (
        <div className={`flex justify-center bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-amber-50 p-10 border-t dark:border-gray-500 border-gray-300`}>
            <div className="flex flex-col w-full gap-2">
                <span className='text-center'>Lab IPA | MTsN 1 Kudus | Prambatan Kidul, Kaliwungu, Kudus | (0291) 431777</span>
                <div className="h-0.5 bg-gray-300 w-full"></div>
                <div className="flex flex-col">
                    <div className="font-semibold">Credits & Attribution</div>
                    <div className="text-sm font-semibold">Icons used in this website:</div>
                    <div className="flex flex-col gap-2 mt-3">
                        {icons.map((item, i) => (
                            <Link to={item.url} key={i} className="flex flex-col">
                                <div className="text-sm">{item.name}</div>
                                <div className="text-xs">{item.author}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer