import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import {trpc} from "../utils/trpc";
import { useState } from 'react';
import AppComponent from "./AppComponent"
function App() {
  const [queryClient] = useState(()=> new QueryClient())
  const [trpcClient] = useState(() => trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          headers(){
            return {
              authorization: "*"//getAuthCookie()
            }
          }
        })
      ]
    })
  ) 


  return (
      <trpc.Provider client={trpcClient} queryClient={queryClient} >
          <QueryClientProvider client={queryClient}>
             <AppComponent />
          </QueryClientProvider>
      </trpc.Provider>
  )
}

export default App;