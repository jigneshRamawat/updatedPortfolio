export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
            <img 
              src="/favicon.png" 
              alt="JR" 
              className="w-20 h-20 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'inline'
              }}
            />
            <span className="font-display font-bold text-sm gradient-text-red hidden">JR</span>
          </div>
          <span className="font-mono text-xs text-white/20">JIGNESH RAMAWAT</span>
        </div>
        <p className="font-mono text-xs text-white/20">
          © 2025 — jigneshRamawat21</p>
        <p className="font-mono text-xs text-crimson-500/40 tracking-wider">
          MERN STACK DEVELOPER
        </p>
      </div>
    </footer>
  )
}