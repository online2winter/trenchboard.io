import { NavLink } from 'react-router-dom';
import { 
    HomeIcon,
    ChartBarIcon, 
    WalletIcon 
} from '@heroicons/react/24/outline';

const Navbar = () => {
const navItems = [
    {
        title: 'Home',
        path: '/',
        icon: HomeIcon,
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: ChartBarIcon,
    },
    {
        title: 'Wallet',
        path: '/wallet-tracker',
        icon: WalletIcon,
    },
];

return (
    <nav className="h-[95%] w-[60px] md:w-[190px] bg-white/10 dark:bg-zinc-900/50 backdrop-blur-lg flex flex-col py-4 transition-all duration-300 ease-in-out rounded-2xl my-4 mx-3 shadow-lg">
        <div className="mb-6 px-3">
            <div className="h-9 w-9 md:h-10 md:w-10 bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 transition-all duration-300 rounded-xl flex items-center justify-center shadow-lg hover:shadow-emerald-500/25 hover:scale-105 cursor-pointer">
                <span className="text-white font-bold text-xl">C</span>
            </div>
        </div>
    
    <div className="flex flex-col space-y-1.5 px-2">
        {navItems.map((item) => (
        <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
            `group flex items-center px-3 h-10 rounded-lg transition-all duration-300 ease-out relative hover:scale-[1.03]
            ${isActive 
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-500 dark:text-emerald-400 font-medium before:absolute before:left-0 before:w-1 before:h-6 before:bg-gradient-to-b before:from-emerald-400 before:to-teal-500 before:rounded-r before:top-1/2 before:-translate-y-1/2' 
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-white/10 dark:hover:bg-zinc-800/30 hover:text-emerald-500 dark:hover:text-emerald-400'
            }`
            }
        >
            <item.icon className="h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110" title={item.title} />
            <span className="hidden md:block ml-3 text-sm">
            {item.title}
            </span>
        </NavLink>
        ))}
    </div>
    </nav>
);
};

export default Navbar;

