import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar, { SidebarItem } from "../components/sidebar";
import { Gauge, FolderCode, Network, TvMinimalPlay, Video, Edit, Trash } from "lucide-react";

export default function Rpl() {
  // State untuk data RPL dan form input
  const [rplData, setRplData] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    nama_komputer: "",
    ip_address: "",
    brand: "",
    lokasi: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // State untuk menghitung status PC

  // Mengambil data RPL dari backend saat komponen dimuat
  useEffect(() => {
    const fetchRplData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rpl");
        setRplData(response.data);
       
      } catch (error) {
        console.error("Error fetching RPL data", error);
      }
    };
    fetchRplData();
  }, []);

  // Hitung status PC
  

  // Handle perubahan pada input form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Handle submit form untuk menambah atau mengedit data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editId !== null) {
        await axios.put(`http://localhost:5000/api/rpl/${editId}`, formData);
        alert("Data berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:5000/api/rpl", formData);
        alert("Data berhasil ditambahkan!");
      }
      setFormData({
        nama_komputer: "",
        ip_address: "",
        brand: "",
        lokasi: "",
        status: "",
      });
      setIsEditing(false);
      setEditId(null);
      // Refresh data setelah submit
      const response = await axios.get("http://localhost:5000/api/rpl");
      setRplData(response.data);
       // Hitung ulang status setelah submit
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan atau memperbarui data");
    }
  };

  // Handle edit data
  const handleEdit = (rpl: any) => {
    setFormData(rpl);
    setIsEditing(true);
    setEditId(rpl.id);
    setIsFormVisible(true);
  };

  // Handle delete data
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/rpl/${id}`);
      alert("Data berhasil dihapus!");
      const response = await axios.get("http://localhost:5000/api/rpl");
      setRplData(response.data);
      // Hitung ulang status setelah delete
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="flex">
      <Sidebar>
        <Link to="/dashboard">
          <SidebarItem icon={<Gauge size={20} />} text="Dashboard" />
        </Link>

        <Link to="/rpl">
          <SidebarItem icon={<FolderCode size={20} />} text="RPL" active />
        </Link>

        <Link to="/tkj">
          <SidebarItem icon={<Network size={20} />} text="TKJ" />
        </Link>

        <Link to="/dkv">
          <SidebarItem icon={<TvMinimalPlay size={20} />} text="DKV" />
        </Link>

        <Link to="/pspt">
          <SidebarItem icon={<Video size={20} />} text="PSPT" />
        </Link>
      </Sidebar>

      <div className="flex-1 p-4">
        <h1 className="text-xl font-bold mb-4">RPL Content</h1>

        {/* Tombol untuk menambah data */}
        <button
          onClick={toggleFormVisibility}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md"
        >
          {isFormVisible ? "Tutup Form" : "Tambah RPL"}
        </button>

        {/* Popup Form Input */}
        {isFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-lg">
              <button
                onClick={toggleFormVisibility}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Close
              </button>
              <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium">Nama Komputer</label>
                  <input
                    type="text"
                    name="nama_komputer"
                    value={formData.nama_komputer}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Nama Komputer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">IP Address</label>
                  <input
                    type="text"
                    name="ip_address"
                    value={formData.ip_address}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="IP Address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                    placeholder="Brand"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Lokasi</label>
                  <select
                    name="lokasi"
                    value={formData.lokasi}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    <option value="">Pilih Lokasi</option>
                    <option value="Lab 1">LAB 1</option>
                    <option value="Lab 2">LAB 2</option>
                    <option value="Lab 3">LAB 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    <option value="">Pilih Status</option>
                    <option value="berfungsi">Berfungsi</option>
                    <option value="rusak">Rusak</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {isEditing ? "Perbarui RPL" : "Tambah RPL"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Tabel untuk Menampilkan Data RPL */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Nama Komputer</th>
                <th className="border px-4 py-2">IP Address</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Lokasi</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {rplData.map((rpl, index) => (
                <tr key={rpl.id} className="border-b hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{rpl.nama_komputer.toUpperCase()}</td>
                  <td className="border px-4 py-2">{rpl.ip_address.toUpperCase()}</td>
                  <td className="border px-4 py-2">{rpl.brand.toUpperCase()}</td>
                  <td className="border px-4 py-2">{rpl.lokasi.toUpperCase()}</td>
                  <td className="border px-4 py-2">{rpl.status.toUpperCase()}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleEdit(rpl)}
                      className="text-blue-500 hover:underline"
                    >
                      <Edit className="h-5 w-5 mr-1" />
                    
                    </button>
                    <button
                      onClick={() => handleDelete(rpl.id)}
                      className="text-red-500 hover:underline ml-2"
                    >
                      <Trash className="h-5 w-5 mr-1" />
                      
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
