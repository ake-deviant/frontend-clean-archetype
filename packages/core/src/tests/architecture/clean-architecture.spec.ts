import * as fs from 'fs';
import * as path from 'path';

const SRC_ROOT = path.resolve(__dirname, '../..');

function getFilesRecursively(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getFilesRecursively(fullPath) : [fullPath];
  });
}

function getImportsFromFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const matches = content.matchAll(/^import .+ from ['"](.+)['"]/gm);
  return Array.from(matches, (m) => m[1]);
}

function getLayerFiles(layer: string): string[] {
  const layerPath = path.join(SRC_ROOT, layer);
  return getFilesRecursively(layerPath).filter((f) => f.endsWith('.ts') && !f.endsWith('.spec.ts'));
}

function assertLayerDoesNotImport(sourceLayer: string, forbiddenLayer: string): void {
  const files = getLayerFiles(sourceLayer);

  for (const file of files) {
    const imports = getImportsFromFile(file);
    const violations = imports.filter((i) => i.includes(`/${forbiddenLayer}/`));

    if (violations.length > 0) {
      throw new Error(
        `[Architecture violation] "${sourceLayer}" imports from "${forbiddenLayer}"\n` +
          `  File: ${path.relative(SRC_ROOT, file)}\n` +
          `  Imports: ${violations.join(', ')}`,
      );
    }
  }
}

describe('Clean Architecture — dependency rules', () => {
  describe('domain', () => {
    it('should not depend on application', () => {
      assertLayerDoesNotImport('domain', 'application');
    });

    it('should not depend on infrastructure', () => {
      assertLayerDoesNotImport('domain', 'infrastructure');
    });

    it('should not depend on presentation', () => {
      assertLayerDoesNotImport('domain', 'presentation');
    });
  });

  describe('application', () => {
    it('should not depend on infrastructure', () => {
      assertLayerDoesNotImport('application', 'infrastructure');
    });

    it('should not depend on presentation', () => {
      assertLayerDoesNotImport('application', 'presentation');
    });
  });

  describe('presentation', () => {
    it('should not depend on infrastructure', () => {
      assertLayerDoesNotImport('presentation', 'infrastructure');
    });
  });
});
