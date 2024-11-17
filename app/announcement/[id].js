import {getAnnouncement} from "@/services/announcements";

export default async function AnnouncementPage({params}) {
    const {id} = params;
    const announcement = await getAnnouncement(id);
    console.log("Fetched announcement:", announcement);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{announcement.title}</h1>
            <img src={announcement.imagePath} alt={announcement.title} className="w-full h-72 object-cover"/>
            <p className="mt-4">{announcement.description}</p>
        </div>
    );
}
