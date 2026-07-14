import React from 'react';

export default function CourseCard({ title, description, instructor, role, rating, reviews, price, image, avatar }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <img src={image} alt={title} className="w-full h-48 object-cover" />

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight">{title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>

                <div className="flex items-center gap-3 mb-5">
                    <img src={avatar} alt={instructor} className="w-9 h-9 rounded-lg object-cover bg-gray-100" />
                    <div>
                        <p className="text-sm font-bold text-gray-800 leading-none">{instructor}</p>
                        <p className="text-xs text-gray-500 mt-1">{role}</p>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">★★★★☆</span>
                        <span className="text-xs text-gray-500 underline font-medium">{rating} ({reviews})</span>
                    </div>
                    <span className="font-bold text-[#3CC953] text-lg">{price}</span>
                </div>
            </div>
        </div>
    );
}