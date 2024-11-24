"use client"
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import logo from '@/assets/images/rob-logo.png';
import Image from 'next/image';
import Button from './Button';

const Header = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();  // Можна використовувати searchParams, якщо потрібно отримати query

    const isAnnouncementPage = pathname.startsWith('/announcement') && !searchParams.get('id');

    return (
        <div className="w-full h-20 bg-gray-200 flex items-center justify-between px-8">
            <Link href={'/'}>
                <div className='flex justify-center'>
                    <Image src={logo} alt="Robotics Logo" className='w-auto h-auto'/>
                </div>
            </Link>
            {/* Якщо не на сторінці /announcement/[id] або /announcement/add, то кнопка відображається */}
            {!isAnnouncementPage && (
                <Link href="/announcement/add" className="hover:cursor-pointer">
                    <Button text="Додати оголошення"/>
                </Link>
            )}
        </div>
    );
}

export default Header;
