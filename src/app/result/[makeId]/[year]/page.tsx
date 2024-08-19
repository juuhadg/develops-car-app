import CarInformation from "@/components/carInformation";
import { Suspense } from "react";

export async function generateStaticParams() {
  const response = await fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
  const result = await response.json();
  const currentYear = new Date().getFullYear();
  const yearArray = Array.from(
    { length: currentYear - 2015 + 1 },
    (_, index) => currentYear - index
  );
  const paths = []

  for (const item of result.Results) {
    for (const year of yearArray) {
      paths.push({
        params: {
          makeId: item.MakeId,
          year: year
        }})
    }
  }



    return paths
   
}

export default async function Result({ params }: any) {
  const { makeId, year } = params
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-pageBg">
      <div className="bg-white shadow-searchBox p-10 rounded-md text-black w-full">
        <Suspense fallback={<div>Loading...</div>}>
    <CarInformation id={makeId} year={year}/>
        </Suspense>
      </div>
    </main>
  );
}
