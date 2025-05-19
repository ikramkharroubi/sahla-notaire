import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="https://notairekenitra.com/wp-content/uploads/2024/01/logonot-2.png"
        alt="Notaire Kenitra Logo"
        width={220}
        height={73}
        className="h-16 w-auto"
      />
    </div>
  )
}

