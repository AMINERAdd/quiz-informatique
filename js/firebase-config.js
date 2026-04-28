// ==========================================
// FIREBASE CONFIG + CONSTANTES GLOBALES
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyAF7aaeksLKsjCBLhDzTDpJjfv8fapq8WM",
    authDomain: "excel-e3987.firebaseapp.com",
    projectId: "excel-e3987",
    storageBucket: "excel-e3987.firebasestorage.app",
    messagingSenderId: "916795973569",
    appId: "1:916795973569:web:4b51c831384f9d9c845940",
    measurementId: "G-Z8B1GNY2QK"
};

const APP_ID = "plickers-1apic-radouani-live";

const STUDENTS = Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Tilmid ${i + 1}`
}));

const DEFAULT_QUESTIONS = {
    word: [
        { q: "Inaho l-logiciel li machi dial traitement de texte ?", a: ["Microsoft Word", "Google Docs", "Microsoft Excel", "LibreOffice Writer"], c: 2 },
        { q: "Chnou smit l-barre li kayna l-fouq ga3 ?", a: ["Barre d'état", "Barre de titre", "Ruban", "Défilement"], c: 1 },
        { q: "Icône dial disquette chnou kat'3ni ?", a: ["Imprimer", "Enregistrer", "Ouvrir", "Copier"], c: 1 },
        { q: "Ctrl + A lach katslah ?", a: ["Annuler", "Sélectionner tout", "Agrandir", "Aligner"], c: 1 },
        { q: "Orientation 'Paysage' hiya :", a: ["Verticale", "Horizontale", "Carrée", "Inclinée"], c: 1 }
    ],
    excel: [
        { q: "Chnou l-khidma l-asliya dial Excel ?", a: ["Ktaba dial braat", "Hsabat w t'jadwil", "Diaporamas", "Internet"], c: 1 },
        { q: "Fichier Excel chnou smito ?", a: ["Document", "Classeur", "Présentation", "Image"], c: 1 },
        { q: "Les colonnes f Excel bach m'arfin ?", a: ["Chiffres", "Lettres (A, B...)", "Symboles", "Alwan"], c: 1 },
        { q: "Fin kat'tlaqa ligne m'a colonne ?", a: ["Carré", "Cellule", "Lien", "Bouton"], c: 1 },
        { q: "Adresse dial colonne C w ligne 4 ?", a: ["4C", "C-4", "C4", "CC4"], c: 2 }
    ],
    google: [
        { q: "Ina moteur de recherche l-ktar m'sta3mal ?", a: ["Bing", "Yahoo", "Google", "DuckDuckGo"], c: 2 },
        { q: "Service Google li fih stockaji ?", a: ["Gmail", "Google Drive", "Maps", "YouTube"], c: 1 },
        { q: "Smit l-IA dial Google l-jdida ?", a: ["Siri", "Alexa", "Gemini", "ChatGPT"], c: 2 },
        { q: "Bach t'fth onglet jdid f Chrome :", a: ["Ctrl + T", "Ctrl + N", "Ctrl + W", "Ctrl + P"], c: 0 },
        { q: "Stockaji l-fabor f Drive :", a: ["5 Go", "15 Go", "50 Go", "100 Go"], c: 1 }
    ]
};
