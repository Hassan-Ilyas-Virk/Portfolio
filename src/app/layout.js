import './globals.css'

export const metadata = {
  title: 'Hassan Ilyas Virk — Creative Developer',
  description: 'Creative developer building immersive web experiences with Three.js, WebGL, and real-time 3D.',
  icons: {
    icon: '/medias/logo_png.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
