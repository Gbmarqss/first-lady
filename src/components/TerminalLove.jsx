import { useState, useRef, useEffect } from 'react';

export function TerminalLove() {
  const [history, setHistory] = useState([
    { type: 'output', content: 'Bem-vindo ao MelzudinOS v1.0' },
    { type: 'output', content: 'Digite "help" para ver os comandos disponíveis.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.parentElement.scrollTo({
        top: bottomRef.current.parentElement.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [history]);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let response = '';

    switch (cleanCmd) {
      case 'help':
        response = 'Comandos disponíveis: help, data, quem é você, te amo, sudo make me a sandwich, beijo, advogata';
        break;
      case 'te amo':
        response = '❤️ Erro Crítico: Amor excede a capacidade de memória do sistema! (Stack Overflow de Carinho)';
        break;
      case 'data':
        response = 'Calculando... O tempo de namoro é irrelevante, pois meu amor por você é atemporal. (Mas olhe o contador lá em cima!)';
        break;
      case 'sudo make me a sandwich':
        response = '🔒 Permissão negada: O usuário "Melzudin" não tem privilégios de root sobre a Advogata. Tente pedir "por favor" (ou traga chocolate).';
        break;
      case 'beijo':
        response = 'Muah! 💋 Enviando beijo via protocolo TCP/IP...';
        break;
      case 'advogata':
        response = '👩‍⚖️ Veredito: A mais linda, competente e cheirosa de todo o tribunal (e do mundo). Causa ganha!';
        break;
      case 'quem é você':
        response = 'Sou uma manifestação digital do amor do Gabriel por você.';
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        return;
      default:
        response = `Comando não encontrado: "${cmd}". Digite "help" para ajuda.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', content: cmd },
      { type: 'output', content: response }
    ]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="w-full flex justify-center px-4 pt-8 pb-10" onClick={() => inputRef.current?.focus()}>
      <div className="max-w-xl mx-auto bg-[#1e1e1e] rounded-lg shadow-2xl border border-black/30 font-mono overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-700/50 p-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-400 ml-2">melzudin@coracao:~</span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 h-80 overflow-y-auto text-sm text-left">
          {history.map((line, i) => (
            <div key={i} className="mb-2">
              {line.type === 'command' ? (
                <div className="flex items-center gap-2 text-cyan-400">
                  <span>$</span>
                  <span className="text-white">{line.content}</span>
                </div>
              ) : (
                <div className="text-gray-300 whitespace-pre-wrap ml-4 mb-2">
                  {line.content}
                </div>
              )}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white flex-1 focus:ring-0"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck="false"
            />
            <span className="animate-pulse bg-gray-500 w-2 h-4 inline-block -ml-1"></span>
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
