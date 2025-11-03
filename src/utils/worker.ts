export interface WorkerMessage {
  id: string;
  type: string;
  payload?: unknown;
}

export interface WorkerResponse {
  id: string;
  type: 'success' | 'error';
  result?: unknown;
  error?: string;
}

export class WorkerManager {
  private worker: Worker | null = null;
  private messageId = 0;
  private pendingMessages = new Map<
    string,
    {
      resolve: (value: unknown) => void;
      reject: (error: Error) => void;
    }
  >();

  constructor(workerPath: string) {
    try {
      this.worker = new Worker(workerPath, { type: 'module' });
      this.worker.onmessage = this.handleMessage.bind(this);
      this.worker.onerror = this.handleError.bind(this);
    } catch (error) {
      console.error('Failed to create worker:', error);
    }
  }

  private handleMessage(event: MessageEvent<WorkerResponse>) {
    const { id, type, result, error } = event.data;
    const pending = this.pendingMessages.get(id);

    if (!pending) {
      return;
    }

    this.pendingMessages.delete(id);

    if (type === 'success') {
      pending.resolve(result);
    } else {
      pending.reject(new Error(error || 'Worker error'));
    }
  }

  private handleError(event: ErrorEvent) {
    console.error('Worker error:', event);
    this.pendingMessages.forEach(({ reject }) => {
      reject(new Error('Worker error'));
    });
    this.pendingMessages.clear();
  }

  postMessage(type: string, payload?: unknown): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!this.worker) {
        reject(new Error('Worker not available'));
        return;
      }

      const id = `msg-${this.messageId++}`;
      this.pendingMessages.set(id, { resolve, reject });

      this.worker.postMessage({
        id,
        type,
        payload,
      });
    });
  }

  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pendingMessages.forEach(({ reject }) => {
      reject(new Error('Worker terminated'));
    });
    this.pendingMessages.clear();
  }
}

let workerInstance: WorkerManager | null = null;

export function getWorker(): WorkerManager {
  if (!workerInstance) {
    workerInstance = new WorkerManager('/cswx/worker.js');
  }
  return workerInstance;
}

export function terminateWorker(): void {
  if (workerInstance) {
    workerInstance.terminate();
    workerInstance = null;
  }
}
