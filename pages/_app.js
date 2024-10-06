// frontend/pages/_app.js
import '../styles/globals.css';  // Import global styles
import { Toaster } from 'react-hot-toast';  // React Hot Toast for notifications

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Initialize React Hot Toast to show notifications */}
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
