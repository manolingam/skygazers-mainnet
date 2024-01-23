'use client';

import { Flex } from '@chakra-ui/react';

import { Header } from '@/shared/Header';
import { Footer } from '@/shared/Footer';

import { GazerDetail } from '@/views/GazerDetail';

export default function GazerDetailPage({ params }) {
  return (
    <Flex direction='column' minH='100vh'>
      <Header />
      <GazerDetail params={params} />
      <Footer />
    </Flex>
  );
}
