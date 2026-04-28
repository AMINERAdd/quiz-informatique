// ==========================================
// COMPOSANT: ScannerViewComp
// Caméra temps réel pour scanner les cartes QR des élèves
// Props: submitVote(studentId, answerIdx), setView(view)
// ==========================================
const ScannerViewComp = ({ submitVote, setView }) => {
    const [last, setLast] = React.useState(null);

    React.useEffect(() => {
        const scanner = new Html5Qrcode("reader");
        scanner.start(
            { facingMode: "environment" },
            { fps: 20, qrbox: 250 },
            (text) => {
                // Format attendu: "studentId-LETTRE"  ex: "12-B"
                const parts = text.split('-');
                if (parts.length === 2) {
                    const [sId, char] = parts;
                    const idx = "ABCD".indexOf(char);
                    if (idx !== -1) {
                        submitVote(sId, idx);
                        setLast(`Tilmid ${sId} : ${char} ✅`);
                        if (navigator.vibrate) navigator.vibrate(50);
                    }
                }
            }
        ).catch(console.error);

        return () => { if (scanner.isScanning) scanner.stop(); };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <header className="p-4 flex justify-between bg-zinc-900 border-b border-white/10">
                <button onClick={() => setView('menu')} className="font-bold text-blue-400">← MENU</button>
                <h2 className="font-black italic uppercase">SCAN LIVE</h2>
                <div className="w-10"></div>
            </header>

            <div id="reader" className="flex-1"></div>

            {last && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-500 px-8 py-4 rounded-full font-black text-xl animate-bounce shadow-2xl z-50">
                    {last}
                </div>
            )}
        </div>
    );
};

