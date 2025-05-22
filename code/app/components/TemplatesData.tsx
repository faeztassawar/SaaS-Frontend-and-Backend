import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Restaurant } from "@prisma/client";
const TsCount = [0,0]

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const TemplatesData = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("/api/restaurants");
        const data = await response.json();
        console.log("RESTS HERE")
        if (response.ok) {
          setRestaurants(data);
          restaurants.forEach((item)=>{
            if(item.tempModel == "1"){
              TsCount[0] = TsCount[0] + 1
            }else{
              TsCount[1] = TsCount[1] + 1
            }
          })
        } else {
          console.error("Error fetching templates:", data.message);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const chartData = {
    labels: restaurants.map((template) => template.name),
    datasets: [
      {
        label: "Number Of Users",
        data: TsCount.map((template) => template),
        backgroundColor: ["#face8d", "#800000"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Template Popularity",
      },
    },
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-3 w-full">
        <h1 className="text-4xl font-bold">Templates</h1>
         

        <div className="mt-8 p-6 bg-[#2f2f2f] rounded-lg h-80 w-full">
          <h2 className="text-2xl font-semibold mb-4">Template Popularity</h2>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TemplatesData;
