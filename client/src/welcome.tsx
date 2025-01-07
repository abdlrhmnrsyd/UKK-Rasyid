import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-white mb-4">
          Selamat Datang di Sistem Inventory
        </h1>
        <h2 className="text-3xl font-semibold text-white mb-8">
          SMKN 2 Padang Panjang
        </h2>
        
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-gray-200 text-lg">
            Sistem manajemen inventory modern untuk mengelola dan memantau 
            aset sekolah dengan lebih efisien. Dilengkapi dengan fitur 
            pencatatan, pelacakan, dan pelaporan yang komprehensif.
          </p>
        </div>

        <button
          onClick={() => navigate('/login')}
          className="bg-white text-blue-600 px-8 py-3 rounded-full 
                     font-semibold text-lg hover:bg-gray-100 
                     transform hover:scale-105 transition duration-200 
                     shadow-lg hover:shadow-xl"
        >
          Get Started
        </button>

        <div className="mt-12 text-gray-200 text-sm">
          <p>Jl. Syech Ibrahim Musa No.26, Padang Panjang</p>
          <p>Sumatera Barat, Indonesia</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
