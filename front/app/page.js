import Link from "next/link";
import Button from "@/components/Button";

const Home = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Home</h1>
    <div className="flex justify-around w-full mb-8">
      <Link href="/usuarios">
        <Button className="w-48 h-20 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Ver Usuarios
        </Button>
      </Link>
      <Link href="/mapas">
        <Button className="w-48 h-20 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Ver Mapas
        </Button>
      </Link>
    </div>
    <div className="flex justify-around w-full">
      <Link href="/bases">
        <Button className="w-48 h-20 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Ver Bases
        </Button>
      </Link>
      <Link href="/datos">
        <Button className="w-48 h-20 text-lg bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
          Ver Datos
        </Button>
      </Link>
    </div>
  </div>
);

export default Home;
