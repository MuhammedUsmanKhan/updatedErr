// app/providers.tsx
// 'use client'
import {NextUIProvider} from '@nextui-org/react';
import '../globals.css'
// import '../globals.css'; // Import your global styles if any


export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  )
}