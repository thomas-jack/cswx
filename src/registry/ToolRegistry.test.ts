import { describe, it, expect, beforeEach } from 'vitest';
import { toolRegistry, ToolMetadata } from './ToolRegistry';

function TestComponent() {
  return null;
}

describe('ToolRegistry', () => {
  beforeEach(() => {
    const tools = toolRegistry.getAll();
    tools.forEach((tool) => toolRegistry.unregister(tool.id));
  });

  it('should register a tool', () => {
    const tool: ToolMetadata = {
      id: 'test-tool',
      name: 'Test Tool',
      description: 'A test tool',
      path: '/test',
      component: TestComponent,
    };

    toolRegistry.register(tool);
    const registered = toolRegistry.get('test-tool');

    expect(registered).toBeDefined();
    expect(registered?.name).toBe('Test Tool');
  });

  it('should not register duplicate tools', () => {
    const tool: ToolMetadata = {
      id: 'test-tool',
      name: 'Test Tool',
      description: 'A test tool',
      path: '/test',
      component: TestComponent,
    };

    toolRegistry.register(tool);
    toolRegistry.register(tool);

    const allTools = toolRegistry.getAll();
    const duplicates = allTools.filter((t) => t.id === 'test-tool');
    expect(duplicates.length).toBe(1);
  });

  it('should unregister a tool', () => {
    const tool: ToolMetadata = {
      id: 'test-tool',
      name: 'Test Tool',
      description: 'A test tool',
      path: '/test',
      component: TestComponent,
    };

    toolRegistry.register(tool);
    toolRegistry.unregister('test-tool');
    const registered = toolRegistry.get('test-tool');

    expect(registered).toBeUndefined();
  });

  it('should get all registered tools', () => {
    const tool1: ToolMetadata = {
      id: 'tool-1',
      name: 'Tool 1',
      description: 'First tool',
      path: '/tool1',
      component: TestComponent,
    };

    const tool2: ToolMetadata = {
      id: 'tool-2',
      name: 'Tool 2',
      description: 'Second tool',
      path: '/tool2',
      component: TestComponent,
    };

    toolRegistry.register(tool1);
    toolRegistry.register(tool2);

    const allTools = toolRegistry.getAll();
    expect(allTools.length).toBe(2);
  });

  it('should filter by category', () => {
    const tool1: ToolMetadata = {
      id: 'tool-1',
      name: 'Tool 1',
      description: 'First tool',
      path: '/tool1',
      component: TestComponent,
      category: 'utilities',
    };

    const tool2: ToolMetadata = {
      id: 'tool-2',
      name: 'Tool 2',
      description: 'Second tool',
      path: '/tool2',
      component: TestComponent,
      category: 'converters',
    };

    toolRegistry.register(tool1);
    toolRegistry.register(tool2);

    const utilities = toolRegistry.getAllByCategory('utilities');
    expect(utilities.length).toBe(1);
    expect(utilities[0].id).toBe('tool-1');
  });

  it('should respect feature flags', () => {
    const tool: ToolMetadata = {
      id: 'test-tool',
      name: 'Test Tool',
      description: 'A test tool',
      path: '/test',
      component: TestComponent,
      isEnabled: () => false,
    };

    toolRegistry.register(tool);
    const allTools = toolRegistry.getAll();

    expect(allTools.length).toBe(0);
  });
});
