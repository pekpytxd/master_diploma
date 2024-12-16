"use client";

import logo from "@/assets/images/rob-logo.png";
import Image from "next/image";
import Button from "./Button";

const Header = () => {
    return (
        <header className="w-full h-20 bg-gray-200 flex items-center justify-between px-8">
            <a href="/" aria-label="Go to home page">
                <div className="flex items-center justify-center">
                    <Image
                        src={logo}
                        alt="Robotics Logo"
                        width={120}
                        height={40}
                        className="object-contain"
                        priority
                    />
                </div>
            </a>
            <a href="/announcement/add" className="hover:cursor-pointer">
                <Button text="Додати оголошення"/>
            </a>
        </header>
    );
};

export default Header;
