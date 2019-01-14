'use strict';

import * as vscode from 'vscode';
import { PorterCompletionItemProvider } from './completion/completion-provider';

const PORTER_DOCUMENT_SELECTOR = {
    language: 'yaml',
    pattern: '**/*porter.yaml'
};

export function activate(context: vscode.ExtensionContext) {
    const disposables = [
        vscode.languages.registerCompletionItemProvider(PORTER_DOCUMENT_SELECTOR, new PorterCompletionItemProvider()),
    ];

    context.subscriptions.push(...disposables);
}

export function deactivate() {
}
