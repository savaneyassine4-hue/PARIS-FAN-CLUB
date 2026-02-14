
import React, { useState, useRef } from 'react';
import { Upload, Sparkles, Wand2, Download, RefreshCcw } from 'lucide-react';
import { editImageWithAI } from '../services/geminiService';

const AIEditor: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!sourceImage || !prompt) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await editImageWithAI(sourceImage, prompt);
      setResultImage(result);
    } catch (err: any) {
      setError("Désolé, une erreur est survenue lors de l'édition. Réessaye avec un autre prompt.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-psg-blue dark:text-blue-400 flex items-center justify-center gap-2">
          <Sparkles className="animate-pulse" />
          Studio Fan Art
        </h2>
        <p className="text-slate-500 text-sm mt-1">Édite tes photos aux couleurs du PSG grâce à l'IA</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
        {!sourceImage ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-psg-blue transition-colors group"
          >
            <Upload size={40} className="text-slate-300 dark:text-slate-600 group-hover:text-psg-blue mb-3" />
            <p className="text-slate-500 font-medium">Clique pour charger une photo</p>
            <p className="text-slate-400 text-xs mt-1">Prends un selfie avec ton maillot !</p>
          </div>
        ) : (
          <div className="relative group rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center min-h-[300px]">
            <img 
              src={resultImage || sourceImage} 
              alt="Preview" 
              className={`max-h-[400px] w-auto object-contain transition-opacity duration-500 ${loading ? 'opacity-50' : 'opacity-100'}`}
            />
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px]">
                <div className="w-12 h-12 border-4 border-psg-blue border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 font-bold text-psg-blue dark:text-blue-400 animate-pulse">L'IA travaille sur ta photo...</p>
              </div>
            )}
            {!loading && (
              <button 
                onClick={() => { setSourceImage(null); setResultImage(null); }}
                className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 p-2 rounded-full hover:bg-white dark:hover:bg-slate-700 shadow-md text-psg-red"
              >
                <RefreshCcw size={18} />
              </button>
            )}
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*" 
        />

        <div className="space-y-3">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Que veux-tu faire ?</label>
          <div className="flex gap-2">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ex: Ajoute un filtre PSG rétro / Mets moi devant le Parc des Princes"
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-psg-blue dark:text-white"
            />
            <button 
              disabled={!sourceImage || !prompt || loading}
              onClick={handleEdit}
              className="bg-psg-blue hover:bg-psg-blue/90 disabled:opacity-50 text-white p-2.5 rounded-lg transition-colors flex items-center justify-center min-w-[50px]"
            >
              <Wand2 size={20} />
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['Filtre PSG', 'Effet stade', 'Ambiance Ultra', 'Supprimer arrière-plan'].map(tag => (
              <button 
                key={tag}
                onClick={() => setPrompt(tag)}
                className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-3 py-1 rounded-full hover:bg-psg-blue hover:text-white transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>

          {error && <p className="text-xs text-psg-red font-medium text-center">{error}</p>}
        </div>

        {resultImage && (
          <a 
            href={resultImage} 
            download="psg-fan-art.png"
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
          >
            <Download size={20} />
            Télécharger mon Fan Art
          </a>
        )}
      </div>

      <div className="p-4 bg-psg-blue/10 dark:bg-blue-900/20 border border-psg-blue/20 rounded-xl">
        <p className="text-xs text-psg-blue dark:text-blue-300 leading-relaxed italic">
          "Utilise notre IA pour créer tes propres visuels. Partage-les ensuite dans le chat de la communauté !"
        </p>
      </div>
    </div>
  );
};

export default AIEditor;
