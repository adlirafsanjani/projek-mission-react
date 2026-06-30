import React from 'react';

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center py-4 px-6 md:px-12 bg-white">
            <div className="text-2xl font-bold">
                <span className="text-orange-500">video</span><span className="text-orange-400">belajar</span>
            </div>
            <div className="flex items-center gap-6">
                <a href="#" className="text-gray-600 font-medium hidden md:block">Kategori</a>
                <div className="w-10 h-10 rounded-xl bg-gray-200 overflow-hidden cursor-pointer">
                    {/* Menggunakan gambar dummy untuk profil */}
                    <img src="https://i.pravatar.cc/150?img=32" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>
        </nav>
    );
}