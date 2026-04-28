// ==========================================
// COMPOSANT: CreateQuizView
// Formulaire de création de quiz personnalisé sauvegardé dans Firebase
// Props: onSave(quiz), onCancel()
// ==========================================
const CreateQuizView = ({ onSave, onCancel }) => {
    const [title, setTitle] = React.useState('');
    const [questions, setQuestions] = React.useState([{ q: '', a: ['', '', '', ''], c: 0 }]);

    const addQuestion = () => setQuestions([...questions, { q: '', a: ['', '', '', ''], c: 0 }]);

    const updateQ = (i, field, value) => {
        const next = [...questions];
        next[i][field] = value;
        setQuestions(next);
    };

    const updateA = (qi, ai, value) => {
        const next = [...questions];
        next[qi].a[ai] = value;
        setQuestions(next);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-6">
            <div className="max-w-4xl mx-auto w-full">

                <header className="flex justify-between items-center mb-8 border-b pb-4">
                    <h2 className="text-3xl font-black italic text-slate-900 uppercase tracking-tighter underline decoration-blue-500">Creer Quiz</h2>
                    <button onClick={onCancel} className="bg-red-50 text-red-500 px-6 py-2 rounded-xl font-bold">ANNULER</button>
                </header>

                {/* Titre */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border mb-8">
                    <input type="text" placeholder="Smit l-Quiz dyalk..."
                        value={title} onChange={e => setTitle(e.target.value)}
                        className="w-full text-2xl font-black p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-blue-500" />
                </div>

                {/* Questions */}
                <div className="space-y-8">
                    {questions.map((q, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-lg border relative">
                            <span className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-black text-xl shadow-lg">
                                {idx + 1}
                            </span>
                            <input type="text" placeholder="Ektab soal hna..."
                                value={q.q} onChange={e => updateQ(idx, 'q', e.target.value)}
                                className="w-full p-4 mb-6 bg-slate-50 border rounded-xl font-bold text-lg" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {q.a.map((ans, aidx) => (
                                    <div key={aidx} className="flex items-center gap-3">
                                        <button onClick={() => updateQ(idx, 'c', aidx)}
                                            className={`w-12 h-12 rounded-xl font-black transition-all ${q.c === aidx ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
                                            {"ABCD"[aidx]}
                                        </button>
                                        <input type="text" placeholder={`Option ${"ABCD"[aidx]}`}
                                            value={ans} onChange={e => updateA(idx, aidx, e.target.value)}
                                            className="flex-1 p-3 bg-slate-50 border rounded-xl text-sm" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="mt-10 mb-20 flex gap-4">
                    <button onClick={addQuestion}
                        className="flex-1 p-5 bg-white border-4 border-dashed border-slate-200 text-slate-400 rounded-[2rem] font-black hover:border-blue-400 transition-all">
                        + ZID SOAL
                    </button>
                    <button onClick={() => onSave({ title, questions, id: 'custom_' + Date.now() })}
                        className="flex-1 p-5 bg-blue-600 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-blue-200 active:scale-95 transition-all uppercase">
                        Enregistrer l-Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

