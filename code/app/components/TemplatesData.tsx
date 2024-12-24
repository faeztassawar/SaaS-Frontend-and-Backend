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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Template = {
  name: string;
  customerCount: number;
};

const TemplatesData = () => {
  const [templates, setTemplates] = useState<Template[]>([]);

  
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch("/api/template");
        const data = await response.json();
        console.log("CHARTTTTTT")
        if (response.ok) {
          setTemplates(data);
        } else {
          console.error("Error fetching templates:", data.message);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };

    fetchTemplates();
  }, []);

  const chartData = {
    labels: templates.map((template) => template.name),
    datasets: [
      {
        label: "Number Of Users",
        data: templates.map((template) => template.customerCount),
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
        <div className="flex flex-col w-full overflow-hidden">
          <div className="flex justify-between bg-[#2f2f2f] text-lg font-semibold py-3 px-4 rounded-t-lg">
            <div className="basis-1/2">Template Name</div>
            <div className="basis-1/2">Number Of Users</div>
          </div>

          {templates.map((template, index) => (
            <div
              key={index}
              className="flex justify-between bg-[#1f1f1f] py-4 px-4 transition-colors hover:bg-[#3f3f3f]"
            >
              <div className="basis-1/2 font-semibold">{template.name}</div>
              <div className="basis-1/2 font-semibold">{template.customerCount}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-[#2f2f2f] rounded-lg h-80 w-full">
          <h2 className="text-2xl font-semibold mb-4">Template Popularity</h2>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TemplatesData;
