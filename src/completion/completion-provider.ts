import * as vscode from 'vscode';
import { getYAMLPositionKind, YAMLPositionKind } from '../yaml/yaml-utils';
import { parseYAMLTree, topLevelArrayEntryNames } from '../yaml/yaml-ast';
import { YAMLNode } from 'yaml-ast-parser';

export class PorterCompletionItemProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
        // Are we in key position or value position?
        const positionKind = getYAMLPositionKind(document, position);
        if (positionKind !== YAMLPositionKind.Value) {
            return [];  // for now
        }

        const ast = parseYAMLTree(document);

        // TODO: be more contextual about offering these.  For example, don't offer credentials
        // when you're *actually in the credential definition* (cough).
        const completionItems = credentialsCompletionItems(ast)
            .concat(dependenciesCompletionItems(ast));
        return completionItems;
    }
}

function dependenciesCompletionItems(ast: YAMLNode): vscode.CompletionItem[] {
    const names = topLevelArrayEntryNames(ast, 'dependencies');
    return names.map((d) => new vscode.CompletionItem(`bundle.dependencies.${d}.outputs.SOMETHING`));
}

function credentialsCompletionItems(ast: YAMLNode): vscode.CompletionItem[] {
    const names = topLevelArrayEntryNames(ast, 'credentials');
    return names.map((c) => new vscode.CompletionItem(`bundle.credentials.${c}`));
}
