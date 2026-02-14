
import React, { useState } from 'react';
import { ShoppingCart, Smartphone, CreditCard, CheckCircle } from 'lucide-react';

const PRODUCTS = [
  { id: 'p1', name: 'Maillot Domicile 24/25', price: 45000, image: 'https://picsum.photos/400/400?random=10' },
  { id: 'p2', name: 'Echarpe Fan Club Abidjan', price: 5000, image: 'https://picsum.photos/400/400?random=11' },
  { id: 'p3', name: 'Gourde PSG Edition Limitée', price: 12000, image: 'https://picsum.photos/400/400?random=12' },
  { id: 'p4', name: 'Casquette Fan Club', price: 8000, image: 'https://picsum.photos/400/400?random=13' },
];

const Shop: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1);

  const total = cart.reduce((acc, id) => {
    const p = PRODUCTS.find(prod => prod.id === id);
    return acc + (p?.price || 0);
  }, 0);

  const handlePayment = () => {
    setPaymentStep(2);
    setTimeout(() => {
      setPaymentStep(3);
      setTimeout(() => {
        setCart([]);
        setShowCheckout(false);
        setPaymentStep(1);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-psg-blue dark:text-white uppercase">Boutique</h2>
        <button className="relative p-2 text-psg-blue dark:text-blue-400">
          <ShoppingCart />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-psg-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col">
            <div className="aspect-square">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-white line-clamp-2">{product.name}</h4>
                <p className="text-psg-blue dark:text-blue-400 font-black mt-1 text-sm">{product.price.toLocaleString()} FCFA</p>
              </div>
              <button 
                onClick={() => setCart([...cart, product.id])}
                className="w-full mt-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-psg-blue dark:text-blue-300 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-psg-blue hover:text-white transition-all"
              >
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-24 left-4 right-4 bg-psg-blue text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center animate-bounce-in">
          <div>
            <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Mon Panier</p>
            <p className="text-lg font-black">{total.toLocaleString()} FCFA</p>
          </div>
          <button 
            onClick={() => setShowCheckout(true)}
            className="bg-psg-red text-white px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform"
          >
            Commander
          </button>
        </div>
      )}

      {showCheckout && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl text-psg-blue dark:text-white uppercase tracking-tight">Paiement Sécurisé</h3>
                <button onClick={() => setShowCheckout(false)} className="text-slate-400 hover:text-psg-red">&times;</button>
              </div>

              {paymentStep === 1 ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Choisis ton moyen de paiement Mobile Money :</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Orange Money', 'MTN MoMo', 'Wave', 'Moov Money'].map(method => (
                      <button 
                        key={method}
                        onClick={handlePayment}
                        className="flex flex-col items-center gap-2 p-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl hover:border-psg-blue transition-all"
                      >
                        <Smartphone size={24} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 uppercase">{method}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-psg-blue/5 rounded-2xl border border-psg-blue/10">
                    <CreditCard size={20} className="text-psg-blue" />
                    <span className="text-xs font-medium text-psg-blue">Ou paiement par carte bancaire</span>
                  </div>
                </div>
              ) : paymentStep === 2 ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 border-4 border-psg-blue border-t-transparent rounded-full animate-spin"></div>
                  <p className="font-bold text-psg-blue dark:text-white animate-pulse">En attente de confirmation sur ton téléphone...</p>
                  <p className="text-[10px] text-slate-400">Ne ferme pas cette fenêtre</p>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-bounce">
                    <CheckCircle size={40} />
                  </div>
                  <h4 className="text-xl font-black text-slate-800 dark:text-white">Commande Validée !</h4>
                  <p className="text-sm text-slate-500">Un SMS de confirmation t'a été envoyé. Merci de soutenir le Fan Club.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
