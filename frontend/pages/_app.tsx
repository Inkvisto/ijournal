import '../styles/globals.css'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import { ThemeProvider} from '@mui/material/styles';
import { MainTheme } from '../theme';
import {Provider} from 'react-redux'
import { store, wrapper } from '../redux/store';

import { GetServerSideProps, NextPage } from 'next';
import React, { Component } from 'react';
import { createBox } from '@mui/lab/node_modules/@mui/system';
import { Api } from '../utils/api';




export default wrapper.withRedux(({ Component, pageProps }:AppProps) =>(


    <Component {...pageProps} />

)
)






