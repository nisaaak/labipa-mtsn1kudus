import { useState, useEffect, useMemo } from "react"
import logoImg from '../assets/logo-mts.png'
import jadwal from '../assets/jadwal.png'
import struktur from '../assets/struktur.png'
import tataTertib from '../assets/tataTertib.png'
import sop from '../assets/sop.png'
import picture from '../assets/picture.png'
import { Astroid, Search, List, LayoutGrid } from "lucide-react"
import ImageSlider from "../components/imageSlider"
import { Link } from "react-router-dom"
import { useTheme } from "../context/themeContext"
import FullCalendar from "@fullcalendar/react";
import themePlugin from "@fullcalendar/react/themes/breezy"; // YOUR THEME
import dayGridPlugin from "@fullcalendar/react/daygrid";

// stylesheets
import '@fullcalendar/react/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/react/themes/breezy/theme.css'; // YOUR THEME
import '@fullcalendar/react/themes/breezy/palettes/amber.css'; // YOUR THEME'S PALETTE


const HomePage = () => {
    const { isDark, toggleTheme } = useTheme()
    // const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [dataInven, setDataInven] = useState([])
    const [dataLKPD, setDataLKPD] = useState([])
    const [dataLabV, setDataLabV] = useState([])
    const [dataHome, setDataHome] = useState([])
    const [dataKalender, setDataKalender] = useState([])

    const [filter, setFilter] = useState('');
    const [search, setSearch] = useState("");
    const [layout, setLayout] = useState('List')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const url = 'https://script.google.com/macros/s/AKfycbzujD_PjOZQwQVRA3bru9K9Ao08BGj8kmfwHAROqKermg9jFSJ06heaJaejL4UUhYrLCQ/exec'
                const [resInventaris, resLKPD, resLabV, resHome, resKalender] =
                    await Promise.all([
                        fetch(url + '?sheet=Inventaris'),
                        fetch(url + '?sheet=LKPD'),
                        fetch(url + '?sheet=LabVirtual'),
                        fetch(url + '?sheet=Home'),
                        fetch(url + '?sheet=Kalender'),
                    ]);

                if (
                    !resInventaris.ok ||
                    !resLKPD.ok ||
                    !resLabV.ok ||
                    !resHome.ok ||
                    !resKalender.ok
                ) {
                    throw new Error("Gagal mengambil data");
                }

                const [dataInventaris, dataLKPD, dataLabV, dataHome, dataKalender] =
                    await Promise.all([
                        resInventaris.json(),
                        resLKPD.json(),
                        resLabV.json(),
                        resHome.json(),
                        resKalender.json()
                    ]);

                setDataInven(dataInventaris);
                setDataLKPD(dataLKPD);
                setDataLabV(dataLabV)
                setDataHome(dataHome)
                setDataKalender(dataKalender.map(item => ({ title: item.title, date: item.date, extendedProps: { jam: item.jam, kelas: item.kelas, guru: item.guru } })))

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        let difilter = dataInven.filter((item) => {
            if (filter && search) {
                console.log('kondisi 1')
                return item.kategori === filter && item.nama.toLowerCase().includes(search.toLowerCase())
            } else if (filter) {
                console.log('kondisi 2')
                return item.kategori === filter
            } else if (search) {
                console.log('kondisi 3')
                return item.nama.toLowerCase().includes(search.toLowerCase())
            } else {
                console.log('kondisi 4')
                return item
            }
        })
        return difilter
    }, [dataInven, filter, search]);

    if (loading) {
        return (
            <div class="flex items-center min-h-screen justify-center space-x-2 pt-20">
                <div
                    class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-500 border-t-transparent"
                ></div>
                <p class="text-gray-600 dark:text-gray-300">Loading...</p>
            </div>
        )
    }

    if (error) {
        return <p className="pt-20 pb-7">Gagal memuat data: {error}</p>
    }

    return (
        <div className={`bg-white text-gray-800 dark:text-white dark:bg-gray-800 px-5 sm:px-20 flex flex-col gap-4 py-18`}>
            {/* section */}
            <div className="flex gap-7">
                <div className="w-auto h-auto">
                    <img src={logoImg} className="w-40 h-auto" alt="" />
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-2xl sm:text-3xl text-gray-700 dark:text-gray-50">
                        Laboratorium IPA
                    </span>
                    <span className="font-bold text-2xl sm:text-3xl text-gray-700 dark:text-gray-50">
                        MTsN 1 Kudus
                    </span>
                    <span className="text-xs sm:text-sm border-t-gray-500 dark:border-t-gray-300 border-t-2 mt-4 text-gray-500 dark:text-gray-300">
                        Sistem informasi dan manajemen Laboratorium IPA MTsN 1 Kudus
                    </span>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                    <div className="flex items-center">
                        <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                        <span className="text-xl font-semibold">Inventaris</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari nama, kode, atau lokasi..."
                                className="w-full rounded border border-gray-600 dark:border-gray-400 p-1 text-sm bg-white dark:bg-gray-600"
                            />
                            <button className="p-2 cursor-pointer rounded-full bg-gray-300 dark:bg-gray-500">
                                <Search size={20} className="text-gray-500 dark:text-gray-100" />
                            </button>
                        </div>
                        <div className="flex justify-between gap-2 mt-2">
                            <div className="flex gap-1">
                                <button
                                    onClick={() => { setFilter(filter !== 'Fisika' ? 'Fisika' : '') }}
                                    className={`${filter === "Fisika"
                                        ? isDark
                                            ? "bg-gray-100"
                                            : "bg-gray-600"
                                        : isDark
                                            ? "bg-gray-700"
                                            : "bg-gray-300"} 
                                            ${filter === "Fisika"
                                            ? isDark
                                                ? "text-amber-600"
                                                : "text-amber-300"
                                            : isDark
                                                ? "text-gray-300"
                                                : "text-gray-500"} 
                                                ${filter === "Fisika"
                                            ? isDark
                                                ? "border-gray-700"
                                                : "border-gray-100"
                                            : isDark
                                                ? "border-gray-400"
                                                : "border-gray-400"}
                                       border px-2 py-1 rounded-tr-2xl text-xs cursor-pointer`}>
                                    Fisika
                                </button>
                                <button
                                    onClick={() => { setFilter(filter !== 'Kimia' ? 'Kimia' : '') }}
                                    className={`${filter === "Kimia"
                                        ? isDark
                                            ? "bg-gray-100"
                                            : "bg-gray-600"
                                        : isDark
                                            ? "bg-gray-700"
                                            : "bg-gray-300"} 
                                            ${filter === "Kimia"
                                            ? isDark
                                                ? "text-amber-600"
                                                : "text-amber-300"
                                            : isDark
                                                ? "text-gray-300"
                                                : "text-gray-500"} 
                                                ${filter === "Kimia"
                                            ? isDark
                                                ? "border-gray-700"
                                                : "border-gray-100"
                                            : isDark
                                                ? "border-gray-400"
                                                : "border-gray-400"}
                                       border px-2 py-1 rounded-tr-2xl text-xs cursor-pointer`}>
                                    Kimia
                                </button>
                                <button
                                    onClick={() => { setFilter(filter !== 'Biologi' ? 'Biologi' : '') }}
                                    className={`${filter === "Biologi"
                                        ? isDark
                                            ? "bg-gray-100"
                                            : "bg-gray-600"
                                        : isDark
                                            ? "bg-gray-700"
                                            : "bg-gray-300"} 
                                            ${filter === "Biologi"
                                            ? isDark
                                                ? "text-amber-600"
                                                : "text-amber-300"
                                            : isDark
                                                ? "text-gray-300"
                                                : "text-gray-500"} 
                                                ${filter === "Biologi"
                                            ? isDark
                                                ? "border-gray-700"
                                                : "border-gray-100"
                                            : isDark
                                                ? "border-gray-400"
                                                : "border-gray-400"}
                                       border px-2 py-1 rounded-tr-2xl text-xs cursor-pointer`}>
                                    Biologi
                                </button>
                                <button
                                    onClick={() => { setFilter(filter !== 'Bahan' ? 'Bahan' : '') }}
                                    className={`${filter === "Bahan"
                                        ? isDark
                                            ? "bg-gray-100"
                                            : "bg-gray-600"
                                        : isDark
                                            ? "bg-gray-700"
                                            : "bg-gray-300"} 
                                            ${filter === "Bahan"
                                            ? isDark
                                                ? "text-amber-600"
                                                : "text-amber-300"
                                            : isDark
                                                ? "text-gray-300"
                                                : "text-gray-500"} 
                                                ${filter === "Bahan"
                                            ? isDark
                                                ? "border-gray-700"
                                                : "border-gray-100"
                                            : isDark
                                                ? "border-gray-400"
                                                : "border-gray-400"}
                                       border px-2 py-1 rounded-tr-2xl text-xs cursor-pointer`}>
                                    Bahan
                                </button>
                                <button
                                    onClick={() => { setFilter(filter !== 'Perabot' ? 'Perabot' : '') }}
                                    className={`${filter === "Perabot"
                                        ? isDark
                                            ? "bg-gray-100"
                                            : "bg-gray-600"
                                        : isDark
                                            ? "bg-gray-700"
                                            : "bg-gray-300"} 
                                            ${filter === "Perabot"
                                            ? isDark
                                                ? "text-amber-600"
                                                : "text-amber-300"
                                            : isDark
                                                ? "text-gray-300"
                                                : "text-gray-500"} 
                                                ${filter === "Perabot"
                                            ? isDark
                                                ? "border-gray-700"
                                                : "border-gray-100"
                                            : isDark
                                                ? "border-gray-400"
                                                : "border-gray-400"}
                                       border px-2 py-1 rounded-tr-2xl text-xs cursor-pointer`}>
                                    Perabot
                                </button>
                            </div>
                            <div className="hidden sm:flex items-center">
                                <button onClick={() => { setLayout('List') }} className={`px-2 py-1 border border-gray-500 rounded-l-xl ${layout == 'List' ? 'bg-gray-300' : 'bg-white'}`}>
                                    <List size={15} className="text-gray-500" />
                                </button>
                                <button onClick={() => { setLayout('Grid') }} className={`px-2 border py-1 border-gray-500 rounded-r-xl ${layout == 'Grid' ? 'bg-gray-300' : 'bg-white'}`}>
                                    <LayoutGrid size={15} className="text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex sm:hidden justify-between">
                        <div className="text-sm">
                            Tampilan
                        </div>
                        <div className="flex items-center">
                            <button onClick={() => { setLayout('List') }} className={`px-2 py-1 border border-gray-500 rounded-l-xl ${layout == 'List' ? 'bg-gray-300' : 'bg-white'}`}>
                                <List size={15} className="text-gray-500" />
                            </button>
                            <button onClick={() => { setLayout('Grid') }} className={`px-2 border py-1 border-gray-500 rounded-r-xl ${layout == 'Grid' ? 'bg-gray-300' : 'bg-white'}`}>
                                <LayoutGrid size={15} className="text-gray-500" />
                            </button>
                        </div>
                    </div>

                    {/* <div>{JSON.stringify(dataKalender)}</div> */}
                    {layout === 'List' ? (
                        <div className="max-h-[500px] overflow-auto rounded-lg border border-gray-400 mb-5">
                            <table className="w-full min-w-[1100px] table-fixed border-collapse text-sm">
                                <thead className="sticky top-0 z-10 bg-gray-600 dark:bg-gray-100 text-amber-300 dark:text-gray-700">
                                    <tr>
                                        <th className="w-50 px-2 py-1 text-center">Nama</th>
                                        <th className="w-30 px-2 py-1 text-center">Kategori</th>
                                        <th className="w-30 px-2 py-1 text-center">Kode</th>
                                        <th className="w-30 px-2 py-1 text-center">Lokasi</th>
                                        <th className="w-15 px-2 py-1 text-center">Jumlah</th>
                                        <th className="w-15 px-2 py-1 text-center">Baik</th>
                                        <th className="w-15 px-2 py-1 text-center">Rusak ringan</th>
                                        <th className="w-15 px-2 py-1 text-center">Rusak berat</th>
                                        <th className="w-50 px-2 py-1 text-center">Keterangan</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredData.map((item, i) => (
                                        <tr
                                            key={i}
                                            className={`${i % 2 === 0
                                                ? isDark
                                                    ? "bg-gray-600"
                                                    : "bg-white"
                                                : isDark
                                                    ? "bg-gray-700"
                                                    : "bg-gray-100"}`}
                                        >
                                            <td className="break-words px-3 py-3">{item.nama}</td>

                                            <td className="px-3 py-3 text-center">
                                                <span
                                                    className={`inline-block rounded-md px-2 py-1 text-xs dark:text-gray-700 ${item.kategori === "Fisika"
                                                        ? "bg-blue-200"
                                                        : item.kategori === "Kimia"
                                                            ? "bg-orange-200"
                                                            : item.kategori === "Biologi"
                                                                ? "bg-green-200"
                                                                : item.kategori === "Bahan"
                                                                    ? "bg-rose-200"
                                                                    : "bg-yellow-200"
                                                        }`}
                                                >
                                                    {item.kategori}
                                                </span>
                                            </td>

                                            <td className="px-3 py-3 text-center">{item.kode}</td>
                                            <td className="break-words px-3 py-3 text-center">
                                                {item.lokasi}
                                            </td>
                                            <td className="px-3 py-3 text-center">{item.jumlah}</td>
                                            <td className="px-3 py-3 text-center">{item.baik}</td>
                                            <td className="px-3 py-3 text-center">
                                                {item.rusak_ringan}
                                            </td>
                                            <td className="px-3 py-3 text-center">
                                                {item.rusak_berat}
                                            </td>
                                            <td className="break-words px-3 py-3 text-center">
                                                {item.keterangan || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[500px] overflow-auto">
                            {filteredData.map((item, i) => (
                                <Link key={i} to={`/detailInventaris/${item.kode}`}>
                                    <div className="flex flex-col shadow rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-gray-500 p-1">
                                        {item.foto && (
                                            <img
                                                src={item.foto}
                                                className="w-2xs h-full rounded-t-md"
                                                alt="foto" />
                                        )}
                                        <div className="flex flex-col p-2">
                                            <span className="font-semibold text-md mb-1 text-center">{item.nama}</span>
                                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                                <span className={`rounded-md px-2 py-1 text-xs text-gray-500 ${item.kategori === "Fisika"
                                                    ? "bg-blue-200"
                                                    : item.kategori === "Kimia"
                                                        ? "bg-orange-200"
                                                        : item.kategori === "Biologi"
                                                            ? "bg-green-200"
                                                            : item.kategori === "Bahan"
                                                                ? "bg-violet-200"
                                                                : "bg-yellow-200"}`}>{item.kategori}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-300">{item.kode}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-300">jumlah: {item.jumlah}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                    <div className="flex items-center">
                        <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                        <span className="text-xl font-semibold">LKPD</span>
                    </div>
                    <div className="grid grid-cols sm:grid-cols-4 gap-5 max-h-[500px] overflow-auto">
                        {dataLKPD.map((item, i) => (
                            <a key={i} href={item.link} className="flex rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-gray-500 p-1 gap-2 shadow-md items-center">
                                <img
                                    src={item.image}
                                    className="w-20 h-full rounded-t-md"
                                    alt="lkpd" />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-500 dark:text-gray-200">{item.nama}</span>
                                    <span className="text-xs text-gray-400 dark:text-gray-300">{item.topik}</span>
                                    <div>
                                        <span className={`rounded p-1 font-semibold text-xs text-white ${item.bidang == 'Biologi' ? 'bg-emerald-400' : item.bidang == 'Kimia' ? 'bg-amber-400' : 'bg-blue-400'}`}>{item.bidang}</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                    <div className="flex items-center">
                        <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                        <span className="text-xl font-semibold">Informasi Lab IPA</span>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-5">
                        <Link to="/jadwal" className="flex flex-col items-center gap-2">
                            <img src={jadwal} className="w-10 sm:w-25 h-auto flex-1 contrast-80" alt="" />
                            <span className="text-gray-500 dark:text-gray-300 text-sm text-center flex-1">Jadwal Praktikum</span>
                        </Link>
                        <Link to="/tataTertib" className="flex flex-col items-center gap-2">
                            <img src={tataTertib} className="w-10 sm:w-25 h-auto flex-1 contrast-80" alt="" />
                            <span className="text-gray-500 dark:text-gray-300 text-sm text-center flex-1">Tata Tertib</span>
                        </Link>
                        <Link to="/sop" className="flex flex-col items-center gap-2">
                            <img src={sop} className="w-10 sm:w-25 h-auto flex-1 contrast-80" alt="" />
                            <span className="text-gray-500 dark:text-gray-300 text-sm text-center flex-1">SOP</span>
                        </Link>
                        <Link to="/strukturOrganisasi" className="flex flex-col items-center gap-2">
                            <img src={struktur} className="w-10 sm:w-25 h-auto flex-1 contrast-80" alt="" />
                            <span className="text-gray-500 dark:text-gray-300 text-sm text-center flex-1">Struktur Organisasi</span>
                        </Link>
                        <Link to="/dokumentasi" className="flex flex-col items-center gap-2">
                            <img src={picture} className="w-10 sm:w-25 h-auto flex-1 contrast-80" alt="" />
                            <span className="text-gray-500 dark:text-gray-300 text-sm text-center flex-1">Dokumentasi Praktikum</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                    <div className="flex items-center">
                        <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                        <span className="text-xl font-semibold">Lab Virtual</span>
                    </div>
                    <div className="grid grid-cols sm:grid-cols-4 gap-5 max-h-[500px] overflow-auto">
                        {dataLabV.map((item, i) => (
                            <a key={i} href={item.link} className="flex rounded-md bg-white dark:bg-zinc-800 hover:bg-amber-50 dark:hover:bg-gray-500 p-1 gap-2 shadow-md items-center">
                                <img
                                    src={item.image}
                                    className="w-20 h-full rounded-t-md mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-left"
                                    alt="lkpd" />
                                <div className="flex flex-col">
                                    <span className="mb-2 text-md text-gray-500 dark:text-gray-200">{item.nama}</span>
                                    <div className="flex gap-1">
                                        {item.bidang.split(',').map((it, i) => (
                                            <div key={i} className={`rounded p-1 font-semibold text-xs text-white ${it == 'Biologi' ? 'bg-emerald-400' : it == 'Kimia' ? 'bg-amber-400' : 'bg-blue-400'}`}>
                                                {it}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                    <div className="flex items-center">
                        <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                        <span className="text-xl font-semibold">Jadwal Penggunaan Lab IPA</span>
                    </div>
                    <div className="max-h-[900px] overflow-auto">
                        <div className="w-full min-w-[700px]">
                            <FullCalendar
                                plugins={[dayGridPlugin, themePlugin]}
                                initialView="dayGridMonth"
                                headerToolbar={{
                                    left: 'prev,next',
                                    center: 'title',
                                    right: 'dayGridWeek,dayGridDay' // user can switch between the two
                                }}
                                colorScheme={isDark ? 'dark' : 'light'}
                                events={dataKalender}
                                //     [
                                //     {
                                //         title: "Uji asam basa", date: "2026-11-17", extendedProps: {
                                //             jam: "4-5",
                                //             kelas: "8F",
                                //             guru: "SW"
                                //         }
                                //     },
                                // ]
                                eventContent={(eventInfo) => {
                                    const { kelas, guru, jam } = eventInfo.event.extendedProps;

                                    return (
                                        <div className="p-1 whitespace-normal text-xs leading-relaxed">
                                            <p className="font-semibold">
                                                {eventInfo.event.title}
                                            </p>
                                            <p>
                                                Jam: {jam} ({kelas})
                                            </p>
                                            <p>
                                                Guru: {guru}
                                            </p>
                                        </div>
                                    );
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-1 rounded-tr-4xl">
                <div className="flex flex-col bg-gray-100 dark:bg-gray-700 p-4 rounded-tr-4xl gap-3 border-dashed border-2 border-gray-300 dark:border-gray-500">
                    <div className="flex items-center">
                        <Astroid size={20} className="dark:text-amber-200 text-amber-500" />
                        <span className="text-xl font-semibold">Galeri</span>
                    </div>
                    <ImageSlider images={JSON.parse(dataHome[0].galeri)} containerClassName="w-full h-auto" />
                </div>
            </div>
        </div>
    )
}

export default HomePage