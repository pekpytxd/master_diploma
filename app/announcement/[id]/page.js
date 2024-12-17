"use client";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {getAllAnnouncements} from "@/services/announcements";

export default function AnnouncementPage({params}) {
    const {id} = params; // Отримуємо id поточного оголошення
    const [announcement, setAnnouncement] = useState(null); // Поточне оголошення
    const [announcements, setAnnouncements] = useState([]); // Список всіх оголошень
    const [nextAnnouncement, setNextAnnouncement] = useState(null); // Наступне оголошення
    const pathname = usePathname(); // Використовуємо usePathname для відстеження поточного шляху

    // Отримуємо всі оголошення та поточне оголошення
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const announcementsResponse = await getAllAnnouncements();
                setAnnouncements(announcementsResponse);
                const currentAnnouncement = announcementsResponse.find((ann) => ann.id === id);
                setAnnouncement(currentAnnouncement);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        fetchAnnouncements();
    }, [id]);

    // Після завантаження списку оголошень знаходимо наступне оголошення
    useEffect(() => {
        if (announcements.length > 0 && announcement) {
            const currentIndex = announcements.findIndex((ann) => ann.id === announcement.id);
            const nextIndex = (currentIndex + 1) % announcements.length;
            setNextAnnouncement(announcements[nextIndex]);
        }
    }, [announcement, announcements]);

    useEffect(() => {
        if (pathname.includes("/announcement/")) {
            // Smooth scrolling function
            const smoothScroll = () => {
                const totalHeight = document.documentElement.scrollHeight;
                const currentScroll = window.scrollY;
                const remainingScroll = totalHeight - window.innerHeight - currentScroll;

                if (remainingScroll > 1) {
                    // Scroll by a small amount
                    window.scrollBy(0, 1); // Adjust the value (e.g., 2 pixels) for a smoother effect
                    requestAnimationFrame(smoothScroll);
                } else {
                    // If at the bottom, wait 5 seconds and then navigate to the next announcement
                    if (nextAnnouncement) {
                        setTimeout(() => {
                            window.location.href = `/announcement/${nextAnnouncement.id}`;
                        }, 5000); // 5-second delay
                    }
                }
            };

            // Start scrolling
            const scrollInterval = setTimeout(() => {
                requestAnimationFrame(smoothScroll);
            }, 1000); // Optional: Delay 1 second before starting scrolling

            // Cleanup in case the component unmounts
            return () => clearTimeout(scrollInterval);
        }
    }, [nextAnnouncement, pathname]);


    // Якщо оголошення ще не завантажено
    if (!announcement) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Завантаження оголошення...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-300">
            <div className="relative">
                <img
                    src={announcement.imagePath}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    alt={announcement.title}
                />
            </div>
            <h1 className="text-4xl font-bold mt-4 text-center">{announcement.title}</h1>
            <p className="mt-4 text-left w-full overflow-hidden text-ellipsis whitespace-normal break-words">
                {announcement.description.split('\n').map((line, index) => (
                    <span key={index}>
            {line}
                        <br/>
        </span>
                ))}
            </p>

        </div>
    );
}
