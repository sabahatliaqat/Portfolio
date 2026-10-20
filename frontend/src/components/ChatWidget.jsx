import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { askAI } from '../services/api';

const ChatWidget = ({ openChat, onChatOpened }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content:
                "Hi! I'm Sabahat's AI assistant. Ask me about her AI projects, RAG applications, Python, FastAPI, and data analytics experience!",
        },
    ]);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (openChat) {
            setIsOpen(true);
            onChatOpened?.();
        }
    }, [openChat, onChatOpened]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const suggestions = [
        "Tell me about Sabahat's HR chatbot",
        'Explain her RAG expertise',
        'Why hire Sabahat?',
    ];

    const handleSend = async (textToSend) => {
        const query = (textToSend ?? input).trim();

        if (!query || loading) {
            return;
        }

        const newMessages = [
            ...messages,
            {
                role: 'user',
                content: query,
            },
        ];

        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const historyPayload = messages.map((message) => ({
                role: message.role,
                content: message.content,
            }));

            const data = await askAI(query, historyPayload);

            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content:
                        data?.answer ??
                        'I received an empty response. Please try again.',
                },
            ]);
        } catch (error) {
            console.error('AI Error:', error);

            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content:
                        "Sorry, I couldn't connect to Sabahat's AI assistant. Please check that the backend is running and try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-dark font-bold shadow-lg shadow-primary/25 hover:bg-emerald-400 hover:scale-105 transition-all duration-200"
                >
                    <Bot size={22} />
                    <span>Chat with AI</span>

                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dark opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-dark" />
                    </span>
                </button>
            )}

            {isOpen && (
                <div className="w-[360px] max-w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[calc(100vh-3rem)] bg-card border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                    <div className="bg-dark/80 px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                                <Sparkles size={18} />
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-white leading-tight">
                                    Sabahat AI Assistant
                                </h3>

                                <p className="text-[11px] text-primary flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                                    Grounded on Resume &amp; Projects
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                            className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={
                                    'flex ' +
                                    (message.role === 'user'
                                        ? 'justify-end'
                                        : 'justify-start')
                                }
                            >
                                <div
                                    className={
                                        'max-w-[85%] text-xs md:text-sm p-3 rounded-xl leading-relaxed ' +
                                        (message.role === 'user'
                                            ? 'bg-primary text-dark font-medium rounded-br-none'
                                            : 'bg-dark/90 text-gray-200 border border-gray-800 rounded-bl-none shadow-sm')
                                    }
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-dark/90 text-gray-400 p-3 rounded-xl border border-gray-800 flex items-center gap-2 text-xs">
                                    <Loader2
                                        size={14}
                                        className="animate-spin text-primary"
                                    />
                                    <span>Thinking...</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length <= 2 && (
                        <div className="px-3 py-1.5 bg-dark/40 flex flex-wrap gap-1.5 border-t border-gray-800/60">
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => handleSend(suggestion)}
                                    disabled={loading}
                                    className="text-[10px] bg-card hover:border-primary/40 border border-gray-700 text-gray-300 px-2.5 py-1 rounded-full transition-colors disabled:opacity-50"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSend();
                        }}
                        className="p-3 bg-dark/80 border-t border-gray-800 flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Ask about my AI experience..."
                            aria-label="Ask the AI assistant"
                            className="flex-1 min-w-0 bg-card border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                        />

                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            aria-label="Send message"
                            className="p-2 bg-primary text-dark rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;