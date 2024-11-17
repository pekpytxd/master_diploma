"use client";
import Image from "next/image";
import Link from "next/link";

export default function AnnouncementCard({ announcement }) {
    return (
        <Link href={`/announcement/${announcement.id}`}>
            <div className="card border rounded-lg shadow-lg overflow-hidden cursor-pointer">
                <Image
                    src={announcement.imagePath}
                    alt="Logo"
                    className="w-full h-72 object-cover"
                    width={125}
                    height={125}
                />
                <div className="p-4">
                    <h1 className="text-xl font-semibold">{announcement.title}</h1>
                    <span className="text-black line-clamp-1">{announcement.description}</span>
                </div>
            </div>
        </Link>
    );
}
