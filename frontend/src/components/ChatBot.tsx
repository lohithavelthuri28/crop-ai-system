import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export function ChatBot() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'chatbot.welcome',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const responseKey = getBotResponse(userMessage.text);
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: responseKey,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const getBotResponse = (input: string): string => {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) return 'chatbot.responses.greeting';
        if (lowerInput.includes('crop') || lowerInput.includes('suggest')) return 'chatbot.responses.crop';
        if (lowerInput.includes('weather') || lowerInput.includes('rain')) return 'chatbot.responses.weather';
        return 'chatbot.responses.default';
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isTyping, isOpen]);

    return (
        <>
            {/* Floating Action Button - Bottom Left */}
            <Button
                onClick={toggleChat}
                className={cn(
                    "fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
                    isOpen
                        ? "bg-red-500 hover:bg-red-600 rotate-90"
                        : "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 animate-bounce"
                )}
                size="icon"
            >
                {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
            </Button>

            {/* Chat Window - Bottom Left */}
            {isOpen && (
                <Card className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 shadow-2xl border-2 border-green-100 dark:border-zinc-800 animate-in slide-in-from-bottom-5 fade-in duration-300 flex flex-col overflow-hidden rounded-xl">
                    <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4">
                        <div className="flex items-center gap-2">
                            <Bot className="h-6 w-6 text-white" />
                            <CardTitle className="text-lg font-bold text-white">{t('chatbot.title')}</CardTitle>
                        </div>
                    </CardHeader>

                    <div className="flex-1 bg-slate-50 dark:bg-zinc-950 h-96 overflow-hidden relative">
                        <ScrollArea className="h-full w-full p-4" ref={scrollAreaRef}>
                            <div className="space-y-4 pb-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "flex w-full items-start gap-2",
                                            msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                                        )}
                                    >
                                        <div className={cn(
                                            "rounded-full p-2 h-8 w-8 flex items-center justify-center shrink-0 border shadow-sm",
                                            msg.sender === 'user' ? "bg-blue-100 dark:bg-blue-900/30 border-blue-200" : "bg-green-100 dark:bg-green-900/30 border-green-200"
                                        )}>
                                            {msg.sender === 'user' ? <User className="h-4 w-4 text-blue-600" /> : <Bot className="h-4 w-4 text-green-600" />}
                                        </div>
                                        <div
                                            className={cn(
                                                "rounded-2xl px-4 py-2 text-sm max-w-[75%] shadow-sm",
                                                msg.sender === 'user'
                                                    ? "bg-blue-600 text-white rounded-tr-none"
                                                    : "bg-white dark:bg-zinc-800 border rounded-tl-none"
                                            )}
                                        >
                                            {msg.text.startsWith('chatbot.') ? t(msg.text) : msg.text}
                                        </div>
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex w-full items-start gap-2">
                                        <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2 h-8 w-8 flex items-center justify-center shrink-0 border border-green-200">
                                            <Bot className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div className="bg-white dark:bg-zinc-800 border shadow-sm rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center h-10 w-16">
                                            <div className="flex gap-1 justify-center w-full">
                                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>

                    <CardFooter className="p-3 bg-white dark:bg-zinc-900 border-t">
                        <form onSubmit={handleSendMessage} className="flex w-full gap-2 items-center">
                            <Input
                                placeholder={t('chatbot.placeholder')}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1 focus-visible:ring-green-500"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!inputValue.trim() || isTyping}
                                className="bg-green-600 hover:bg-green-700 text-white shrink-0"
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
