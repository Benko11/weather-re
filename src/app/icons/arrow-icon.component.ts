import { Component, Input } from '@angular/core';

@Component({
  selector: 'arrow-icon',
  standalone: true,
  imports: [],
  template: ` <svg
    xmlns="http://www.w3.org/2000/svg"
    [attr.height]="size + 'px'"
    viewBox="0 -960 960 960"
    [attr.width]="size + 'px'"
    [attr.fill]="colour"
  >
    <path
      d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"
    />
  </svg>`,
  styles: ``,
})
export class ArrowIconComponent {
  @Input() colour!: string;
  @Input() size!: number;
}
