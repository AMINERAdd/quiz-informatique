      const AuthPage = () => {
            const [isSignUp, setIsSignUp] = useState(false);
            const [email, setEmail] = useState('');
            const [pass, setPass] = useState('');
            const [err, setErr] = useState('');

            const handleSubmit = (e) => {
                e.preventDefault();
                setErr("");
                if (isSignUp) {
                    firebase.auth().createUserWithEmailAndPassword(email, pass)
                        .catch(e => setErr(e.message));
                } else {
                    firebase.auth().signInWithEmailAndPassword(email, pass)
                        .catch(() => setErr("Email ou mot de passe incorrect!"));
                }
            };

            return (
                <div className="h-screen flex items-center justify-center p-6 bg-slate-900 font-sans">
                    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md border-b-[16px] border-blue-600">
                        <div className="text-center mb-8">
                           <h1 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">Admin Login</h1>
                           <p className="text-slate-400 font-bold uppercase text-xs tracking-widest mt-2">Accès Professeur</p>
                        </div>
                        <div className="space-y-4">
                            <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-blue-500 font-bold" required />
                            <input type="password" placeholder="Mot de passe" value={pass} onChange={e=>setPass(e.target.value)} className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-blue-500 font-bold" required />
                            {err && <p className="text-red-500 font-bold text-center text-sm">{err}</p>}
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-5 rounded-2xl font-black text-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
                                {isSignUp ? "S'INSCRIRE" : "SE CONNECTER"}
                            </button>
                            <div className="text-center mt-4">
                                <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-blue-600 font-bold text-sm underline decoration-blue-200">
                                    {isSignUp ? "J'ai déjà un compte (Login)" : "Pas de compte ? S'inscrire"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        };
