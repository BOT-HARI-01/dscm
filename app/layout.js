import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // If you have other global styles

export const metadata = {
  title: 'Drug supply chain management system',
  description: 'Real time drug tracking management',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
