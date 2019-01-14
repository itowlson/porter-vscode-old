import * as vscode from 'vscode';

export enum YAMLPositionKind {
    Unknown,
    Key,
    Value,
}

export function getYAMLPositionKind(document: vscode.TextDocument, position: vscode.Position): YAMLPositionKind {
    const line = document.lineAt(position.line);
    const posOffset = document.offsetAt(position);
    const lineStartOffset = document.offsetAt(line.range.start);
    const offsetIntoLine = posOffset - lineStartOffset;
    const keySeparatorIndex = line.text.indexOf(':');  // TODO: naive, naive, naive - e.g. doesn't handle array values
    if (keySeparatorIndex < offsetIntoLine) {
        return YAMLPositionKind.Value;
    }
    return YAMLPositionKind.Key;
}
