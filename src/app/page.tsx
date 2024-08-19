'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function Home() {
  const [carTypes, setCarTypes] = useState([]);
  const [years, setYears] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]: any = useState(null);

  const [selectedCarType, setSelectedCarType] = useState<{
    name: string;
    id: number;
  } | null>(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await fetch(
          'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
        );
        if (!response.ok) {
          throw new Error('Car Types Fetch Error');
        }
        const result = await response.json();

        const sortedTypes = result.Results.sort(
          (a: { MakeName: string }, b: { MakeName: string }) =>
            a.MakeName.localeCompare(b.MakeName)
        );

        setCarTypes(sortedTypes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const getDynamicYears = () => {
      const currentYear = new Date().getFullYear();
      const yearArray = Array.from(
        { length: currentYear - 2015 + 1 },
        (_, index) => currentYear - index
      );
      setYears(yearArray);
    };

    fetchCarTypes();
    getDynamicYears();
  }, []);

  if (error) return <p>Error: {error.message}</p>;

  const isButtonDisabled = !selectedCarType || !selectedYear;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-pageBg ">
      <div className="bg-white shadow-searchBox p-10 rounded-md ">
        <p className="text-3xl font-bold text-black mb-5 text-center">
          Search For your Car
        </p>

        <div className="flex items-center justify-left gap-5">
          <Menu as="div" className="relative inline-block text-left w-72">
            {loading ? (
              <p className="text-center text-black">Loading...</p>
            ) : (
              <>
                <MenuButton className="inline-flex justify-center w-full items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  {selectedCarType ? selectedCarType.name : 'Car Type'}
                  <ChevronDownIcon className="size-4 fill-black/60" />
                </MenuButton>

                <MenuItems
                  transition
                  className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto h-60"
                >
                  {carTypes.map((carType: any) => (
                    <MenuItem key={carType.MakeId}>
                      <button
                        onClick={() => {
                          selectedCarType === carType.MakeId
                            ? setSelectedCarType(null)
                            : setSelectedCarType({
                                name: carType.MakeName,
                                id: carType.MakeId,
                              });
                        }}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 text-black"
                      >
                        {carType.MakeName}
                      </button>
                    </MenuItem>
                  ))}
                </MenuItems>
              </>
            )}
          </Menu>

          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex justify-center w-full items-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {selectedYear ? selectedYear : 'Year'}
              <ChevronDownIcon className="size-4 fill-black/60" />
            </MenuButton>

            <MenuItems
              transition
              className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto h-60"
            >
              {years.map((year: any) => (
                <MenuItem key={year}>
                  <button
                    onClick={() => {
                      selectedYear === year
                        ? setSelectedYear(null)
                        : setSelectedYear(year);
                    }}
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10 text-black"
                  >
                    {year}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>

          <div>
            <Link
              href={`/result/${selectedCarType?.id}/${selectedYear}`}
              passHref
              className={`inline-flex items-center gap-2 w-40 justify-center bg-red-600 p-2 rounded-lg text-white hover:bg-red-700 ${isButtonDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}
              aria-disabled={isButtonDisabled}
              style={{ pointerEvents: isButtonDisabled ? 'none' : 'auto' }}
            >
              Next
              <ArrowRightIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
