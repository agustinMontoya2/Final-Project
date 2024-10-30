"use client";
import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const links = [
        { href: "/admin", label: "Admin" },
        { href: "/admin/users", label: "Users" },
        { href: "/admin/reviews", label: "Reviews" },
        { href: "/admin/orders", label: "Orders" },
        { href: "/admin/reserves", label: "Reserves" },
        { href: "/admin/dishes", label: "Dishes" },
        { href: "/admin/profileAdmin", label: "Profile" },
        { href: "/admin/createDish", label: "Create Dish" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-200 p-8 my-24">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <nav className="flex flex-wrap justify-center md:justify-between items-center p-6 bg-red-900 text-white shadow-md">
                    {links.map((link) => (
                        <Link
                            href={link.href}
                            key={link.href}
                            className="px-4 py-2 text-md font-medium hover:bg-red-700 transition-colors duration-300 rounded-md"
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
