import Link from "next/link";
import logo from "../../images/logophoenix.svg";
import Image from "next/image";

const Navbar = () => {
  const links = [
    { text: "OpenWorks", ref: "/openWorks" },
    { text: "Mapa", ref: "/mapas" },
    { text: "Archivo Digital", ref: "/archivodigital" },
  ];

  return (
    <nav className="fixed z-50 top-0 left-0 w-full bg-blue-950 text-white py-4 px-8 ">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/" className="hidden sm:block">
            <Image src={logo} alt="Logo" />
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