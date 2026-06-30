import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import Button from '../components/Button';

export default function Homepage() {

    const courses = Array(9).fill({
        title: "Big 4 Auditor Financial Analyst",
        description: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik",
        instructor: "Jenna Ortega",
        role: "Senior Accountant di Gojek",
        rating: "3.5",
        reviews: "86",
        price: "Rp 300K",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
        avatar: "https://i.pravatar.cc/150?img=47"
    });

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans">
            <Navbar />

            {/* Hero Section */}
            <div className="px-6 md:px-12 py-8">
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white text-center py-20 px-4">
                    {/* Background overlay dummy */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!</h1>
                        <p className="text-gray-300 mb-8 text-sm md:text-base">Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.</p>
                        <Button variant="primary" className="max-w-xs mx-auto py-3">Temukan Video Course untuk Dipelajari!</Button>
                    </div>
                </div>
            </div>

            {/* Course Collection Section */}
            <div className="px-6 md:px-12 py-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Koleksi Video Pembelajaran Unggulan</h2>
                <p className="text-gray-500 text-sm mb-6">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>

                {/* Tabs */}
                <div className="flex gap-6 mb-8 text-sm font-medium border-b border-gray-200 overflow-x-auto pb-1">
                    <span className="text-orange-500 border-b-2 border-orange-500 pb-2 whitespace-nowrap cursor-pointer">Semua Kelas</span>
                    <span className="text-gray-500 hover:text-gray-800 pb-2 whitespace-nowrap cursor-pointer">Pemasaran</span>
                    <span className="text-gray-500 hover:text-gray-800 pb-2 whitespace-nowrap cursor-pointer">Desain</span>
                    <span className="text-gray-500 hover:text-gray-800 pb-2 whitespace-nowrap cursor-pointer">Pengembangan Diri</span>
                    <span className="text-gray-500 hover:text-gray-800 pb-2 whitespace-nowrap cursor-pointer">Bisnis</span>
                </div>

                {/* Grid of Courses */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course, index) => (
                        <CourseCard key={index} {...course} />
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="px-6 md:px-12 py-12">
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white text-center py-16 px-4">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
                        <p className="text-sm font-semibold tracking-widest text-gray-300 mb-2">NEWSLETTER</p>
                        <h2 className="text-3xl font-bold mb-3">Mau Belajar Lebih Banyak?</h2>
                        <p className="text-gray-300 mb-8 text-sm">Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id</p>

                        <div className="flex w-full max-w-md bg-white rounded-lg p-1">
                            <input type="email" placeholder="Masukkan Emailmu" className="flex-1 px-4 text-gray-800 focus:outline-none text-sm" />
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-md transition-colors text-sm">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}