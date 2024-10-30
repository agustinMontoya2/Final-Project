"use client"
import Link from "next/link";


export default function dashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex flex-row justify-center">

            <div className="text-black">
                <Link href="/admin">
                    Admin
                </Link>
            </div>
            <div className="text-black">
                <Link href="/admin/users">
                    users
                </Link>
            </div>
            <div className="text-black">
                <Link href="/admin/reviews">
                    reviews
                </Link>
            </div>
            <div className="text-black">
                <Link href="/admin/orders">
                    orders
                </Link>
            </div>
            <div className="text-black">
                <Link href="/admin/dishes">
                    dishes
                </Link>
            </div>
            <div className="text-black">
                <Link href="/admin/profileAdmin">
                    Profile
                </Link>
            </div>
            <div className="text-black">
                <Link href="/admin/createDish">
                    Create Dish
                </Link>
            </div>
            <div>
                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}