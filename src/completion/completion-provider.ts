import * as vscode from 'vscode';
import { getYAMLPositionKind, YAMLPositionKind } from '../yaml/yaml-utils';

export class PorterCompletionItemProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        // Are we in key position or value position?
        const positionKind = getYAMLPositionKind(document, position);
        if (positionKind !== YAMLPositionKind.Value) {
            return [];  // for now
        }
        return credentialsCompletionItems()
                .concat(dependenciesCompletionItems());
    }
}

function dependenciesCompletionItems(): vscode.CompletionItem[] {
    const dependencies = ['mysql', 'yoursql'];
    return dependencies.map((d) => new vscode.CompletionItem(`bundle.dependencies.${d}.outputs.host`));
}

function credentialsCompletionItems(): vscode.CompletionItem[] {
    const credentials = ['sekrit', 'soopersekrit'];
    return credentials.map((c) => new vscode.CompletionItem(`bundle.credentials.${c}`));
}
