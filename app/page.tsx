"use client"
import Navbar from "@/components/NavBar"
import ParticleBackground from "@/components/ParticleBackground"
import { useTheme } from "@/context/ThemeContext"
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap } from "lucide-react"
import dynamic from "next/dynamic"

const ParticleWaveCanvas = dynamic(()=>import("@/components/ParticleWave"),{
  ssr: false,
  loading: ()=>(
    <div className="w-full h-full min-h-[500px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-medium text-slate-400">Loading 3D Wave Grid...</span>
      </div>
    </div>
  )
})

function Hero(){
  const { theme, toggleTheme } = useTheme();
  return (
    <>
    <section id = "home" className={`relative pt-32 pb-20 flex flex-col md:pt-40 md:pb-32 ${theme === 'dark'?"bg-black text-white" : "bg-white text-black"} overflow-hidden`}>
      <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none`}/>
      <ParticleBackground theme = {theme}/>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6 z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide uppercase">
              Algoryx Community Asset
            </div>
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-gradient-to-r  ${theme==='dark'? 'from-white via-slate-200 to-slate-400': 'from-black via-slate-800 to slate-700'} bg-clip-text text-transparent`}>
              Interactive 3D Dynamics Engine
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Experience realistic physics visualization powered by Algoryx's particle wave model. Integrated into modern React architecture for seamless, high-performance web experiences.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
              >
                Explore Features <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#simulation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 text-slate-300 font-semibold transition-all"
              >
                View Specs
              </a>
            </div>
          </div>
          <div className = "lg:col-span-7 relative">
          <div className = "relative rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm overflow-hidden shadow-2xl">
            <ParticleWaveCanvas/>
            <div className={`absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-35 pointer-events-none text-xs ${theme==='dark' ? 'bg-slate-900/80 text-white border-slate-800':'bg-slate-200/90 text-black border-slate-400'} backdrop-blue-md p-3 rounded-lg border `}>
              <span>Asset: Particle Wave Grid (.glb)</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Realtime Render
                </span>
            </div>
          </div>
        </div>
        </div>

       
       </section>
    </>
  )
}

function Features(){
  const { theme, toggleTheme } = useTheme();

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x : number =  e.clientX - rect.left;
    const y : number =  e.clientY - rect.top;

    const rotateX = ((y - rect.height/2)/rect.height)*-10;
    const rotateY = ((x - rect.width/2)/rect.width)*10;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    card.style.transition = `none`

  }

  const handleMouseLeave = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = e.currentTarget
    e.currentTarget.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`
    card.style.transition = `transition 2s cubic-bezier(0.23, 1, 0.32, 1)`
  }

  return (
    <section id = "features" className={`${theme==='dark' ? 'bg-black text-white border-gray-800': 'bg-white text-black border-gray-100'} border py-20 px-15 flex flex-col`}>
      <ParticleBackground theme={theme}/>
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        
        
        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 transition bg-clip-text text-transparent">
          Architected for Web Performance
        </h1>
        <p className={`text-xl p-5 tracking-light ${theme==='dark'?'text-slate-400':'text-slate-800'}`}>
            Integrating high-fidelity WebGL models into production workflows without sacrificing loading times or UX responsiveness.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {[
              {
                icon: <Cpu className="w-6 h-6 text-blue-400" />,
                title: "GPU Accelerated",
                description:
                  "Rendered efficiently using Three.js shader instancing and WebGL pipeline optimizations.",
              },
              {
                icon: <Layers className="w-6 h-6 text-violet-400" />,
                title: "Modular Architecture",
                description:
                  "Built with decoupled React components and TypeScript types for maintenance at scale.",
              },
              {
                icon: <Zap className="w-6 h-6 text-emerald-400" />,
                title: "Adaptive Framerates",
                description:
                  "Dynamic Device Pixel Ratio (DPR) scaling keeps frame rates fluid across mobile and desktop displays.",
              },
            ].map((feature, idx) => (
              <div key = {idx} onMouseMove = {handleMouseMove} onMouseLeave={handleMouseLeave} className={`p-8 rounded-2xl border z-20 shadow shadow-purple-500 transition-all hover:-translate-y-1 ${theme==='dark'? 'bg-slate-900/60 border-slate-800 hover:border-slate-800' : 'bg-slate-200/40 border-slate-200 hover:border-slate-400'}`}>
                <div className={`p-3 w-fit ${theme==='dark' ? 'bg-slate-800/80' : 'bg-slate-300/40'} rounded-xl mb-6`}>{feature.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${theme==='dark'?'text-white': 'text-black'}`}>{feature.title}</h3>
                <p className= {`${theme==='dark' ? 'text-slate-400':'text-slate-700'} leading-relaxed`}> {feature.description}</p>
              </div>
            ))}
      </div>
    </section>
  )
}

