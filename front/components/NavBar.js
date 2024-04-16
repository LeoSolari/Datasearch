import Link from "next/link";

const Navbar = () => {
  const links = [
    { text: "Datos", ref: "/datos" },
    { text: "Mapa", ref: "mapas" },
    { text: "Bases", ref: "/bases" },
    { text: "Usuarios", ref: "/usuarios" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-950 text-white py-4 px-8 ">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <p className="hover:text-blue-300">LOGO!</p>
          </Link>
        </div>

        <div className="flex-grow"></div>
        <div className="flex space-x-4">
          <div className="flex space-x-4">
            {links.map((link, index) => (
              <Link href={link.ref} key={index}>
                <p className="hover:text-blue-300">{link.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
