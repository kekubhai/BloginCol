/* eslint-disable @typescript-eslint/no-unused-vars */
// components/ClerkProviderWrapper.js
"use client"
import React from 'react';
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const ClerkProviderWrapper = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <ClerkProvider>
      {/* Optionally use RedirectToSignIn or other Clerk components */}
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;
