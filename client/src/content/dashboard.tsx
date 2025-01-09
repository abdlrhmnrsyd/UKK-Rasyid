import Sidebar, { SidebarItem } from "../components/sidebar";
import { 
  Gauge, 
  FolderCode, 
  Network, 
  TvMinimalPlay, 
  Video,
  Monitor,
  AlertCircle,
  CheckCircle2,
  WrenchIcon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useEffect, useState } from "react";
import axios from "axios";

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [rplStatusCount, setRplStatusCount] = useState({ working: 0, broken: 0, maintenance: 0 });
  const [tkjStatusCount, setTkjStatusCount] = useState({ working: 0, broken: 0, maintenance: 0 });
  const [dkvStatusCount, setDkvStatusCount] = useState({ working: 0, broken: 0, maintenance: 0 });
  const [psptStatusCount, setPsptStatusCount] = useState({ working: 0, broken: 0, maintenance: 0 });
  const [totalPC, setTotalPC] = useState(0);

  // Fetch RPL status data
  useEffect(() => {
    const fetchRplStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rpl");
        if (response.data.length === 0) {
          console.error("Data RPL kosong");
          return; // Menghentikan eksekusi jika data kosong
        }
        calculateRplStatus(response.data);
        setTotalPC(response.data.length);
      } catch (error) {
        console.error("Error fetching RPL data", error);
      }
    };
    fetchRplStatus();
  }, []);

  // Fetch TKJ status data
  useEffect(() => {
    const fetchTkjStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tkj");
        if (response.data.length === 0) {
          console.error("Data TKJ kosong");
          return; // Menghentikan eksekusi jika data kosong
        }
        calculateTkjStatus(response.data);
      } catch (error) {
        console.error("Error fetching TKJ data", error);
      }
    };
    fetchTkjStatus();
  }, []);

  // Fetch DKV status data
  useEffect(() => {
    const fetchDkvStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dkv");
        if (response.data.length === 0) {
          console.error("Data DKV kosong");
          return; // Menghentikan eksekusi jika data kosong
        }
        calculateDkvStatus(response.data);
      } catch (error) {
        console.error("Error fetching DKV data", error);
      }
    };
    fetchDkvStatus();
  }, []);

  // Fetch PSPT status data
  useEffect(() => {
    const fetchPsptStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/pspt");
        if (response.data.length === 0) {
          console.error("Data PSPT kosong");
          return; // Menghentikan eksekusi jika data kosong
        }
        calculatePsptStatus(response.data);
      } catch (error) {
        console.error("Error fetching PSPT data", error);
      }
    };
    fetchPsptStatus();
  }, []);

  // Calculate status for RPL
  const calculateRplStatus = (data: any[]) => {
    const working = data.filter(comp => comp.status === "berfungsi").length;
    const broken = data.filter(comp => comp.status === "rusak").length;
    const maintenance = data.filter(comp => comp.status === "maintenance").length;
    setRplStatusCount({ working, broken, maintenance });
  };

  // Calculate status for TKJ
  const calculateTkjStatus = (data: any[]) => {
    const working = data.filter(comp => comp.status === "berfungsi").length;
    const broken = data.filter(comp => comp.status === "rusak").length;
    const maintenance = data.filter(comp => comp.status === "maintenance").length;
    setTkjStatusCount({ working, broken, maintenance });
  };

  // Calculate status for DKV
  const calculateDkvStatus = (data: any[]) => {
    const working = data.filter(comp => comp.status === "berfungsi").length;
    const broken = data.filter(comp => comp.status === "rusak").length;
    const maintenance = data.filter(comp => comp.status === "maintenance").length;
    setDkvStatusCount({ working, broken, maintenance });
  };

  // Calculate status for PSPT
  const calculatePsptStatus = (data: any[]) => {
    const working = data.filter(comp => comp.status === "berfungsi").length;
    const broken = data.filter(comp => comp.status === "rusak").length;
    const maintenance = data.filter(comp => comp.status === "maintenance").length;
    setPsptStatusCount({ working, broken, maintenance });
  };

  // Update chart data configuration for RPL
  const getRplChartData = () => ({
    labels: ['Berfungsi', 'Rusak', 'Maintenance'],
    datasets: [
      {
        data: [rplStatusCount.working, rplStatusCount.broken, rplStatusCount.maintenance],
        backgroundColor: [
          'rgb(34, 197, 94)', // green
          'rgb(239, 68, 68)', // red
          'rgb(234, 179, 8)',  // yellow
        ],
        borderWidth: 1,
      },
    ],
  });

  // Similar functions for TKJ, DKV, and PSPT charts
  const getTkjChartData = () => ({
    labels: ['Berfungsi', 'Rusak', 'Maintenance'],
    datasets: [
      {
        data: [tkjStatusCount.working, tkjStatusCount.broken, tkjStatusCount.maintenance],
        backgroundColor: [
          'rgb(34, 197, 94)', // green
          'rgb(239, 68, 68)', // red
          'rgb(234, 179, 8)',  // yellow
        ],
        borderWidth: 1,
      },
    ],
  });

  const getDkvChartData = () => ({
    labels: ['Berfungsi', 'Rusak', 'Maintenance'],
    datasets: [
      {
        data: [dkvStatusCount.working, dkvStatusCount.broken, dkvStatusCount.maintenance],
        backgroundColor: [
          'rgb(34, 197, 94)', // green
          'rgb(239, 68, 68)', // red
          'rgb(234, 179, 8)',  // yellow
        ],
        borderWidth: 1,
      },
    ],
  });

  const getPsptChartData = () => ({
    labels: ['Berfungsi', 'Rusak', 'Maintenance'],
    datasets: [
      {
        data: [psptStatusCount.working, psptStatusCount.broken, psptStatusCount.maintenance],
        backgroundColor: [
          'rgb(34, 197, 94)', // green
          'rgb(239, 68, 68)', // red
          'rgb(234, 179, 8)',  // yellow
        ],
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
    maintainAspectRatio: false,
    onClick: () => {}, // This is needed to enable click events
  };

  // Add click handlers for each department
  const handleRPLClick = () => navigate('/rpl');
  const handleTKJClick = () => navigate('/tkj');
  const handleDKVClick = () => navigate('/dkv');
  const handlePSPTClick = () => navigate('/pspt');

  return (
    <div className="flex">
      <Sidebar>
        <Link to="/dashboard">
          <SidebarItem icon={<Gauge size={20} />} text="Dashboard" active />
        </Link>

        <Link to="/rpl">
          <SidebarItem icon={<FolderCode size={20} />} text="RPL" />
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

      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-8">Dashboard Persediaan PC</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* RPL Card */}
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={handleRPLClick}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <FolderCode className="h-8 w-8 text-blue-500 mr-3" />
                <h2 className="text-xl font-semibold">RPL</h2>
              </div>
              <span className="text-sm text-gray-500">Laboratorium 1</span>
            </div>
            <div className="h-48 mb-4">
              <Doughnut 
                data={getRplChartData()}
                options={chartOptions} 
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center"><Monitor className="h-4 w-4 mr-2" /> Total PC</span>
                <span className="font-semibold">{totalPC} Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Berfungsi</span>
                <span className="font-semibold text-green-500">{rplStatusCount.working} Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><AlertCircle className="h-4 w-4 mr-2 text-red-500" /> Rusak</span>
                <span className="font-semibold text-red-500">{rplStatusCount.broken} Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><WrenchIcon className="h-4 w-4 mr-2 text-yellow-500" /> Maintenance</span>
                <span className="font-semibold text-yellow-500">{rplStatusCount.maintenance} Unit</span>
              </div>
            </div>
          </div>

          {/* TKJ Card */}
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={handleTKJClick}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Network className="h-8 w-8 text-green-500 mr-3" />
                <h2 className="text-xl font-semibold">TKJ</h2>
              </div>
              <span className="text-sm text-gray-500">Laboratorium 2</span>
            </div>
            <div className="h-48 mb-4">
              <Doughnut 
                data={getTkjChartData()}
                options={chartOptions} 
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center"><Monitor className="h-4 w-4 mr-2" /> Total PC</span>
                <span className="font-semibold">35 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Berfungsi</span>
                <span className="font-semibold text-green-500">32 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><AlertCircle className="h-4 w-4 mr-2 text-red-500" /> Rusak</span>
                <span className="font-semibold text-red-500">3 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><WrenchIcon className="h-4 w-4 mr-2 text-yellow-500" /> Maintenance</span>
                <span className="font-semibold text-yellow-500">2 Unit</span>
              </div>
            </div>
          </div>

          {/* DKV Card */}
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={handleDKVClick}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <TvMinimalPlay className="h-8 w-8 text-purple-500 mr-3" />
                <h2 className="text-xl font-semibold">DKV</h2>
              </div>
              <span className="text-sm text-gray-500">Laboratorium 3</span>
            </div>
            <div className="h-48 mb-4">
              <Doughnut 
                data={getDkvChartData()}
                options={chartOptions} 
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center"><Monitor className="h-4 w-4 mr-2" /> Total PC</span>
                <span className="font-semibold">25 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Berfungsi</span>
                <span className="font-semibold text-green-500">23 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><AlertCircle className="h-4 w-4 mr-2 text-red-500" /> Rusak</span>
                <span className="font-semibold text-red-500">2 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><WrenchIcon className="h-4 w-4 mr-2 text-yellow-500" /> Maintenance</span>
                <span className="font-semibold text-yellow-500">1 Unit</span>
              </div>
            </div>
          </div>

          {/* PSPT Card */}
          <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer" onClick={handlePSPTClick}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Video className="h-8 w-8 text-orange-500 mr-3" />
                <h2 className="text-xl font-semibold">PSPT</h2>
              </div>
              <span className="text-sm text-gray-500">Laboratorium 4</span>
            </div>
            <div className="h-48 mb-4">
              <Doughnut 
                data={getPsptChartData()}
                options={chartOptions} 
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center"><Monitor className="h-4 w-4 mr-2" /> Total PC</span>
                <span className="font-semibold">28 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Berfungsi</span>
                <span className="font-semibold text-green-500">25 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><AlertCircle className="h-4 w-4 mr-2 text-red-500" /> Rusak</span>
                <span className="font-semibold text-red-500">3 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><WrenchIcon className="h-4 w-4 mr-2 text-yellow-500" /> Maintenance</span>
                <span className="font-semibold text-yellow-500">2 Unit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
