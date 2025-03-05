import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Country } from "@/types/type";

export default function Pays() {
  const [searchContinent, setSearchContinent] = useState(""); // Continent sélectionné

  const { data, isLoading, isError } = useQuery<Country[]>({
    queryKey: ["country"],
    queryFn: async () =>
      await axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => res.data as Country[]),
  });
  const filteredCountries = useMemo(() => {
    if (!searchContinent) return data;
    return data?.filter((country) => country.region === searchContinent);
  }, [data, searchContinent]);

  if (isLoading) {
    return <p>En cours de chargement ...</p>;
  }

  if (isError) {
    return <p>Erreur de chargement des pays</p>;
  }

  // Utilisation de useMemo pour filtrer les pays selon le continent sélectionné

  return (
    <DashboardLayout>
      {/* Sélecteur de continent */}
      <div className="mb-4">
        <label className="mr-2">Filtrer par continent :</label>
        <select
          className="border px-2 py-1"
          value={searchContinent}
          onChange={(e) => setSearchContinent(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="Africa">Afrique</option>
          <option value="Americas">Amérique</option>
          <option value="Asia">Asie</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Océanie</option>
        </select>
      </div>

      {/* Tableau des pays */}
      <Table>
        <TableCaption>Liste des pays</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Capitale</TableHead>
            <TableHead>Population</TableHead>
            <TableHead className="text-right">Drapeau</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCountries?.map((country, index) => (
            <TableRow key={country.cca3}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {country.name.common}
              </TableCell>
              <TableCell>{country.capital?.join(", ")}</TableCell>
              <TableCell>{country.population}</TableCell>
              <TableCell className="text-right flex justify-end">
                <img
                  src={country.flags.png}
                  alt="drapeau"
                  className="size-[100px]"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {filteredCountries?.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </DashboardLayout>
  );
}
