"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAnnouncement } from "@/services/announcements";
import axios from 'axios';

export default function ImageUploadForm() {
    const [imagePath, setImagePath] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const router = useRouter();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            await uploadToImgur(file);
        }
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        setIsDragOver(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            await uploadToImgur(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleRemoveImage = () => {
        setImagePath('');
    };

    const uploadToImgur = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('https://api.imgur.com/3/image', formData, {
                headers: {
                    Authorization: 'Client-ID af0ec566dd93d34',
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setImagePath(response.data.data.link); // Store the Imgur URL
            } else {
                console.error('Error uploading to Imgur:', response.data);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            title,
            description,
            imagePath // Pass the Imgur URL in the form data
        };

        await createAnnouncement(data);
        await router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit}
                  className="flex flex-col items-center bg-white p-8 rounded shadow-lg w-4/5 max-w-3xl">
                <div className="mb-4 w-full">
                    <label className="block mb-2 text-lg font-semibold">Заголовок</label>
                    <input
                        type="text"
                        className="border-2 border-gray-300 rounded-lg p-3 w-full text-lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-2 text-lg font-semibold">Опис</label>
                    <textarea
                        className="border-2 border-gray-300 rounded-lg p-3 w-full text-lg resize-none h-64"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div
                    className={`border-2 border-dashed rounded-lg p-6 w-full max-w-xs mx-auto flex justify-center items-center ${
                        isDragOver ? 'bg-gray-300' : 'bg-gray-100'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {imagePath ? (
                        <div className="relative w-full h-full">
                            <img
                                src={imagePath}
                                alt="Uploaded"
                                className="object-cover w-full h-full rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Видалити
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg font-semibold">Перетягніть фото сюди</p>
                            <p>або</p>
                            <label className="text-blue-500 cursor-pointer text-lg">
                                Виберіть файл
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold w-full max-w-xs"
                >
                    Створити
                </button>
            </form>
        </div>
    );
}
