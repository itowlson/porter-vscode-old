import * as vscode from 'vscode';
import * as yp from 'yaml-ast-parser';
import { YAMLNode } from 'yaml-ast-parser';

export function parseYAMLTree(document: vscode.TextDocument): yp.YAMLNode {
    const root = yp.safeLoad(document.getText());
    return root;
}

// Example YAML
//
// foos:
// - name: foo
//   size: 17
// - name: bar
//   size: 23
//
// Pass "foos", returns ["foo", "bar"]
export function topLevelArrayEntryNames(ast: YAMLNode, arrayName: string): string[] {
    if (!ast || !ast.mappings) {
        return [];
    }

    const topLevelNode = ast.mappings.find((n: any) => n.key && n.key.value === arrayName);
    if (!topLevelNode || !topLevelNode.value || !topLevelNode.value.items) {
        return [];
    }

    const arrayEntryNodes = topLevelNode.value.items.filter((dn: any) => dn.mappings);
    const arrayEntryNameNodes = arrayEntryNodes.map((dn: any) => dn.mappings.find((m: any) => m.key.value === 'name'))
                                                .filter((nn: any) => nn && nn.value && nn.value.value);
    const arrayEntryNames: string[] = arrayEntryNameNodes.map((nn: any) => nn.value.value);
    return arrayEntryNames;
}
