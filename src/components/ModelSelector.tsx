'use client'

import { useState } from 'react'
import { useStore } from '@/store'
import { ChevronDown, Sparkles } from 'lucide-react'

interface ModelInfo {
  id: string
  name: string
  provider: string
  description: string
  context: string
}

const MODELS: ModelInfo[] = [
  // ── NVIDIA NIM Models ──
  {
    id: 'nvidia/nemotron-4-340b-instruct',
    name: 'Nemotron 4 340B',
    provider: 'NVIDIA',
    description: 'Reliable workhorse',
    context: '128K'
  },
  {
    id: 'nvidia/nemotron-3-ultra-550b-a55b',
    name: 'Nemotron 3 Ultra',
    provider: 'NVIDIA',
    description: 'Heavy reasoning model',
    context: '262K'
  },
  {
    id: 'meta/llama3-70b-instruct',
    name: 'Llama 3 70B',
    provider: 'Meta',
    description: 'Fast model',
    context: '128K'
  },
  {
    id: 'google/gemma-7b-it',
    name: 'Gemma 7B IT',
    provider: 'Google',
    description: 'Fast model',
    context: '8K'
  },
  {
    id: 'mistralai/mixtral-8x22b-instruct-v0.1',
    name: 'Mixtral 8x22B',
    provider: 'Mistral',
    description: 'Heavy reasoning',
    context: '64K'
  },
  {
    id: 'deepseek-ai/deepseek-v4-pro',
    name: 'DeepSeek V4 Pro',
    provider: 'DeepSeek',
    description: 'Advanced reasoning',
    context: '128K'
  },
  {
    id: 'minimaxai/minimax-m3',
    name: 'MiniMax M3',
    provider: 'MiniMax',
    description: 'Flagship model',
    context: '128K'
  },
  {
    id: 'deepseek-ai/deepseek-v4-flash',
    name: 'DeepSeek V4 Flash',
    provider: 'DeepSeek',
    description: 'Fast and capable',
    context: '128K'
  },
  {
    id: 'minimaxai/minimax-m2.7',
    name: 'MiniMax M2.7',
    provider: 'MiniMax',
    description: 'Strong coding',
    context: '128K'
  },
  {
    id: 'mistralai/mistral-medium-3.5-128b',
    name: 'Mistral Medium 3.5',
    provider: 'Mistral',
    description: 'Balanced model',
    context: '128K'
  },
  {
    id: 'google/gemma-4-31b-it',
    name: 'Gemma 4 31B',
    provider: 'Google',
    description: 'Strong open model',
    context: '128K'
  },
  {
    id: 'qwen/qwen3.5-122b-a10b',
    name: 'Qwen 3.5 122B',
    provider: 'Qwen',
    description: 'High performance MoE',
    context: '128K'
  },
  {
    id: 'qwen/qwen3.5-397b-a17b',
    name: 'Qwen 3.5 397B',
    provider: 'Qwen',
    description: 'Massive MoE',
    context: '128K'
  },
  {
    id: 'mistralai/mistral-large-3-675b-instruct-2512',
    name: 'Mistral Large 3',
    provider: 'Mistral',
    description: '675B MoE, flagship',
    context: '262K'
  },
  {
    id: 'openai/gpt-oss-120b',
    name: 'GPT-OSS 120B',
    provider: 'OpenAI',
    description: 'Open-weight MoE',
    context: '131K'
  }
]

export function ModelSelector() {
  const { defaultModel, setDefaultModel } = useStore()
  const [isOpen, setIsOpen] = useState(false)

  const activeModel = MODELS.find(m => m.id === defaultModel) || MODELS[0]

  return (
    <div className="relative">
      <label className="text-xs theme-secondary mb-1 block">Model</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2
          bg-theme-bg border border-theme-primary rounded-lg
          hover:glow-box transition-all text-sm"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span className="truncate">{activeModel.name}</span>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute top-full left-0 right-0 mt-1 z-20
            bg-theme-dim border border-theme-primary rounded-lg
            shadow-lg max-h-80 overflow-y-auto"
          >
            {MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  setDefaultModel(model.id)
                  setIsOpen(false)
                }}
                className={`w-full flex items-start gap-3 px-3 py-3 text-left
                  hover:bg-theme-accent transition-colors
                  ${defaultModel === model.id ? 'bg-theme-accent' : ''}`}
              >
                <Sparkles className="w-4 h-4 mt-0.5 theme-secondary" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{model.name}</span>
                    <span className="text-xs px-1.5 py-0.5 bg-theme-accent rounded">
                      {model.context}
                    </span>
                  </div>
                  <div className="text-xs theme-secondary">
                    {model.provider} • {model.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export { MODELS }
