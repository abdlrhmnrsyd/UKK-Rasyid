import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            // Validasi dasar
            if (!name || !username || !password || !confirmPassword) {
                throw new Error('Semua field harus diisi');
            }

            if (password.length < 6) {
                throw new Error('Password harus minimal 6 karakter');
            }

            if (password !== confirmPassword) {
                throw new Error('Password tidak cocok!');
            }

            const response = await axios.post('http://localhost:5000/register', {
                name,
                username,
                password
            });

            Swal.fire({
                title: 'Berhasil!',
                text: 'Registrasi akun berhasil dilakukan',
                icon: 'success',
                confirmButtonText: 'OK'
        
            }).then(() => {
                // Reset form setelah user klik OK
                setName('');
                setUsername('');
                setPassword('');
                setConfirmPassword('');
                setError('');
            });

        } catch (err) {
            // Tambahkan alert untuk error juga
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || 'Terjadi kesalahan pada server';
                setError(errorMessage);
                Swal.fire({
                    title: 'Error!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else if (err instanceof Error) {
                setError(err.message);
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Username</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 mt-2 border rounded-md"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
