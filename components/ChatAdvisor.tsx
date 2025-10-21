'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatState {
  step: number;
  userInfo: {
    name?: string;
    debtAmount?: number;
    income?: number;
    creditScore?: number;
    debtType?: string;
    employment?: string;
    urgency?: string;
  };
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi! I'm your AI Debt Advisor. I'll help you understand your debt relief options. To get started, could you tell me your name?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const chatFlow = [
  { question: "What's your name?", field: 'name', type: 'text' },
  { question: "What's your total debt amount?", field: 'debtAmount', type: 'number', prefix: '$' },
  { question: "What's your monthly income?", field: 'income', type: 'number', prefix: '$' },
  { question: "What's your credit score? (approximate)", field: 'creditScore', type: 'number' },
  { question: "What's your primary type of debt?", field: 'debtType', type: 'select', options: ['Credit Cards', 'Personal Loans', 'Medical Debt', 'Student Loans', 'Other'] },
  { question: "What's your employment status?", field: 'employment', type: 'select', options: ['Full-time', 'Part-time', 'Self-employed', 'Unemployed', 'Retired'] },
  { question: "How urgent is your debt situation?", field: 'urgency', type: 'select', options: ['Very urgent - facing collection', 'Somewhat urgent - high interest', 'Not urgent - manageable payments'] }
];

export default function ChatAdvisor() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [chatState, setChatState] = useState<ChatState>({ step: 0, userInfo: {} });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateRecommendation = (info: ChatState['userInfo']) => {
    const { debtAmount = 0, income = 0, creditScore = 0, urgency } = info;

    let recommendation = '';
    let options = [];

    const debtToIncomeRatio = debtAmount / (income * 12);

    if (debtToIncomeRatio > 0.5 || creditScore < 600 || urgency === 'Very urgent - facing collection') {
      recommendation = 'Based on your situation, debt settlement appears to be your best option.';
      options = [
        'Debt Settlement: Negotiate lump-sum payments for 40-70% of your debt',
        'Consider bankruptcy if settlement isn\'t feasible',
        'Focus on debt consolidation as a bridge solution'
      ];
    } else if (debtToIncomeRatio > 0.3 || creditScore < 700) {
      recommendation = 'You may qualify for debt consolidation or settlement programs.';
      options = [
        'Debt Consolidation: Combine debts at lower interest rates',
        'Debt Settlement: Negotiate reduced payments',
        'Balance transfer to 0% APR cards if available'
      ];
    } else {
      recommendation = 'You have several good options available.';
      options = [
        'Debt Consolidation: Lower monthly payments',
        'Balance Transfer: Take advantage of promotional rates',
        'Debt Management Plan: Structured repayment program'
      ];
    }

    return { recommendation, options };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Process user input
    const currentStep = chatFlow[chatState.step];
    if (currentStep) {
      const value = currentStep.type === 'number' ? parseFloat(inputValue.replace(/[$,]/g, '')) : inputValue;
      setChatState(prev => ({
        ...prev,
        userInfo: { ...prev.userInfo, [currentStep.field]: value },
        step: prev.step + 1
      }));

      // Simulate typing delay
      setTimeout(() => {
        const nextStep = chatFlow[chatState.step + 1];
        let botResponse = '';

        if (nextStep) {
          botResponse = nextStep.question;
        } else {
          // Generate final recommendation
          const { recommendation, options } = generateRecommendation({ ...chatState.userInfo, [currentStep.field]: value });
          botResponse = `${recommendation}\n\nHere are your recommended options:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}\n\nWould you like to speak with a human advisor for personalized guidance?`;
        }

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages(initialMessages);
    setChatState({ step: 0, userInfo: {} });
    setInputValue('');
    setIsTyping(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">AI Debt Advisor</h2>
          <p className="text-blue-100 text-sm">Get personalized debt relief guidance</p>
        </div>
        <button
          onClick={resetChat}
          className="text-blue-100 hover:text-white text-sm underline"
        >
          Start Over
        </button>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-line">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}