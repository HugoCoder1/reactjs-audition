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
import type { User } from "@/types/type";

export default function User() {
  const [searchGender, setSearchGender] = useState(""); // Toujours placé en haut

  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () =>
      await axios
        .get("https://randomuser.me/api/?results=50")
        .then((res) => res.data.results as User[]),
  });

  // Mémorisation des utilisateurs filtrés
  const filteredUsers = useMemo(() => {
    return data?.filter((user) =>
      searchGender ? user.gender === searchGender : true
    );
  }, [data, searchGender]);

  if (isLoading) {
    return <p>En cours de chargement ...</p>;
  }

  if (isError) {
    return <p>Erreur de chargement des utilisateurs</p>;
  }

  return (
    <DashboardLayout>
      <div className="mb-4">
        <label className="mr-2">Filtrer par genre :</label>
        <select
          className="border px-2 py-1"
          value={searchGender}
          onChange={(e) => setSearchGender(e.target.value)}
        >
          <option value="">Tous</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
      </div>

      <Table>
        <TableCaption>Liste des Utilisateurs.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Photo de profil</TableHead>
            <TableHead className="text-right">Pays</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers?.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">
                {user.name.title} {user.name.first} {user.name.last}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <img
                  src={user.picture.medium}
                  alt="image"
                  className="size-[100px]"
                />
              </TableCell>
              <TableCell className="text-right">
                {user.location.country}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">
              {filteredUsers?.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </DashboardLayout>
  );
}