function Simulation(){
  const { theme, toggleTheme } = useTheme();
  
  return (
    <section id = "simulation" className={`py-14 ${theme==='dark' ? 'bg-black text-white': 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`rounded-3xl bg-gradient-to-r p-8 md:p-12 border ${theme==='dark'?'from-blue-900/30 via-slate-900 to-violet-900/30 border-slate-800':'from-blue-100 via-slate-300 to-violet-400 border-slate-100'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className={`text-3xl font-bold ${theme==='dark'?'text-white':'text-black'}`}>Algoryx Simulation</h2>
                <p className={`leading-relaxed ${theme==='dark' ? 'text-gray-100':'text-gray-900'}`}>
                    Algoryx provides enterprise-grade physics for digital twins, robotics, and complex granular materials. This visual wave grid asset models harmonic oscillation across multi-particle matrices.
                </p>
                <div className="pt-2 flex items-center gap-6">
                <div>
                  <div className="text-3xl font-extrabold text-blue-400">60 FPS</div>
                  <div className={`text-xs ${theme==='dark'?'text-slate-400':'text-slate-800'} uppercase tracking-wider`}>Target Performance</div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-3xl font-extrabold text-violet-400">&lt; 2MB</div>
                  <div className={`text-xs uppercase tracking-wider ${theme==='dark'?'text-slate-400':'text-slate-800'}`}>Asset Footprint</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-slate-950/60 p-6 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between text-sm text-slate-300 border-b border-slate-800 pb-3">
                  <span>Asset Format</span>
                  <span className={`font-mono ${theme === 'dark' ? 'text-blue-400': 'text-blue-200'}`}>GLTF / GLB 2.0</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300 border-b border-slate-800 pb-3">
                  <span>Source</span>
                  <span className={`font-mono ${theme === 'dark' ? 'text-blue-400': 'text-blue-200'}`}>Algoryx Community</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300 border-b border-slate-800 pb-3">
                  <span>Framework</span>
                  <span className={`font-mono ${theme === 'dark' ? 'text-blue-400': 'text-blue-200'}`}>Next.js 14+ (App Router)</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>3D Library</span>
                  <span className={`font-mono ${theme === 'dark' ? 'text-blue-400': 'text-blue-200'}`}>R3F / Drei</span>
                </div>
              </div>


          </div>

        </div>
      </div>
    </section>
  )
}

function Community(){
  const { theme, toggleTheme } = useTheme();

  return(
    <section id = "community" className={`${theme==='dark'?'bg-black text-white border-gray-800': 'bg-white text-black border-gray-200'} border py-10`}>
            <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-gray-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none`}/>
              <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-6">
                <div className = "flex items-center gap-2">
                  <ShieldCheck className= "w-5 h-5 text-blue-500"/>
                  <span className={`text-sm font-medium ${theme==='dark' ? 'text-slate-300': 'text-slate-700'}`}>
                    Built with Next.JS, three.JS and Algoryx Assets
                  </span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-6">
            <a
              href="https://github.com/Chait314"
              target="_blank"
              rel="noreferrer"
              className={`${theme==='dark' ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-800'} transition-colors`}
              aria-label="GitHub Repository"
            >
              Github
            </a>
          </div>
    </section>
  )
}

export default function Page(){
  return( 
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-500/30 selection:text-blue-200">
     <Navbar/>
    <Hero/>
    {/* <ParticleWaveCanvas/> */}
    <Features/>
    <Simulation/>
    <Community/>
    </div>
  )
}