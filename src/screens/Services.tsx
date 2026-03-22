export const ReceiptScreen: React.FC<{ navigate: (s: Screen) => void }> = ({ navigate }) => (
  <div className="min-h-screen bg-orange-500 flex flex-col items-center justify-center p-6">
    <div className="bg-white w-full rounded-3xl p-8 shadow-2xl relative">
      {/* Cercle décoratif pour l'effet de ticket */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div className="text-center mt-6 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Transfert réussi !</h2>
        <p className="text-gray-400 text-sm">ID: #GT-8829310</p>
      </div>

      <div className="border-t border-dashed border-gray-200 py-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Destinataire</span>
          <span className="font-bold text-slate-800">Marie Louise</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Service</span>
          <span className="font-bold text-slate-800">MonCash</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Montant</span>
          <span className="font-bold text-slate-800">150.00 USD</span>
        </div>
        <div className="flex justify-between text-lg border-t pt-4">
          <span className="font-bold text-slate-800">Total payé</span>
          <span className="font-bold text-orange-500">160.00 USD</span>
        </div>
      </div>

      <button
        onClick={() => navigate(Screen.DASHBOARD)}
        className="w-full mt-8 py-4 bg-slate-900 text-white rounded-xl font-bold"
      >
        Retour à l'accueil
      </button>
    </div>

    <button className="mt-8 text-white font-medium opacity-80 hover:opacity-100 flex items-center gap-2">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Télécharger le reçu (PDF)
    </button>
  </div>
);
