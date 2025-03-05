import { useMemo } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashboardLayout from "@/layouts/DashboardLayout";
import { useQuery } from "@tanstack/react-query";

// Enregistrer les composants nécessaires pour chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

const coinColors: Record<string, string> = {
  bitcoin: "#FFB84D", // Orangé
  ethereum: "#7F7F7F", // Gris
  tether: "#26A17B", // Vert
  binancecoin: "#F0B90B", // Jaune
  ripple: "#0085CA", // Bleu
  polkadot: "#E6007A", // Rose
  cardano: "#0A62A2", // Bleu foncé
  solana: "#4B8E55", // Vert
  dogecoin: "#C2A300", // Jaune/doré
  litecoin: "#A6A6A6", // Gris clair
  // Ajouter d'autres coins et couleurs si nécessaire
};

export default function Crypto() {
  const { data: crypto, isLoading } = useQuery<Coin[]>({
    queryKey: ["cryptocurrencies"], // Updated query key
    queryFn: async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      );
      return response.data;
    },
  });

  const chartData = useMemo(() => {
    if (!crypto || !crypto[0]?.sparkline_in_7d?.price) {
      // Si les données sont manquantes, on retourne un objet vide valide
      return {
        labels: [],
        datasets: [],
      };
    }

    return {
      labels:
        crypto[0]?.sparkline_in_7d.price.map((_, index) => index.toString()) ||
        [],
      datasets: crypto.map((coin) => ({
        label: coin.name,
        data: coin.sparkline_in_7d.price,
        borderColor: coinColors[coin.id] || "#000000", // Utiliser une couleur spécifique pour chaque crypto
        backgroundColor: coinColors[coin.id]
          ? `${coinColors[coin.id]}30`
          : "rgba(0,0,0,0.1)", // Couleur de fond avec transparence
        fill: true,
      })),
    };
  }, [crypto]);

  if (isLoading || chartData.datasets.length === 0) {
    return <p>Chargement des données...</p>;
  }

  return (
    <DashboardLayout>
      <div>
        <h1>Les cryptomonnaies en temps réel</h1>

        {/* Graphique des prix avec largeur complète */}
        <div
          className="chart-container"
          style={{ width: "100%", height: "400px" }}
        >
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false, // Assurez-vous que le graphique prend toute la largeur sans se restreindre à un ratio spécifique
              scales: {
                x: {
                  ticks: {
                    maxRotation: 45, // Rotation des labels sur l'axe X pour éviter qu'ils se chevauchent
                    minRotation: 0,
                  },
                },
                y: {
                  ticks: {
                    precision: 0, // Arrondir les valeurs sur l'axe Y
                    stepSize: 100000000, // Augmenter le pas des ticks pour mieux espacer les valeurs
                  },
                },
              },
              plugins: {
                tooltip: {
                  mode: "index",
                  intersect: false,
                },
              },
            }}
          />
        </div>

        {/* Tableau des tendances */}
        <Table>
          <TableCaption>Tableau des tendances des cryptomonnaies</TableCaption>
          <TableHeader>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Symbole</TableCell>
              <TableCell>Prix actuel (USD)</TableCell>
              <TableCell>Cap. boursière (USD)</TableCell>
              <TableCell>% 24h</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {crypto?.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>{coin.name}</TableCell>
                <TableCell>{coin.symbol.toUpperCase()}</TableCell>
                <TableCell>{coin.current_price.toFixed(2)}</TableCell>
                <TableCell>{coin.market_cap.toLocaleString()}</TableCell>
                <TableCell
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
