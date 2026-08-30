import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { ShaderBackground } from './components/ui/kk'
import './styles.css'
import './shader.css'
import './liquid.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <div className="shader-page-background" aria-hidden="true">
        <ShaderBackground className="h-full w-full" />
      </div>
      <App />
    </>
  </StrictMode>,
)
