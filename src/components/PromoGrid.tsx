import { ExternalLink } from 'lucide-react';

export default function PromoGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Tool 1: YouTube Thumbnail Downloader */}
      <a 
        href="https://eztoolbox.xyz" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group p-5 md:p-6 bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/85 rounded-3xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.01)] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:scale-[1.025] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between text-left"
        id="promo-yt-downloader"
      >
        <div>
          <div className="w-9 h-9 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl mb-4 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-extrabold text-xs font-mono border border-emerald-100/10">YT</div>
          <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-500 transition-colors mb-1.5 font-display">YT Downloader</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Download YouTube thumbnails in full HD 1080p free.</p>
        </div>
        <div className="mt-4 text-[10px] font-bold tracking-wider font-mono text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase">
          <span>Launch YT</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </a>

      {/* Tool 2: Image to PDF Converter */}
      <a 
        href="https://pdf.eztoolbox.xyz" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group p-5 md:p-6 bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/85 rounded-3xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.01)] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:scale-[1.025] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between text-left"
        id="promo-img-pdf"
      >
        <div>
          <div className="w-9 h-9 bg-red-50 dark:bg-red-950/40 rounded-xl mb-4 flex items-center justify-center text-red-600 dark:text-red-400 font-extrabold text-xs font-mono border border-red-100/10">PDF</div>
          <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-500 transition-colors mb-1.5 font-display">Image to PDF</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Convert multiple images into a single high-quality PDF.</p>
        </div>
        <div className="mt-4 text-[10px] font-bold tracking-wider font-mono text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase">
          <span>Launch PDF</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </a>

      {/* Tool 3: Secure Password Generator */}
      <a 
        href="https://password.eztoolbox.xyz" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group p-5 md:p-6 bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/85 rounded-3xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.01)] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:scale-[1.025] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between text-left"
        id="promo-secure-pw"
      >
        <div>
          <div className="w-9 h-9 bg-blue-50 dark:bg-blue-950/40 rounded-xl mb-4 flex items-center justify-center text-blue-600 dark:text-blue-400 font-extrabold text-xs font-mono border border-blue-100/10">PW</div>
          <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-500 transition-colors mb-1.5 font-display">Safe Passwords</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Create strong, unhackable passwords for accounts.</p>
        </div>
        <div className="mt-4 text-[10px] font-bold tracking-wider font-mono text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase">
          <span>Launch Pass</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </a>

      {/* Tool 4: Image Size Compressor */}
      <a 
        href="https://compressor.eztoolbox.xyz" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group p-5 md:p-6 bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/85 rounded-3xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.01)] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:scale-[1.025] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between text-left"
        id="promo-size-reducer"
      >
        <div>
          <div className="w-9 h-9 bg-amber-50 dark:bg-amber-950/40 rounded-xl mb-4 flex items-center justify-center text-amber-600 dark:text-amber-400 font-extrabold text-xs font-mono border border-amber-100/10">ZIP</div>
          <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-500 transition-colors mb-1.5 font-display">Size Reducer</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Reduce image file size without losing quality.</p>
        </div>
        <div className="mt-4 text-[10px] font-bold tracking-wider font-mono text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase">
          <span>Launch Comp</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </a>

      {/* Tool 5: Word & Character Counter */}
      <a 
        href="https://counter.eztoolbox.xyz" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group p-5 md:p-6 bg-white dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/85 rounded-3xl shadow-[0_2px_15px_-5px_rgba(0,0,0,0.01)] hover:border-emerald-500/40 dark:hover:border-emerald-500/30 hover:scale-[1.025] hover:shadow-[0_12px_30px_-5px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between text-left"
        id="promo-word-counter"
      >
        <div>
          <div className="w-9 h-9 bg-purple-50 dark:bg-purple-950/40 rounded-xl mb-4 flex items-center justify-center text-purple-600 dark:text-purple-400 font-extrabold text-xs font-mono border border-purple-100/10">W+</div>
          <div className="text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-tight group-hover:text-emerald-500 transition-colors mb-1.5 font-display">Word Counter</div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Real-time word and character counting for writers.</p>
        </div>
        <div className="mt-4 text-[10px] font-bold tracking-wider font-mono text-slate-400 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase">
          <span>Launch Count</span>
          <ExternalLink className="h-3 w-3" />
        </div>
      </a>
    </div>
  );
}
