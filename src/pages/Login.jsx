import React from 'react';
import TextField from '../components/TextField';
import PasswordField from '../components/PasswordField';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans flex flex-col">
            <header className="w-full bg-white py-4 px-6 md:px-12 border-b border-gray-200">
                <img src={logo} alt="videobelajar" className="h-7 cursor-pointer" onClick={() => navigate('/home')} />
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Masuk ke Akun</h1>
                        <p className="text-sm text-gray-500">Yuk, lanjutin belajarmu di videobelajar.</p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()}>
                        <TextField label="E-Mail" type="email" required />
                        <PasswordField label="Kata Sandi" required />

                        <div className="flex justify-end mb-6 -mt-1">
                            <a href="#" className="text-xs font-medium text-gray-500 hover:text-gray-700">Lupa Password?</a>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                type="button"
                                variant="primary"
                                onClick={() => navigate('/home')}
                            >
                                Masuk
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => navigate('/register')}
                            >
                                Daftar
                            </Button>
                        </div>

                        <div className="flex items-center my-6">
                            <div className="flex-1 border-t border-gray-200"></div>
                            <span className="px-4 text-xs text-gray-400 bg-white">atau</span>
                            <div className="flex-1 border-t border-gray-200"></div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => alert('Fitur Login via Google SSO sedang disiapkan!')}
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Masuk dengan Google
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}