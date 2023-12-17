import './globals.css';

import { Providers } from './providers';
import { Web3Modal } from '@/context/Web3Modal';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Web3Modal>
          <Providers>{children}</Providers>
        </Web3Modal>
      </body>
    </html>
  );
}
