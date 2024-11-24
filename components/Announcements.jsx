"use client";

import { useEffect, useState } from "react";
import AnnouncementCard from "@/components/AnnouncementCard";
import { getAllAnnouncements } from "@/services/announcements";

export default function Announcements() {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const announcementsResponse = await getAllAnnouncements();
                setAnnouncements(announcementsResponse);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleAnnouncementDeleted = (deletedId) => {
        setAnnouncements((prevAnnouncements) => {
            return prevAnnouncements.filter((announcement) => announcement.id !== deletedId);
        });
    };

    return (
        <div className="announcements-container px-12 py-6 flex flex-col min-h-screen">
            {announcements.length === 0 ? (
                <div className="flex justify-center items-center flex-grow">
                    <p className="text-lg text-gray-500 text-center">
                        Нема жодного оголошення - Для створення натисніть кнопку "Додати оголошення" зверху
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
                    {announcements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                            onAnnouncementDeleted={handleAnnouncementDeleted}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
