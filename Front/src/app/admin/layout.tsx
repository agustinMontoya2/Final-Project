"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname(); // Obtener la ruta actual
    const links = [
        { href: "/admin", label: "Stadistics" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/reviews", label: "Reviews" },
        { href: "/admin/orders", label: "Orders" },
        { href: "/admin/reserves", label: "Reserves" },
        { href: "/admin/dishes", label: "Dishes" },
        { href: "/admin/profileAdmin", label: "Profile" },
        { href: "/admin/createDish", label: "Create Dish" },
    ];

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <nav className="flex flex-wrap justify-around items-center bg-red-900 text-white shadow-md">
                    {links.map((link) => (
                        <Link
                            href={link.href}
                            key={link.href}
                            className={`px-4 py-2 text-md h-20 w-[12.5%] flex justify-center items-center transition-colors duration-300 rounded-md ${pathname === link.href ? "bg-red-700" : ""
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <main className="p-8 bg-white text-gray-800 rounded-b-lg shadow-md">
                    {children}
                </main>
            </div>
        </div>
    );
}
