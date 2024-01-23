declare global {
   namespace NodeJS {
      interface ProcessEnv {
         NEXT_PUBLIC_API_URL: string

         NEXT_PUBLIC_FIREBASE_API_KEY: string
         NEXT_PUBLIC_FIREBASE_APP_ID: string
         NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string
         NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string
         NEXT_PUBLIC_FIREBASE_PROJECT_ID: string
         NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string
      }
   }
}

export { }
