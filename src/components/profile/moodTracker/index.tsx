import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "@/lib/projectApi";
import { AppContext } from "@/providers/AppContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const MoodTracker = () => {
  const { currentUser } = useContext(AppContext);
  const [moodTracker, setMoodTracker] = useState<any>(null);

  useEffect(() => {
    const fetchMoodTrackerData = async () => {
      try {
        const moodResponse = await axios.get(
          `${API_BASE}/diary/${currentUser?.account_id}/moodtracker`
        );
        const moodTrackerData = moodResponse.data.data;
        setMoodTracker(moodTrackerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (currentUser?.account_id) {
      fetchMoodTrackerData();
    }
  }, [currentUser]);

  if (!moodTracker) return null;

  const totalMoods = moodTracker.happy + moodTracker.unhappy;

  const data = {
    labels: ["Happy", "Unhappy"],
    datasets: [
      {
        data: [
          ((moodTracker.happy / totalMoods) * 100).toFixed(2),
          ((moodTracker.unhappy / totalMoods) * 100).toFixed(2),
        ],
        backgroundColor: ["#C1D8C3", "#F9DBBA"],
        hoverBackgroundColor: ["#5FA09D", "#FF6384"],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}%`,
        },
      },
      legend: {
        display: true,
        position: "right" as const,
        labels: {
          color: 'white',
          font: {
            size: 16, 
          },
        },
      },
      datalabels: {
        display: true,
        color: 'black',
        formatter: (value: number) => `${value}%`,
        font: {
          weight: 'bold' as const,  
          size: 16,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="bg-teal-900 p-3 rounded-md  flex flex-col w-full justify-center items-center">
      <h2 className="text-center text-white font-bold text-2xl lg:text-4xl">Mood Tracker</h2>
      <div className="flex justify-center items-center md:w-[400px] md:h-[400px] py-4" >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default MoodTracker;
