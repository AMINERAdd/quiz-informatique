// ==========================================
// COMPOSANT: App — Racine de l'application
// Gère: état global, Firebase listeners, routing entre vues
// Vues: 'menu' | 'teacher' | 'scanner' | 'print' | 'create'
// ==========================================
function App() {
    const [user, setUser]               = React.useState(null);
    const [view, setView]               = React.useState('menu');
    const [session, setSession]         = React.useState({ currentQ: 0, showAnswers: false, module: 'excel' });
    const [responses, setResponses]     = React.useState({});
    const [customQuizzes, setCustomQuizzes] = React.useState([]);
    const [loading, setLoading]         = React.useState(true);
    const fireDB                        = React.useRef(null);

    // ── Init Firebase + listeners temps réel ──
    React.useEffect(() => {
        const init = async () => {
            if (!window.firebase) { setTimeout(init, 200); return; }
            try {
                if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
                const db   = firebase.firestore();
                const auth = firebase.auth();
                fireDB.current = db;

                auth.onAuthStateChanged(u => {
                    setUser(u);
                    if (u) {
                        // Session (module actif, question, showAnswers)
                        db.doc(`artifacts/${APP_ID}/public/data/config/session`)
                            .onSnapshot(snap => {
                                if (snap.exists) setSession(snap.data());
                                else db.doc(`artifacts/${APP_ID}/public/data/config/session`)
                                    .set({ currentQ: 0, showAnswers: false, module: 'excel' });
                            });

                        // Réponses élèves
                        db.collection(`artifacts/${APP_ID}/public/data/responses`)
                            .onSnapshot(snap => {
                                const d = {};
                                snap.forEach(doc => d[doc.id] = doc.data());
                                setResponses(d);
                            });

                        // Quiz personnalisés de l'utilisateur
                        db.collection(`artifacts/${APP_ID}/users/${u.uid}/quizzes`)
                            .onSnapshot(snap => {
                                const d = [];
                                snap.forEach(doc => d.push(doc.data()));
                                setCustomQuizzes(d);
                            });
                    }
                    setLoading(false);
                });
            } catch (e) { console.error(e); setLoading(false); }
        };
        init();
    }, []);

    // ── Actions Firebase ──

    /** Met à jour la session dans Firestore */
    const updateCloud = async (update) => {
        if (fireDB.current && user)
            await fireDB.current.doc(`artifacts/${APP_ID}/public/data/config/session`).set(update, { merge: true });
    };

    /** Enregistre la réponse d'un élève */
    const submitVote = async (studentId, answerIdx) => {
        if (fireDB.current && user)
            await fireDB.current.doc(`artifacts/${APP_ID}/public/data/responses/${studentId}`).set({ answerIdx, t: Date.now() });
    };

    /** Réinitialise tous les votes */
    const resetVotes = async () => {
        if (!fireDB.current || !user) return;
        await updateCloud({ showAnswers: false });
        const snap  = await fireDB.current.collection(`artifacts/${APP_ID}/public/data/responses`).get();
        const batch = fireDB.current.batch();
        snap.forEach(doc => batch.delete(doc.ref));
        await batch.commit();
    };

    /** Sauvegarde un quiz personnalisé */
    const saveCustomQuiz = async (quiz) => {
        if (fireDB.current && user) {
            await fireDB.current.doc(`artifacts/${APP_ID}/users/${user.uid}/quizzes/${quiz.id}`).set(quiz);
            setView('menu');
        }
    };

    /** Retourne les questions du module actif */
    const getQuestions = () => {
        if (DEFAULT_QUESTIONS[session.module]) return DEFAULT_QUESTIONS[session.module];
        const found = customQuizzes.find(q => q.id === session.module);
        return found ? found.questions : DEFAULT_QUESTIONS.word;
    };

    // ── États spéciaux ──
    if (loading) return (
        <div className="h-screen flex flex-col items-center justify-center bg-slate-900 text-white font-black animate-pulse uppercase tracking-widest">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            Initialisation...
        </div>
    );

    if (!user) return <AuthPage />;

    // ── Routing ──
    switch (view) {
        case 'teacher':
            return <TeacherDashboard session={session} responses={responses} questions={getQuestions()} updateCloud={updateCloud} resetVotes={resetVotes} setView={setView} />;
        case 'scanner':
            return <ScannerViewComp submitVote={submitVote} setView={setView} />;
        case 'print':
            return <PrintCardsView setView={setView} />;
        case 'create':
            return <CreateQuizView onSave={saveCustomQuiz} onCancel={() => setView('menu')} />;

        // ── Menu principal ──
        default: return (
            <div className="min-h-screen flex flex-col bg-slate-50">
                <nav className="p-4 bg-white shadow-sm flex justify-between items-center border-b">
                    <span className="font-black italic text-blue-600 uppercase tracking-tighter">Prof. Radouani</span>
                    <button onClick={() => firebase.auth().signOut()}
                        className="text-xs font-bold bg-red-50 text-red-500 px-4 py-1.5 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                        DECONNEXION
                    </button>
                </nav>

                <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
                    {/* Logo */}
                    <div className="text-center">
                        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-slate-900 uppercase leading-none">
                            PLICKERS<span className="text-blue-600">.</span>
                        </h1>
                        <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-sm mt-4">
                            Système d'évaluation Live 1APIC
                        </p>
                    </div>

                    {/* Sélecteur de module */}
                    <div className="bg-white p-3 rounded-[2.5rem] shadow-xl border w-full max-w-5xl overflow-x-auto custom-scrollbar">
                        <div className="flex justify-center gap-3 min-w-max px-4">
                            {[
                                { key: 'word',  label: 'WORD',   color: 'bg-blue-600' },
                                { key: 'excel', label: 'EXCEL',  color: 'bg-green-600' },
                                { key: 'google',label: 'GOOGLE', color: 'bg-amber-500' },
                            ].map(m => (
                                <button key={m.key}
                                    onClick={() => updateCloud({ module: m.key, currentQ: 0, showAnswers: false })}
                                    className={`px-6 py-2 rounded-2xl font-black transition-all ${session.module === m.key ? `${m.color} text-white shadow-lg` : 'text-slate-400 bg-slate-50'}`}>
                                    {m.label}
                                </button>
                            ))}
                            {customQuizzes.map(q => (
                                <button key={q.id}
                                    onClick={() => updateCloud({ module: q.id, currentQ: 0, showAnswers: false })}
                                    className={`px-6 py-2 rounded-2xl font-black transition-all ${session.module === q.id ? 'bg-purple-600 text-white shadow-lg' : 'text-purple-400 bg-purple-50'}`}>
                                    {q.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Boutons de navigation */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
                        {[
                            { view: 'teacher', icon: '📊', label: 'DASHBOARD', border: 'border-blue-600',   bg: 'bg-white', text: '' },
                            { view: 'scanner', icon: '📸', label: 'SCANNER',   border: 'border-green-500',  bg: 'bg-white', text: '' },
                            { view: 'print',   icon: '🖨️', label: 'CARTES QR', border: 'border-purple-500', bg: 'bg-white', text: '' },
                            { view: 'create',  icon: '✨', label: 'CREER QUIZ',border: 'border-amber-500',  bg: 'bg-slate-800', text: 'text-white' },
                        ].map(btn => (
                            <button key={btn.view} onClick={() => setView(btn.view)}
                                className={`${btn.bg} ${btn.text} p-8 rounded-[2.5rem] shadow-lg border-b-[12px] ${btn.border} hover:-translate-y-2 transition-all font-black text-center group`}>
                                <span className="block text-4xl mb-3 group-hover:scale-110 transition-transform">{btn.icon}</span>
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

// ── Montage React ──
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

