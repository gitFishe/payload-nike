import { AuthProvider } from '@/providers/Auth'
import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { SonnerProvider } from '@/providers/Sonner'
import { CartProvider } from '@/providers/Cart'
import { EcommerceProvider } from '@/providers/Ecommerce'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HeaderThemeProvider>
          <SonnerProvider />
            <EcommerceProvider>
              <CartProvider>
                {children}
              </CartProvider>
            </EcommerceProvider>
        </HeaderThemeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
