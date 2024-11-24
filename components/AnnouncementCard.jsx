"use client";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Додаємо іконку редагування
import Image from "next/image";
import Link from "next/link";
import { deleteAnnouncement } from "@/services/announcements";

export default function AnnouncementCard({ announcement, onAnnouncementDeleted }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const deleteSelectedAnnouncement = async () => {
        try {
            await deleteAnnouncement(announcement.id);
            closeModal();
            // Викликаємо функцію для оновлення списку оголошень
            onAnnouncementDeleted(announcement.id);
        } catch (error) {
            console.error("Помилка при видаленні анонсу", error);
        }
    };

    return (
        <div className="relative group">
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

            {/* Кнопка редагувати поруч з кнопкою видалити */}
            <Link href={`/announcement/edit/${announcement.id}`}>
                <button
                    className="absolute top-2 right-12 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <FaEdit size={20} />
                </button>
            </Link>

            {/* Кнопка видалити */}
            <button
                onClick={openModal}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                <FaTrash size={20} />
            </button>

            {/* Модальне вікно для підтвердження видалення */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-80">
                        <h2 className="text-xl font-semibold mb-4">Видалити оголошення?</h2>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={deleteSelectedAnnouncement}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Видалити
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Відміна
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
