// ==========================================
// COMPOSANT: PrintCardsView
// Génère les cartes QR imprimables (A/B/C/D) pour chaque élève
// Props: setView(view)
// Dépend de: LocalQR (dashboard.js), STUDENTS (firebase-config.js)
// ==========================================
const PrintCardsView = ({ setView }) => (
    <div className="bg-white min-h-screen p-8 text-slate-900">
        <button onClick={() => setView('menu')}
            className="no-print mb-10 bg-black text-white px-10 py-4 rounded-2xl font-black shadow-xl uppercase active:scale-95 transition-all">
            ← Retour
        </button>

        <div className="max-w-[21cm] mx-auto space-y-12">
            {STUDENTS.map(s => (
                <div key={s.id} className="grid grid-cols-2 gap-6 page-break py-4">
                    {["A", "B", "C", "D"].map(L => (
                        <div key={L} className="border-[10px] border-black rounded-[4rem] p-10 flex flex-col items-center justify-between h-[13.5cm] bg-white relative">
                            <div className="text-9xl font-black leading-none">{L}</div>
                            <LocalQR text={`${s.id}-${L}`} />
                            <div className="text-center w-full border-t-4 border-black pt-6">
                                <div className="font-black text-3xl uppercase tracking-tighter">{s.name}</div>
                                <div className="text-sm font-bold text-slate-400 uppercase mt-2 italic tracking-widest">QUIZ MASTER 1APIC</div>
                            </div>
                            <div className="absolute top-8 right-8 font-black opacity-5 text-8xl select-none">{L}</div>
                        </div>
                    ))}
                </div>
            ))}
        </div>

        <div className="fixed bottom-8 right-8 no-print">
            <button onClick={() => window.print()}
                className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl animate-bounce">
                🖨️ IMPRIMER PDF
            </button>
        </div>
    </div>
);

