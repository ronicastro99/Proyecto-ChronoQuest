import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { ARTICULOS_TIENDA } from '../../data/shopItems';
import { ArticuloTienda } from '../../types/game';
import { storage } from '../../services/storageService';
import { MascotBubble } from '../common/MascotBubble';
import {
  Coins,
  Heart,
  HeartPulse,
  Sparkles,
  ShieldAlert,
  ScrollText,
  Hourglass,
  CheckCircle2,
  AlertCircle,
  Receipt,
  ArrowRight,
} from 'lucide-react';

export const ShopScreen: React.FC = () => {
  const { user, buyShopItem, setCurrentView } = useGame();
  const [purchaseFeedback, setPurchaseFeedback] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const transactions = storage.getTransacciones(user.id_usuario);

  const handleBuy = (item: ArticuloTienda) => {
    const result = buyShopItem(item);
    setPurchaseFeedback(result);
    setTimeout(() => {
      setPurchaseFeedback(null);
    }, 4000);
  };

  const getItemIcon = (icono: string) => {
    switch (icono) {
      case 'Heart':
        return <Heart className="w-7 h-7 text-red-400 fill-red-500/20" />;
      case 'HeartPulse':
        return <HeartPulse className="w-7 h-7 text-red-500" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-amber-400" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-7 h-7 text-blue-400" />;
      case 'ScrollText':
        return <ScrollText className="w-7 h-7 text-purple-400" />;
      case 'Hourglass':
        return <Hourglass className="w-7 h-7 text-yellow-400" />;
      default:
        return <Heart className="w-7 h-7 text-red-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Cabecera de la Tienda */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <Coins className="w-3.5 h-3.5" />
            <span>Economía de Juego (RF-05)</span>
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-extrabold text-white">
            Bazar del Tiempo
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Canjea los tokens obtenidos con tus rachas de aciertos por vidas y ventajas épicas.
          </p>
        </div>

        {/* Saldo de Tokens y Vidas */}
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-3.5 rounded-3xl shadow-xl">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <Coins className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Tus Tokens</div>
              <div className="font-cinzel text-lg font-bold text-amber-300">{user.tokens} 🪙</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-red-500/10 border border-red-500/30">
            <Heart className="w-5 h-5 text-red-400 fill-red-500" />
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Tus Vidas</div>
              <div className="font-cinzel text-lg font-bold text-red-400">{user.vides} / 5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mascota en la Tienda */}
      <MascotBubble context="tienda" />

      {/* Notificación de Compra */}
      {purchaseFeedback && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 transition-all animate-in fade-in slide-in-from-top-2 ${
            purchaseFeedback.success
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              : 'bg-red-950/80 border-red-500/50 text-red-200'
          }`}
        >
          {purchaseFeedback.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span className="text-sm font-semibold">{purchaseFeedback.message}</span>
        </div>
      )}

      {/* Catálogo de Artículos */}
      <div>
        <h2 className="font-cinzel text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>Artículos y Vidas Disponibles</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICULOS_TIENDA.map((item) => {
            const canAfford = user.tokens >= item.precioTokens;
            const isFullLives = item.videsOtorgadas > 0 && user.vides >= 5;

            return (
              <div
                key={item.id}
                className={`relative rounded-3xl bg-slate-900/90 border p-6 flex flex-col justify-between transition-all duration-300 shadow-xl ${
                  item.popular
                    ? 'border-amber-400/80 ring-2 ring-amber-400/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[11px] shadow-md uppercase tracking-wider">
                    ★ Más Popular
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
                      {getItemIcon(item.icono)}
                    </div>
                    <div>
                      <h3 className="font-cinzel text-base font-bold text-white">
                        {item.nombre}
                      </h3>
                      {item.videsOtorgadas > 0 && (
                        <span className="text-xs font-bold text-red-400">
                          +{item.videsOtorgadas} {item.videsOtorgadas === 1 ? 'Vida' : 'Vidas'}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed min-h-[40px]">
                    {item.descripcion}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 font-cinzel text-lg font-bold text-amber-300">
                    <Coins className="w-4 h-4 text-amber-400" />
                    <span>{item.precioTokens}</span>
                  </div>

                  <button
                    onClick={() => handleBuy(item)}
                    disabled={!canAfford || isFullLives}
                    className={`py-2.5 px-5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-md active:scale-95 ${
                      isFullLives
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                        : canAfford
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    }`}
                  >
                    {isFullLives ? 'Vidas Llenas (5/5)' : canAfford ? 'Canjear' : 'Tokens insuficientes'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historial de Transacciones de la Tienda (RF-05 & schema.sql `transacciones_tienda`) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-400" />
            <h3 className="font-cinzel text-lg font-bold text-white">
              Historial de Transacciones (transacciones_tienda)
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {transactions.length} operaciones registradas
          </span>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            Aún no has realizado compras en la tienda.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 uppercase text-[10px] text-slate-400 font-semibold border-b border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Operación</th>
                  <th className="py-2.5 px-3">Tokens Gastados</th>
                  <th className="py-2.5 px-3">Vidas Obtenidas</th>
                  <th className="py-2.5 px-3">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {transactions.map((t) => (
                  <tr key={t.id_transaccion} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-3 font-semibold text-white">{t.tipo_operacion}</td>
                    <td className="py-2.5 px-3 text-amber-300 font-bold">-{t.tokens_gastados} 🪙</td>
                    <td className="py-2.5 px-3 text-red-400 font-bold">+{t.vides_obtenidas} ❤️</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono">{t.fecha_compra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
