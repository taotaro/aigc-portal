import type { AppProps } from 'next/app';
import Layout from '../components/layout'

import "babel-polyfill";

import '../styles/globals.css';

import '../styles/transition.min.css';
import '../styles/popuo-box.css';
import '../styles/bootstrap.css';
import '../styles/style.css';
import '../styles/style-article.css';
import '../styles/main.css';

import '../pages/index/index.css';


type ComponentWithPageLayout = AppProps & {
  Component: AppProps["Component"] & {
      PageLayout?: React.ComponentType;
  };
};

function MyApp({Component, pageProps}: ComponentWithPageLayout) {
  return (
      <Layout pageInfo={Component.EXTEND_INFO || {}}>
          {Component.PageLayout ? (
              <Component.PageLayout>
                  <Component {...pageProps} key={Component.displayName}/>
              </Component.PageLayout>
          ) : (
              <Component {...pageProps} key={Component.displayName}/>
          )}
      </Layout>
  )
}

export default MyApp
