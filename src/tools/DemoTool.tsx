import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import InputPane from '../components/shared/InputPane';
import OutputPane from '../components/shared/OutputPane';
import OptionsPanel, {
  OptionGroup,
  OptionButton,
} from '../components/shared/OptionsPanel';
import HistorySidebar from '../components/shared/HistorySidebar';
import { useHistory } from '../hooks/useHistory';
import { debounce } from '../utils/debounce';
import { getWorker } from '../utils/worker';

interface DemoToolState {
  input: string;
  output: string;
  operation: 'reverse' | 'uppercase' | 'lowercase';
}

export default function DemoTool() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operation, setOperation] = useState<
    'reverse' | 'uppercase' | 'lowercase'
  >('reverse');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  const history = useHistory<DemoToolState>({
    storageKey: 'demo-tool-history',
    maxEntries: 20,
    enableUndoRedo: true,
  });

  const processText = useCallback(async (text: string, op: string) => {
    if (!text) {
      setOutput('');
      return;
    }

    setIsProcessing(true);
    try {
      const worker = getWorker();
      const result = await worker.postMessage(op, { text });
      setOutput(result as string);
    } catch (error) {
      console.error('Worker error:', error);
      let result = text;
      if (op === 'reverse') {
        result = text.split('').reverse().join('');
      } else if (op === 'uppercase') {
        result = text.toUpperCase();
      } else if (op === 'lowercase') {
        result = text.toLowerCase();
      }
      setOutput(result);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  useEffect(() => {
    const debouncedFn = debounce(() => {
      processText(input, operation);
    }, 300);
    debouncedFn();
  }, [input, operation, processText]);

  const handleSaveToHistory = () => {
    if (input && output) {
      history.add({ input, output, operation });
    }
  };

  const handleHistorySelect = (entry: (typeof history.entries)[0]) => {
    const state = entry.data;
    setInput(state.input);
    setOutput(state.output);
    setOperation(state.operation);
  };

  const handleUndo = () => {
    const state = history.undo();
    if (state) {
      setInput(state.input);
      setOutput(state.output);
      setOperation(state.operation);
    }
  };

  const handleRedo = () => {
    const state = history.redo();
    if (state) {
      setInput(state.input);
      setOutput(state.output);
      setOperation(state.operation);
    }
  };

  return (
    <div className="flex h-full gap-4">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-foreground)]">
              {t('demo.title')}
            </h2>
            <p className="text-sm text-gray-500">{t('demo.description')}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleUndo}
              disabled={!history.canUndo}
              className="rounded px-3 py-1 text-sm hover:bg-[var(--color-hover)] disabled:opacity-50"
              aria-label={t('common.undo')}
            >
              {t('common.undo')}
            </button>
            <button
              onClick={handleRedo}
              disabled={!history.canRedo}
              className="rounded px-3 py-1 text-sm hover:bg-[var(--color-hover)] disabled:opacity-50"
              aria-label={t('common.redo')}
            >
              {t('common.redo')}
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="rounded px-3 py-1 text-sm hover:bg-[var(--color-hover)]"
              aria-label={showHistory ? t('common.close') : t('common.history')}
            >
              {showHistory ? '→' : '←'} {t('common.history')}
            </button>
          </div>
        </div>

        <div className="grid flex-1 gap-4 md:grid-cols-2">
          <InputPane
            value={input}
            onChange={setInput}
            placeholder={t('demo.inputPlaceholder')}
            disabled={isProcessing}
          />
          <OutputPane
            value={output}
            placeholder={
              isProcessing ? t('demo.processing') : t('demo.outputPlaceholder')
            }
            filename="demo-output.txt"
          />
        </div>

        <OptionsPanel title={t('common.options')}>
          <OptionGroup label="Operation">
            <div className="space-y-2">
              <OptionButton
                onClick={() => setOperation('reverse')}
                variant={operation === 'reverse' ? 'primary' : 'default'}
              >
                {t('demo.reverseText')}
              </OptionButton>
              <OptionButton
                onClick={() => setOperation('uppercase')}
                variant={operation === 'uppercase' ? 'primary' : 'default'}
              >
                {t('demo.uppercase')}
              </OptionButton>
              <OptionButton
                onClick={() => setOperation('lowercase')}
                variant={operation === 'lowercase' ? 'primary' : 'default'}
              >
                {t('demo.lowercase')}
              </OptionButton>
              <OptionButton onClick={handleSaveToHistory} variant="default">
                Save to History
              </OptionButton>
            </div>
          </OptionGroup>
        </OptionsPanel>
      </div>

      {showHistory && (
        <HistorySidebar
          entries={history.entries}
          onSelect={handleHistorySelect}
          onClear={history.clear}
          renderEntry={(entry) => {
            const preview = entry.data.input.substring(0, 30);
            return `${entry.data.operation}: ${preview}${entry.data.input.length > 30 ? '...' : ''}`;
          }}
          isOpen={showHistory}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
