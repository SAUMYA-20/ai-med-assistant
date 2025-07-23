// app/sign-up/page.tsx

import { SignUp } from '@clerk/nextjs'
import '../../globals.css'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#a855f7',
            colorText: 'white',
            colorInputText: 'black',
            colorBackground: 'rgba(0, 0, 0, 0.9)',
            borderRadius: '0.75rem',
            spacingUnit: '0.8rem',
            fontSize: '1rem',
          },
          elements: {
            card: 'bg-opacity-80 backdrop-blur-lg border border-purple-700/30 shadow-lg shadow-purple-500/10',
            headerTitle: 'text-white text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
            formButtonPrimary:
              'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300',
            formFieldInput:
              'bg-black border border-purple-500/30 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500/50',
            footerActionLink:
              'text-purple-400 hover:text-purple-300 underline transition-colors duration-200',
            otpInput:
              'text-white bg-black border border-purple-500/30',
            otpInputBox:
              'text-white bg-black border border-purple-500/30',
          },
        }}
      />
    </div>
  )
}