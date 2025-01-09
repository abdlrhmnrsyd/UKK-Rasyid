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

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();

  // Add chart data configuration
  const getChartData = (working: number, broken: number, maintenance: number) => ({
    labels: ['Berfungsi', 'Rusak', 'Maintenance'],
    datasets: [
      {
        data: [working, broken, maintenance],
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
                data={getChartData(28, 2, 1)} 
                options={{...chartOptions, onClick: handleRPLClick}} 
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center"><Monitor className="h-4 w-4 mr-2" /> Total PC</span>
                <span className="font-semibold">30 Unit</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center"><CheckCircle2 className="h-4 w-4 mr-2 text-green-500" /> Berfungsi</span>
                <span className="font-semibold text-green-500">28 Unit</span>
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
                data={getChartData(32, 3, 2)} 
                options={{...chartOptions, onClick: handleTKJClick}} 
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
                data={getChartData(23, 2, 1)} 
                options={{...chartOptions, onClick: handleDKVClick}} 
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
                data={getChartData(25, 3, 2)} 
                options={{...chartOptions, onClick: handlePSPTClick}} 
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
