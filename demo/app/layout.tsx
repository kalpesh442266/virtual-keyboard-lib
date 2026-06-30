import type { Metadata } from 'next';
import { Navigation } from './components/Navigation';
import './globals.scss';

export const metadata: Metadata = {
  title: 'React Virtual Keyboard',
  description: 'A lightweight, customizable virtual keyboard for React',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
