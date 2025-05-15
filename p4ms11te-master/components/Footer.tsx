import Link from "next/link"
import Image from "next/image"
import { siteData } from "@/app/data"

export function Footer() {
  return (
    <footer className="bg-[#2a0800] text-[#f4f3ee] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative h-12 w-auto">
                <Image
                  src="https://res.cloudinary.com/dvopxlh1g/image/upload/v1742835348/pmbeauty/logos/j0yxo2egfymnswkawkju.png"
                  alt={`${siteData.siteName} Logo`}
                  width={100}
                  height={40}
                  className="object-contain w-auto h-full"
                />
              </div>
            </div>
            <p className="text-[#f4f3ee]/70 mb-6">{siteData.footer.description}</p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              {siteData.footer.quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="text-[#f4f3ee]/70 hover:text-[#d38b5d] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/galeria"
                  className="text-[#f4f3ee]/70 hover:text-[#d38b5d] transition-colors"
                >
                  Galeria
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#f4f3ee]/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#f4f3ee]/70 text-sm">
            &copy; {new Date().getFullYear()} {siteData.siteName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            {siteData.footer.legal.map((item, index) => (
              <a key={index} href="#" className="text-[#f4f3ee]/70 hover:text-[#d38b5d] text-sm">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
} 