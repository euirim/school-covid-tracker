import { AppComponent } from 'next/dist/next-server/lib/router/router';
import '@styles/fonts.css';
import '@styles/tailwind.css';

const MyApp: AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
