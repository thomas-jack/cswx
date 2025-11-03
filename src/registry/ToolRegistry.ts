import { ComponentType, lazy } from 'react';

export interface ToolMetadata {
  id: string;
  name: string;
  description: string;
  icon?: string;
  path: string;
  component: ComponentType;
  featureFlags?: string[];
  category?: string;
  isEnabled?: () => boolean;
}

class ToolRegistry {
  private tools: Map<string, ToolMetadata> = new Map();

  register(metadata: ToolMetadata): void {
    if (this.tools.has(metadata.id)) {
      console.warn(`Tool with id "${metadata.id}" is already registered`);
      return;
    }
    this.tools.set(metadata.id, metadata);
  }

  unregister(id: string): void {
    this.tools.delete(id);
  }

  get(id: string): ToolMetadata | undefined {
    return this.tools.get(id);
  }

  getAll(): ToolMetadata[] {
    return Array.from(this.tools.values()).filter((tool) => {
      if (tool.isEnabled) {
        return tool.isEnabled();
      }
      return true;
    });
  }

  getAllByCategory(category: string): ToolMetadata[] {
    return this.getAll().filter((tool) => tool.category === category);
  }

  createLazyComponent(importFn: () => Promise<{ default: ComponentType }>) {
    return lazy(importFn);
  }
}

export const toolRegistry = new ToolRegistry();
