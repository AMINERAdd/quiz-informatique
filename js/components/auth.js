// ==========================================
// COMPOSANT: AuthPage
// Login / Signup de l'enseignant via Firebase Auth
// ==========================================
const AuthPage = () => {
    const [isSignUp, setIsSignUp] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    const [err, setErr] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr("");
        if (isSignUp) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, pass)
                .catch(e => setErr(e.message));
        } else {
            firebase.auth()
                .signInWithEmailAndPassword(email, pass)
                .catch(() => setErr("Email aw mot de passe ghalat!"));
        }
    };

    return (
        <div className="h-screen flex items-center justify-center p-6 bg-slate-900">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-2xl w-full max-w-md border-b-[16px] border-blue-600">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black italic uppercase text-slate-900">
                        {isSignUp ? "Sign Up" : "Admin Login"}
                    </h1>
                    <p className="text-slate-400 font-bold uppercase text-xs mt-2">
                        {isSignUp ? "Dir compte jdid" : "Khass l-ustad i'dkhol"}
                    </p>
                </div>
                <div className="space-y-4">
                    <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-blue-500 font-bold" required />
                    <input type="password" placeholder="Mot de passe" value={pass} onChange={e => setPass(e.target.value)}
                        className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-blue-500 font-bold" required />
                    {err && <p className="text-red-500 font-bold text-center text-sm">{err}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black text-xl shadow-lg active:scale-95 transition-all uppercase">
                        D'khoul
                    </button>
                    <button type="button" onClick={() => setIsSignUp(!isSignUp)}
                        className="w-full text-blue-600 font-bold text-sm underline mt-4 uppercase tracking-tighter">
                        {isSignUp ? "3ndi compte" : "Ma'ndich compte ? T'sajal"}
                    </button>
                </div>
            </form>
        </div>
    );
};
