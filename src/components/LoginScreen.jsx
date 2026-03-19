import { useState } from 'react';

export function LoginScreen({ onLoginSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '2211') {
      setError(false);
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="w-full max-w-sm mx-auto text-center">
        <h1 className="text-3xl font-bold text-yellow-400 font-mono mb-4">Acesso Restrito</h1>
        <p className="text-gray-300 mb-6">Qual a data que marcou o início de tudo?</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            pattern="\d*"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 bg-gray-800 border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white text-center font-mono focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            placeholder="DDMM"
          />
          {error && <p className="text-red-500 mt-2">Senha incorreta. Tente novamente.</p>}
          <button type="submit" className="w-full bg-yellow-500 text-gray-900 font-bold py-3 mt-4 rounded-lg hover:bg-yellow-600 transition-colors">
            Desbloquear
          </button>
        </form>
      </div>
    </div>
  );
}
