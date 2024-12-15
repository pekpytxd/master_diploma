"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import logo from '@/assets/images/rob-logo.png';
import Image from 'next/image';
import Button from './Button';

const Header = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();  // Можна використовувати searchParams, якщо потрібно отримати query

    const isAnnouncementPage = pathname.startsWith('/announcement') && !searchParams.get('id');

    return (
        <div className="w-full h-20 bg-gray-200 flex items-center justify-between px-8">
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

            {/* Якщо не на сторінці /announcement/[id] або /announcement/add, то кнопка відображається */}
            {!isAnnouncementPage && (
                <a href="/announcement/add" className="hover:cursor-pointer">
                    <Button text="Додати оголошення"/>
                </a>
            )}
        </div>
    );
}

export default Header;
