// ==========================================
// COMPOSANT: TeacherDashboard
// Vue live projetée en classe — contrôle questions + votes
// Props: session, responses, questions, updateCloud, resetVotes, setView
// ==========================================

// Sous-composant: LocalQR (utilisé dans PrintCardsView mais déclaré ici pour disponibilité globale)
const LocalQR = ({ text }) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
        if (!ref.current || !window.qrcode) return;
        const qr = qrcode(0, 'M');
        qr.addData(text);
        qr.make();
        ref.current.innerHTML = qr.createSvgTag({ scalable: true });
        const svg = ref.current.querySelector('svg');
        if (svg) { svg.style.width = '100%'; svg.style.height = '100%'; }
    }, [text]);
    return <div ref={ref} className="w-40 h-40" />;
};

const TeacherDashboard = ({ session, responses, questions, updateCloud, resetVotes, setView }) => {
    const q = questions[session.currentQ] || questions[0];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">

            {/* Header */}
            <header className="bg-white p-4 flex justify-between items-center border-b sticky top-0 z-20 shadow-sm">
                <button onClick={() => setView('menu')} className="font-black text-slate-400 text-xs">← MENU</button>
                <div className="font-black uppercase tracking-widest text-blue-600 italic">LIVE: {session.module}</div>
                <button onClick={resetVotes} className="bg-red-50 text-red-500 px-4 py-1 rounded-xl font-bold text-xs">RESET</button>
            </header>

            {/* Navigation questions + bouton réponse */}
            <div className="p-6 bg-white border-b flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
                <div className="flex items-center gap-4">
                    <button onClick={() => updateCloud({ currentQ: Math.max(0, session.currentQ - 1), showAnswers: false })}
                        className="p-4 bg-zinc-100 rounded-2xl border font-bold">◀</button>
                    <div className="text-center min-w-[150px]">
                        <span className="block text-[10px] font-black text-zinc-400 uppercase">Question</span>
                        <span className="text-4xl font-black">{session.currentQ + 1} / {questions.length}</span>
                    </div>
                    <button onClick={() => updateCloud({ currentQ: Math.min(questions.length - 1, session.currentQ + 1), showAnswers: false })}
                        className="p-4 bg-zinc-100 rounded-2xl border font-bold">▶</button>
                </div>
                <button onClick={() => updateCloud({ showAnswers: !session.showAnswers })}
                    className={`px-16 py-5 rounded-full font-black text-2xl shadow-2xl transition-all active:scale-95 ${session.showAnswers ? 'bg-slate-900 text-white' : 'bg-amber-500 text-white animate-pulse'}`}>
                    {session.showAnswers ? "MASQUER" : "VOIR LA RÉPONSE"}
                </button>
            </div>

            {/* Contenu principal */}
            <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-4 gap-8 overflow-hidden">

                {/* Question + Options */}
                <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-2 custom-scrollbar pb-20">
                    <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border-b-[16px] border-zinc-200 text-center">
                        <h3 className="text-3xl md:text-5xl font-black leading-tight text-slate-800">{q.q}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {q.a.map((ans, i) => (
                            <div key={i} className={`p-8 rounded-[2.5rem] border-4 flex items-center gap-8 transition-all duration-500 ${session.showAnswers && i === q.c ? 'bg-green-100 border-green-500 text-green-800 scale-[1.03] shadow-xl' : 'bg-white'}`}>
                                <span className={`w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] flex items-center justify-center text-4xl font-black ${session.showAnswers && i === q.c ? 'bg-green-600 text-white animate-bounce' : 'bg-slate-900 text-white'}`}>
                                    {"ABCD"[i]}
                                </span>
                                <span className="text-2xl md:text-3xl font-black">{ans}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Panel votes */}
                <div className="bg-white rounded-[3rem] shadow-2xl p-6 flex flex-col border-t-[12px] border-zinc-100 overflow-hidden">
                    <h4 className="text-2xl font-black text-zinc-900 mb-6 uppercase tracking-tighter italic">
                        VOTES ({Object.keys(responses).length})
                    </h4>
                    <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 pb-6 custom-scrollbar">
                        {STUDENTS.map(s => {
                            const res = responses[s.id];
                            const color = res
                                ? session.showAnswers
                                    ? res.answerIdx === q.c ? 'bg-green-500 text-white shadow-md border-green-600' : 'bg-red-400 text-white shadow-md border-red-500'
                                    : 'bg-blue-600 text-white animate-pulse shadow-lg'
                                : 'bg-slate-50 border-slate-100 text-slate-300';
                            return (
                                <div key={s.id} className={`p-4 rounded-3xl border-2 flex flex-col items-center justify-center transition-all duration-500 ${color}`}>
                                    <div className="flex items-center gap-1 mb-1">
                                        <span className="text-[8px] font-black opacity-50">#{s.id}</span>
                                        {res && <span className="px-2 py-0.5 rounded-lg font-black text-[10px] bg-white/20">{"ABCD"[res.answerIdx]}</span>}
                                    </div>
                                    <span className="font-black text-[10px] uppercase truncate w-full text-center leading-none">{s.name.split(' ')[1]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

