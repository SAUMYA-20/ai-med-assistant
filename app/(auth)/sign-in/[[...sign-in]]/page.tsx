// app/login/page.tsx

import { SignIn } from '@clerk/nextjs'
import '../../../globals.css' // Ensure global styles are imported

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn 
        appearance={{
          variables: {
            colorPrimary: '#a855f7', // purple-400
            colorText: 'white',
            colorInputText: 'black',
            colorBackground: 'rgba(0, 0, 0, 0.9)', // Darker card background
            borderRadius: '0.75rem',
            spacingUnit: '0.8rem',
            fontSize: '0.95rem',
          },
          elements: {
            // Card container styling
            card: 'bg-opacity-80 backdrop-blur-lg border border-purple-700/30 shadow-lg shadow-purple-500/10',
            
            // Title customization
            headerTitle: 'text-white text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
            
            // Primary buttons (Submit / Continue)
            formButtonPrimary: 'hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300',

            // Input fields
            formFieldInput: 'focus:ring-2 focus:ring-purple-500/50 bg-black border border-purple-500/30 placeholder:text-gray-400',
            formFieldInputText: 'text-black placeholder:text-gray-400',

            // Social login buttons (Google, GitHub etc.)
            socialButtonsBlockButton: 'bg-white text-black hover:bg-gray-200',
            socialButtonsBlockButtonText: 'text-black font-semibold',
          }
        }}
      />
    </div>
  )
}