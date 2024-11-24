import {getAnnouncement} from "@/services/announcements";

export default async function AnnouncementPage({ params }) {
    const { id } = params;
    const announcement = await getAnnouncement(id);

    return (
        <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-300">
            <div className="relative">
                <img
                    src={announcement.imagePath}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                />
            </div>
            <h1 className="text-4xl font-bold mt-4 text-center">{announcement.title}</h1>
            <p className="mt-4 text-left w-full">{announcement.description}</p>
        </div>
    );
}
