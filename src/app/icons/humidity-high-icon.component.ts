import { Component, Input } from '@angular/core';

@Component({
  template: ` <svg
    xmlns="http://www.w3.org/2000/svg"
    [attr.height]="size + 'px'"
    viewBox="0 -960 960 960"
    [attr.width]="size + 'px'"
    [attr.fill]="colour"
  >
    <path
      d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100Z"
    />
  </svg>`,
  selector: 'humidity-high-icon',
  standalone: true,
})
export class HumidityHighIconComponent {
  @Input() size!: number;
  @Input() colour!: string;
}
