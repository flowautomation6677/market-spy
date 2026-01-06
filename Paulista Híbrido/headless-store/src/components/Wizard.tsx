'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import { getRecommendations, getCheckoutUrl, getWhatsAppUrl } from '@/lib/products';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Placeholder images function (to be replaced by real assets)
const PlaceholderImage = ({ label }: { label: string }) => (
    <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-3 text-gray-400 text-xs">
        [FOTO REAL: {label}]
    </div>
);

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

type Step = 'SHAPE' | 'RESULT';

export default function Wizard() {
    const [step, setStep] = useState<Step>('SHAPE');
    const [selectedShape, setSelectedShape] = useState<string | null>(null);
    const [showComparison, setShowComparison] = useState(false);

    const handleShapeSelect = (shape: string) => {
        setSelectedShape(shape);
        setStep('RESULT');
    };

    // Use getRecommendations from imports
    const recommendations = selectedShape && selectedShape !== 'unknown' ? getRecommendations(selectedShape) : null;
    const bestChoice = recommendations?.best;

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            {/* STICKY HEADER */}
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 py-4 px-6 flex items-center justify-between">
                <div className="font-bold text-xl text-blue-900 tracking-tight">Paulista<span className="text-blue-600">.store</span></div>
                <div className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    Passo {step === 'SHAPE' ? '1' : '2'} de 2
                </div>
            </header>

            <main className="flex-grow pb-32 max-w-lg mx-auto w-full">
                <AnimatePresence mode="wait">
                    {step === 'SHAPE' ? (
                        <motion.div
                            key="shape"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6 p-4"
                        >
                            <div className="text-center space-y-2">
                                <h1 className="text-2xl font-bold text-gray-900">Qual o formato do seu vaso?</h1>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Olhe para a louça do vaso <strong>de cima</strong> e sem a tampa antiga.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: 'oval', label: 'Oval (Formato de Ovo)', shortLabel: 'OVAL' },
                                    { id: 'square', label: 'Quadrado / Reto', shortLabel: 'QUADRADO', image: '/images/quadrado-branco.png' },
                                    { id: 'universal', label: 'Redondo (Padrão)', shortLabel: 'REDONDO', image: '/images/redondo-comum.png' },
                                    { id: 'unknown', label: 'Outros Formatos', shortLabel: 'OUTRO' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleShapeSelect(item.id)}
                                        className="bg-white p-4 rounded-xl border-2 border-transparent shadow-sm hover:border-blue-500 hover:shadow-md transition-all text-left group overflow-hidden"
                                    >
                                        {item.image ? (
                                            <div className="w-full h-32 flex items-center justify-center mb-3">
                                                <img src={item.image} alt={item.label} className="max-h-full max-w-full object-contain" />
                                            </div>
                                        ) : (
                                            <PlaceholderImage label={item.shortLabel} />
                                        )}
                                        <span className="font-bold text-gray-800 block leading-tight">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-0"
                        >
                            {/* SUCCESS BAR - NEUTRAL COLOR */}
                            <div className="bg-slate-100 text-slate-700 px-4 py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm border-b border-slate-200">
                                <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">✓</div>
                                Modelos compatíveis com VASO {selectedShape?.toUpperCase()}
                            </div>

                            {!bestChoice ? (
                                <div className="text-center space-y-6 pt-12 p-4">
                                    {/* FALLBACK FOR UNKNOWN OR NO PRODUCT */}
                                    <div className="w-24 h-24 bg-yellow-100 rounded-full mx-auto flex items-center justify-center animate-pulse">
                                        <Camera className="w-12 h-12 text-yellow-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Vamos analisar juntos!</h2>
                                    <p className="text-gray-600">Para garantir o modelo certo, envie uma foto do seu vaso para nosso especialista.</p>
                                </div>
                            ) : (
                                <div className="p-4 space-y-4"> {/* Reduced gap from 8 to 4 */}
                                    {/* HERO SECTION - BEST CHOICE */}
                                    <div className="space-y-2"> {/* Reduced spacing */}
                                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-tight border-l-4 border-blue-600 pl-3">
                                            Nossa Recomendação
                                        </h2>

                                        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-600 overflow-hidden relative">
                                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                                                CAMPEÃO DE VENDAS
                                            </div>

                                            {/* Reduced height from h-56 to h-40 for "Above the Fold" optimization */}
                                            <div className="bg-gray-50 h-40 flex items-center justify-center p-4 relative">
                                                {bestChoice.imageUrl ? (
                                                    <img src={bestChoice.imageUrl} alt={bestChoice.name} className="h-full object-contain drop-shadow-lg" />
                                                ) : (
                                                    <span>[FOTO]</span>
                                                )}
                                            </div>

                                            <div className="p-5 pt-3"> {/* Slightly reduced padding */}
                                                <div className="flex justify-between items-start mb-1">
                                                    <div>
                                                        <h3 className="font-bold text-lg text-gray-900 leading-tight">{bestChoice.name}</h3>
                                                        <p className="text-xs text-gray-500 mt-0.5">Padrão Deca Vogue / Icasa Sabatini</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-1 mb-3">
                                                    {[1, 2, 3, 4, 5].map(i => <span key={i} className="text-yellow-400 text-base">★</span>)}
                                                    <span className="text-xs text-gray-500 font-medium ml-1">({bestChoice.rating?.count || 42} avaliações)</span>
                                                </div>

                                                <div className="bg-blue-50 rounded-xl p-3 mb-3">
                                                    <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">Por que este?</p>
                                                    <ul className="space-y-1 text-xs text-gray-700">
                                                        {bestChoice.features?.map((feat: string) => (
                                                            <li key={feat} className="flex items-start gap-1.5">
                                                                <span className="text-blue-500 font-bold">✓</span>
                                                                {feat}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="flex items-end justify-between mb-3">
                                                    <div>
                                                        {bestChoice.originalPrice && <p className="text-xs text-gray-400 line-through">De: R$ {bestChoice.originalPrice.toFixed(2).replace('.', ',')}</p>}
                                                        <p className="text-3xl font-black text-blue-600">R$ {bestChoice.price.toFixed(2).replace('.', ',')}</p>
                                                        <p className="text-[10px] text-gray-500">ou 3x sem juros</p>
                                                    </div>
                                                </div>

                                                <a
                                                    href={getCheckoutUrl(bestChoice.id)}
                                                    className="block w-full py-3.5 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-green-200 text-center"
                                                >
                                                    COMPRAR ESTE MODELO &gt;&gt;
                                                    <span className="block text-[10px] font-normal opacity-90 mt-0.5">Entrega Garantida pelo Mercado Livre</span>
                                                </a>

                                                {/* COMPARISON LINK */}
                                                <button
                                                    onClick={() => setShowComparison(true)}
                                                    className="w-full text-center mt-3 text-xs text-blue-600 underline hover:text-blue-800"
                                                >
                                                    Ver comparativo: Por que a versão Recomendada é melhor que a Básica?
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DIVIDER */}
                                    <div className="relative flex items-center py-2">
                                        <div className="flex-grow border-t border-gray-300"></div>
                                        <span className="flex-shrink-0 mx-4 text-gray-400 text-xs uppercase tracking-widest font-medium text-center">Ou veja outras <br />versões para este vaso:</span>
                                        <div className="flex-grow border-t border-gray-300"></div>
                                        <div className="absolute left-1/2 -ml-2 top-8 text-gray-300">
                                            v
                                        </div>
                                    </div>

                                    {/* OPTIONS COMPARISON */}
                                    <div className="space-y-4 pt-1">

                                        {/* ECONOMY OPTION */}
                                        {recommendations?.economy && (
                                            <div>
                                                {/* Removed Header as per new request logic focusing on card content */}
                                                <div className="bg-white rounded-xl border border-gray-200 p-3 flex gap-4 items-center">
                                                    {/* THUMBNAIL */}
                                                    <div className="w-16 h-16 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center p-1">
                                                        <img src={recommendations.economy.imageUrl} alt="Eco" className="max-h-full max-w-full opacity-80 mix-blend-multiply" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-bold text-gray-800 text-sm leading-tight">{recommendations.economy.name}</h3>
                                                        <div className="text-xs text-gray-500 mt-1 mb-1">
                                                            {recommendations.economy.features?.join(' • ') || 'Polipropileno (Básico)'}
                                                        </div>
                                                        <p className="font-bold text-gray-900">R$ {recommendations.economy.price.toFixed(2).replace('.', ',')}</p>
                                                    </div>
                                                    <a
                                                        href={getCheckoutUrl(recommendations.economy.id)}
                                                        className="px-3 py-2 border border-blue-200 text-blue-600 font-bold text-xs rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                                                    >
                                                        Ver Detalhes
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* LUXURY OPTION */}
                                        {recommendations?.luxury && (
                                            <div>
                                                <div className="bg-white rounded-xl border border-amber-200 p-3 flex gap-4 items-center relative overflow-hidden">
                                                    {/* THUMBNAIL */}
                                                    <div className="w-16 h-16 bg-gray-50 rounded-lg shrink-0 flex items-center justify-center p-1">
                                                        <img src={recommendations.luxury.imageUrl} alt="Luxo" className="max-h-full max-w-full" />
                                                    </div>
                                                    <div className="flex-grow">
                                                        <h3 className="font-bold text-gray-900 text-sm leading-tight">{recommendations.luxury.name}</h3>
                                                        <div className="text-xs text-gray-500 mt-1 mb-1">
                                                            {recommendations.luxury.features?.join(' • ') || 'Alto Brilho e Design'}
                                                        </div>
                                                        {/* Anchoring Price - Visible */}
                                                        <p className="font-black text-amber-600 text-lg">R$ {recommendations.luxury.price.toFixed(2).replace('.', ',')}</p>
                                                    </div>
                                                    <a
                                                        href={getWhatsAppUrl(`Tenho interesse no Assento de Luxo em Resina para vaso ${selectedShape}. Gostaria de ver cores.`)}
                                                        className="px-3 py-2 bg-green-50 text-green-700 border border-green-200 font-bold text-[10px] rounded-lg hover:bg-green-100 flex flex-col items-center whitespace-nowrap"
                                                    >
                                                        <span>Personalizar</span>
                                                        <span>(WhatsApp)</span>
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* EXIT LINK */}
                                    <div className="text-center py-6 pb-24">
                                        <a href={`https://${process.env.NEXT_PUBLIC_STORE_DOMAIN || 'loja-exemplo-nuvemshop.com.br'}/assentos`} className="text-gray-400 text-xs underline hover:text-gray-600">
                                            Prefere escolher sozinho? Clique aqui para ver a lista completa de produtos.
                                        </a>
                                    </div>

                                </div>
                            )}

                            {/* COMPARISON MODAL */}
                            <AnimatePresence>
                                {showComparison && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowComparison(false)}>
                                        <motion.div
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.9, opacity: 0 }}
                                            className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
                                                <h3 className="font-bold text-lg">Tira-Teima</h3>
                                                <button onClick={() => setShowComparison(false)} className="text-white/80 hover:text-white">✕</button>
                                            </div>
                                            <div className="p-4">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-gray-200">
                                                            <th className="py-2 text-left font-medium text-gray-500"></th>
                                                            <th className="py-2 text-center font-bold text-gray-400">Básico (R$ 89)</th>
                                                            <th className="py-2 text-center font-black text-blue-600">Recomendado (R$ 189)</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-100">
                                                        <tr>
                                                            <td className="py-3 font-medium text-gray-600">Barulho</td>
                                                            <td className="py-3 text-center text-gray-500">Tampa bate (Pá!)</td>
                                                            <td className="py-3 text-center font-bold text-green-600">Desce devagar (Silêncio)</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-3 font-medium text-gray-600">Material</td>
                                                            <td className="py-3 text-center text-gray-500">Plástico Fino</td>
                                                            <td className="py-3 text-center font-bold text-blue-600">Injetado Rígido (Forte)</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="py-3 font-medium text-gray-600">Garantia</td>
                                                            <td className="py-3 text-center text-gray-500">3 meses</td>
                                                            <td className="py-3 text-center font-bold text-blue-600">1 ano</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                <button
                                                    onClick={() => setShowComparison(false)}
                                                    className="w-full mt-4 bg-blue-600 text-white font-bold py-3 rounded-xl"
                                                >
                                                    Entendi, quero o Recomendado
                                                </button>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>

                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* STICKY FOOTER - PANIC BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
                <div className="flex items-center gap-3 max-w-lg mx-auto">
                    {/* SELLER FACE (Optional, using a placeholder icon for now or just text) */}
                    <div className="shrink-0">
                        <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            {/* Placeholder for seller face */}
                            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-xs">👤</div>
                        </div>
                    </div>

                    <div className="flex-grow">
                        <p className="text-xs text-gray-500 font-medium mb-1 pl-1">Ainda na dúvida do modelo?</p>
                        <a
                            href={getWhatsAppUrl(step === 'SHAPE'
                                ? "Olá! Estou na dúvida sobre o formato do meu vaso e quero enviar uma foto."
                                : `Estou vendo os modelos para vaso ${selectedShape} mas ainda tenho dúvida.`
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-green-50 hover:bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg transition-colors border border-green-200 text-sm"
                        >
                            <Camera className="w-4 h-4" />
                            Falar com Humano
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
