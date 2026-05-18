/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  PlayCircle, 
  BookOpen, 
  Menu, 
  X,
  Scissors
} from 'lucide-react';
import { TRAINING_MODULES, COMMON_STEPS, type TrainingModule } from './constants';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export default function App() {
  const [currentModuleId, setCurrentModuleId] = useState(1);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  const currentModule = TRAINING_MODULES.find(m => m.id === currentModuleId) || TRAINING_MODULES[0];

  const handleNext = () => {
    if (!completedModules.includes(currentModuleId)) {
      setCompletedModules(prev => [...prev, currentModuleId]);
    }
    if (currentModuleId < TRAINING_MODULES.length) {
      setCurrentModuleId(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentModuleId > 1) {
      setCurrentModuleId(prev => prev - 1);
    }
  };

  const toggleComplete = (id: number) => {
    setCompletedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && !isLargeScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        id="sidebar"
        initial={false}
        animate={{ x: isSidebarOpen || isLargeScreen ? 0 : -320 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 left-0 w-80 bg-white border-r border-neutral-200 z-50 lg:relative lg:translate-x-0 overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-neutral-900">
            <div className="p-2 bg-neutral-900 rounded-lg">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold tracking-tight text-xl">DayStar</h1>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {TRAINING_MODULES.map((module) => {
              const isCompleted = completedModules.includes(module.id);
              const isActive = currentModuleId === module.id;
              
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setCurrentModuleId(module.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    isActive 
                      ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-200' 
                      : 'hover:bg-neutral-100 text-neutral-600'
                  }`}
                >
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold shrink-0 transition-colors ${
                    isActive 
                      ? 'bg-white/20' 
                      : isCompleted ? 'bg-green-100 text-green-600' : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200'
                  }`}>
                    {isCompleted && !isActive ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      module.id.toString().padStart(2, '0')
                    )}
                  </div>
                  <span className={`font-medium truncate ${isCompleted && !isActive ? 'text-neutral-400' : ''}`}>
                    {module.title}
                  </span>
                  {isActive && (
                    <motion.div layoutId="active-indicator" className="ml-auto">
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-6 border-t border-neutral-100">
            <div className="bg-neutral-50 rounded-2xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Progreso</span>
                <span className="text-xs font-bold text-neutral-900">{Math.round((completedModules.length / TRAINING_MODULES.length) * 100)}%</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedModules.length / TRAINING_MODULES.length) * 100}%` }}
                  className="h-full bg-green-500"
                />
              </div>
            </div>
          </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full bg-white lg:bg-neutral-50">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 flex items-center justify-between px-6 bg-white border-b border-neutral-200 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-neutral-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold text-neutral-900">Módulo {currentModuleId}</span>
          <div className="w-10" /> {/* Spacer */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pt-6 sm:pt-4">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            {/* Module Title Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-2 md:py-4">
              <div className="max-w-2xl">
                <span className="inline-block px-3 py-1 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-3 md:mb-4">
                  Módulo {currentModuleId.toString().padStart(2, '0')}
                </span>
                <h2 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
                  {currentModule.title}
                </h2>
              </div>
              
              <div className="flex gap-2 shrink-0">
                <button 
                  onClick={() => toggleComplete(currentModuleId)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                    completedModules.includes(currentModuleId)
                      ? 'bg-green-50 border-green-200 text-green-700'
                      : 'bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${completedModules.includes(currentModuleId) ? 'fill-green-500 text-white' : ''}`} />
                  <span className="text-sm font-bold uppercase tracking-tight">
                    {completedModules.includes(currentModuleId) ? 'Completado' : 'Marcar'}
                  </span>
                </button>
                <button 
                  onClick={handlePrev}
                  disabled={currentModuleId === 1}
                  className="flex-1 md:flex-none flex items-center justify-center p-4 md:p-3 bg-white border border-neutral-200 rounded-2xl md:rounded-xl hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-colors active:scale-95"
                >
                  <ChevronLeft className="w-6 h-6 md:w-5 md:h-5 text-neutral-900" />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentModuleId === TRAINING_MODULES.length}
                  className="flex-1 md:flex-none flex items-center justify-center p-4 md:p-3 bg-white border border-neutral-200 rounded-2xl md:rounded-xl hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-colors active:scale-95"
                >
                  <ChevronRight className="w-6 h-6 md:w-5 md:h-5 text-neutral-900" />
                </button>
              </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
              {/* Left Side: Guidelines */}
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <div className="bg-white rounded-[2rem] md:rounded-3xl border border-neutral-200 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-6">
                    <BookOpen className="w-5 h-5 text-neutral-400" />
                    <h3 className="font-bold text-neutral-900 uppercase tracking-widest text-xs">Guía de Operación</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {COMMON_STEPS.map((step) => (
                      <motion.div 
                        key={step.id} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: step.id * 0.05 }}
                        className="flex gap-4 group"
                      >
                        <div className="flex flex-col items-center shrink-0">
                          <div className={`flex items-center justify-center w-7 h-7 rounded-full border-2 transition-colors duration-300 ${
                            currentModuleId > 1 ? 'bg-neutral-900 border-neutral-900 text-white' : 'border-neutral-200 text-neutral-400 group-hover:border-neutral-400'
                          }`}>
                            {currentModuleId > 1 ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <span className="text-[10px] font-bold">{step.id}</span>
                            )}
                          </div>
                          {step.id !== 10 && <div className="w-[2px] h-full bg-neutral-100 mt-2" />}
                        </div>
                        <p className="text-neutral-600 text-sm md:text-base leading-relaxed pt-0.5 group-hover:text-neutral-900 transition-colors">
                          {step.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Video */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="bg-neutral-900 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl relative group aspect-video">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentModuleId}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <iframe
                        className="w-full h-full border-0"
                        src={currentModule.videoUrl}
                        title={`Tutorial: ${currentModule.title}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </motion.div>
                  </AnimatePresence>
                  
                  {/* Overlay decor */}
                  <div className="absolute top-4 right-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-white" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider">Video de Entrenamiento</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-white border border-neutral-200 rounded-3xl">
                  <h4 className="font-bold text-neutral-900 mb-2">Consejos del Instructor</h4>
                  <p className="text-neutral-500 text-sm italic">
                    "Preste atención al sonido de la máquina. Si la aguja golpea con fuerza, deténgase inmediatamente y revise que no haya hilos enredados o una aguja doblada."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
