import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CodeEditorComponent, CodeModel} from "@ngstack/code-editor";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [
    CodeEditorComponent,
    CommonModule
  ],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeEditorComponents {
  languages = signal<string[]>([
    'javascript',
    'typescript',
    'go',
    'python',
    'java',
    'rust',
    'csharp',
    'cpp',
    'c',
    'swift',
    'kotlin'
  ]);

  model = signal<CodeModel>({
    language: 'javascript',
    uri: 'main.json',
    value: '// Welcome to Duel'
  });

  options = signal({
    context: true,
    minimap: {
      enabled: true,
    }
  })

  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;

    const current = this.model();
    this.model.set({
      ...current,
      language
    });
  }

  onCodeChanged(value: string) {
    console.log('CODE', value);
  }
}
