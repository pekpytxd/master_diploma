import React from 'react';
import Image from "next/image";
import logo from '@/assets/images/rob-logo.png';
import Link from "next/link";
import Button from "@/components/Button";

const Header = () => {

    return (
        <div className='w-full h-20 bg-gray-200 flex items-center justify-between px-8'>
            <Link href={'/'}>
                <div className='flex justify-center'>
                    <Image src={logo} alt="Robotics Logo" className='w-auto h-auto'/>
                </div>
            </Link>
            <Link href="/announcement/add" className="hover:cursor-pointer">
                <Button text="Додати оголошення"/>
            </Link>
        </div>
    )
}

export default Header;
