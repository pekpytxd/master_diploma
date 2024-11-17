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

    return (
        <div className="announcements grid grid-cols-1 md:grid-cols-2 gap-8 px-12 py-6">
            {announcements.map((announcement, index) => (
                <AnnouncementCard key={index} announcement={announcement} />
            ))}
        </div>
    );
}
