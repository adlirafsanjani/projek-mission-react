import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';
import Button from '../components/Button';

export default function Homepage() {
    // 1. STATE INITIALIZATION (Dengan pengecekan Local Storage)
    const [courses, setCourses] = useState(() => {
        const savedCourses = localStorage.getItem('dataKelas');
        if (savedCourses) {
            return JSON.parse(savedCourses);
        }

        return [
            {
                id: 1,
                title: "Big 4 Auditor Financial Analyst",
                description: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan kurikulum terbaik",
                instructor: "Jenna Ortega",
                role: "Senior Accountant di Gojek",
                rating: "3.5",
                reviews: "86",
                price: 300000,
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
                avatar: "https://i.pravatar.cc/150?img=47"
            },
            {
                id: 2,
                title: "UI/UX Design Masterclass",
                description: "Belajar merancang antarmuka yang intuitif dan menarik menggunakan Figma.",
                instructor: "Budi Santoso",
                role: "Lead Designer",
                rating: "4.8",
                reviews: "120",
                price: 250000,
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop",
                avatar: "https://i.pravatar.cc/150?img=12"
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('dataKelas', JSON.stringify(courses));
    }, [courses]);

    // STATE UNTUK FORM MODAL
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', image: '', avatar: '', instructor: '', role: '', price: ''
    });
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const showAlert = (message) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(''), 3000);
    };

    // --- FUNGSI BARU: Mengubah File Upload menjadi format Base64 ---
    const handleFileUpload = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Menyimpan hasil convert gambar ke state formData
                setFormData({ ...formData, [field]: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            setCourses(courses.map(course =>
                course.id === editId ? {
                    ...course,
                    title: formData.title,
                    description: formData.description || course.description,
                    instructor: formData.instructor,
                    role: formData.role || course.role,
                    price: Number(formData.price),
                    image: formData.image || course.image,
                    avatar: formData.avatar || course.avatar
                } : course
            ));
            setEditId(null);
            setIsFormOpen(false);
            showAlert('✅ Data kelas berhasil diperbarui!');
        } else {
            const newCourse = {
                id: Date.now(),
                title: formData.title,
                description: formData.description || "Deskripsi kelas tidak tersedia.",
                instructor: formData.instructor,
                role: formData.role || "Instruktur",
                price: Number(formData.price),
                rating: "0.0",
                reviews: "0",
                // Fallback default image jika tidak upload apa-apa
                image: formData.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
                avatar: formData.avatar || "https://i.pravatar.cc/150?img=1"
            };
            setCourses([newCourse, ...courses]);
            setIsFormOpen(false);
            showAlert('✅ Kelas baru berhasil ditambahkan!');
        }
        setFormData({ title: '', description: '', image: '', avatar: '', instructor: '', role: '', price: '' });
    };

    const handleEdit = (course) => {
        setFormData({
            title: course.title,
            description: course.description || '',
            instructor: course.instructor,
            role: course.role || '',
            price: course.price,
            image: course.image || '',
            avatar: course.avatar || ''
        });
        setEditId(course.id);
        setIsFormOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
            setCourses(courses.filter(course => course.id !== id));
            showAlert('🗑️ Data kelas berhasil dihapus!');
        }
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans relative">

            {/* UI Notifikasi */}
            {alertMessage && (
                <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-[#3CC953] text-white px-6 py-3 rounded-full shadow-lg z-[70] transition-all text-sm font-medium">
                    {alertMessage}
                </div>
            )}

            <Navbar />

            {/* Hero Section */}
            <div className="px-6 md:px-12 py-8">
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 text-white text-center py-20 px-4">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!</h1>
                        <p className="text-gray-300 mb-8 text-sm md:text-base">Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi.</p>
                        <Button variant="primary" className="max-w-xs mx-auto py-3">Temukan Video Course untuk Dipelajari!</Button>
                    </div>
                </div>
            </div>

            {/* Course Collection Section */}
            <div className="px-6 md:px-12 py-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Koleksi Video Pembelajaran Unggulan</h2>
                        <p className="text-gray-500 text-sm">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari judul kelas..."
                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                        />
                        <button
                            onClick={() => { setEditId(null); setFormData({ title: '', description: '', image: '', avatar: '', instructor: '', role: '', price: '' }); setIsFormOpen(true); }}
                            className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm whitespace-nowrap"
                        >
                            Tambah Kelas
                        </button>
                    </div>
                </div>

                <div className="flex gap-6 mb-8 text-sm font-medium border-b border-gray-200 overflow-x-auto pb-1">
                    <span className="text-orange-500 border-b-2 border-orange-500 pb-2 whitespace-nowrap cursor-pointer">Semua Kelas</span>
                    <span className="text-gray-500 hover:text-gray-800 pb-2 whitespace-nowrap cursor-pointer">Pemasaran</span>
                    <span className="text-gray-500 hover:text-gray-800 pb-2 whitespace-nowrap cursor-pointer">Desain</span>
                </div>

                {/* Grid of Courses */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">Data kelas tidak ditemukan.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="relative group">
                                <CourseCard {...course} price={`Rp ${course.price.toLocaleString('id-ID')}`} />
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(course)} className="bg-blue-500 text-white px-3 py-1.5 rounded-md shadow-md hover:bg-blue-600 text-xs font-medium">Edit</button>
                                    <button onClick={() => handleDelete(course.id)} className="bg-red-500 text-white px-3 py-1.5 rounded-md shadow-md hover:bg-red-600 text-xs font-medium">Hapus</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* MODAL FORM OVERLAY (Light Mode dengan File Upload) */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-gray-600/75 backdrop-blur-sm">
                    <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl my-auto max-h-[90vh] overflow-y-auto">

                        <form onSubmit={handleSubmit} className="px-6 py-8 sm:px-10 sm:py-10">

                            {/* --- SECTION 1: Profile --- */}
                            <div className="border-b border-gray-900/10 pb-8">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile Kelas</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Informasi dasar tentang kelas yang akan ditampilkan secara publik.</p>

                                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Judul Kelas</label>
                                        <div className="mt-2">
                                            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-3" placeholder="Misal: UI/UX Masterclass" />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Deskripsi Singkat (About)</label>
                                        <div className="mt-2">
                                            <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-3" placeholder="Tuliskan beberapa kalimat tentang kelas ini." />
                                        </div>
                                    </div>

                                    {/* --- INPUT UPLOAD GAMBAR KELAS --- */}
                                    <div className="col-span-full">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Cover Photo Kelas</label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 hover:bg-gray-50 transition-colors">
                                            <div className="text-center w-full">

                                                {/* Preview Gambar jika sudah di-upload/ada isinya */}
                                                {formData.image && formData.image.length > 0 ? (
                                                    <img src={formData.image} alt="Preview" className="mx-auto h-32 object-cover rounded-md mb-4 shadow-sm" />
                                                ) : (
                                                    <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                                    </svg>
                                                )}

                                                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                                    <label className="relative cursor-pointer rounded-md bg-white font-semibold text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2 hover:text-orange-500">
                                                        <span>Upload a file</span>
                                                        <input type="file" accept="image/png, image/jpeg, image/jpg" className="sr-only" onChange={(e) => handleFileUpload(e, 'image')} />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 5MB</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --- SECTION 2: Personal Information --- */}
                            <div className="pt-8 pb-4">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Detail mengenai instruktur pengajar dan harga kelas.</p>

                                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Nama Instruktur</label>
                                        <div className="mt-2">
                                            <input type="text" required value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-3" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Harga / Price (Rp)</label>
                                        <div className="mt-2">
                                            <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-3" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Jabatan / Role</label>
                                        <div className="mt-2">
                                            <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 px-3" placeholder="Misal: Senior Developer" />
                                        </div>
                                    </div>

                                    {/* --- INPUT UPLOAD FOTO AVATAR --- */}
                                    <div className="sm:col-span-4">
                                        <label className="block text-sm font-medium leading-6 text-gray-900">Foto Avatar Profil</label>
                                        <div className="mt-2 flex items-center gap-x-3">
                                            {formData.avatar && formData.avatar.length > 0 ? (
                                                <img src={formData.avatar} alt="" className="h-10 w-10 rounded-full bg-gray-100 object-cover" />
                                            ) : (
                                                <svg className="h-10 w-10 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            {/* Tombol Upload File Standar */}
                                            <input
                                                type="file"
                                                accept="image/png, image/jpeg, image/jpg"
                                                onChange={(e) => handleFileUpload(e, 'avatar')}
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:border-orange-500 py-1.5 px-3 file:mr-4 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tombol Aksi */}
                            <div className="mt-6 flex items-center justify-end gap-x-4 border-t border-gray-900/10 pt-6">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700">
                                    Cancel
                                </button>
                                <button type="submit" className="rounded-md bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">
                                    {editId ? 'Save Changes' : 'Save'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}