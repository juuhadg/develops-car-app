"use client";
import { useEffect, useState } from "react";

interface VehicleData {
  Make_ID: string;
  Make_Name: string;
  Model_Name: string;
  Model_ID: string;
}

interface CarInformationProps {
  id: string;
  year: string;
}

export default function CarInformation({ id, year }: CarInformationProps) {
  const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${id}/modelyear/${year}?format=json`);
        if (!response.ok) {
          throw new Error('Failed to fetch vehicle data');
        }
        const data = await response.json();
        setVehicleData(data.Results);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchVehicleData();
  }, [id, year]);


  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <h1 className="text-center font-extrabold text-5xl mb-5">{`${vehicleData.length > 0 ? vehicleData[0].Make_Name : 'No Cars Found' } Cars From ${year}`}</h1>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        {vehicleData.length === 0 && <p>No cars found.</p>}
        {vehicleData.map((item) => (
          <div key={item.Model_ID} className="mb-4 bg-pageBg p-5 w-1/4 rounded-xl h-1/5">
            <p className="text-2xl font-bold">{`Make Id: ${item.Make_ID}`}</p>
            <p className="text-2xl font-bold">{`Make Name: ${item.Make_Name}`}</p>
            <p className="text-2xl font-bold">{`Model Id: ${item.Model_ID}`}</p>
            <p className="text-2xl font-bold">{` Name: ${item.Model_Name}`}</p>

          </div>
        ))}
      </div>
    </>
  );
}
