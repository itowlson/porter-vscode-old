import * as vscode from 'vscode';
import { getYAMLPositionKind, YAMLPositionKind } from '../yaml/yaml-utils';

export class PorterCompletionItemProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        // Are we in key position or value position?
        const positionKind = getYAMLPositionKind(document, position);
        if (positionKind !== YAMLPositionKind.Value) {
            return [];  // for now
        }
        const ci = new vscode.CompletionItem("bundle.dependencies", vscode.CompletionItemKind.Constant);
        return [ci];
    }
}
