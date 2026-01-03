import { Component, ElementRef } from '@angular/core';

export enum Appearance { CURRENT, CURRENT_NO_MAP, PRE_2018, ORIGINAL_1410 }
export enum Timing { MODERN, MECHANICAL_ORIGINAL, MECHANICAL_UPDATED, CONSTRAINED_SUN }

export interface SettingsHolder {
  additionalPlanets: boolean;
  animateBySiderealDays: boolean;
  appearance: Appearance;
  background: string;
  detailedMechanism: boolean;
  fasterGraphics: boolean;
  hideMap?: boolean;
  post2018?: boolean;
  realPositionMarkers: boolean;
  showInfoPanel: boolean;
  timing: Timing;
  translucentEcliptic: boolean;
}

@Component({
  selector: 'app-advanced-options',
  templateUrl: './advanced-options.component.html',
  styleUrls: ['./advanced-options.component.scss']
})
export class AdvancedOptionsComponent {
  private shown = false;

  appearanceOptions = [
    { label: $localize`2018年后的颜色`, value: Appearance.CURRENT },
    { label: $localize`2018年后的颜色，无地图`, value: Appearance.CURRENT_NO_MAP },
    { label: $localize`2018年前的颜色`, value: Appearance.PRE_2018 },
    { label: $localize`1410年的原始外观？`, value: Appearance.ORIGINAL_1410 }
  ];

  timingOptions = [
    { label: $localize`天文精确的非机械计时`, value: Timing.MODERN },
    { label: $localize`太阳受时针限制`, value: Timing.CONSTRAINED_SUN },
    { label: $localize`1866年前的机械计时，每季度重新校准`, value: Timing.MECHANICAL_ORIGINAL },
    { label: $localize`更新后的机械计时，每年重新校准`, value: Timing.MECHANICAL_UPDATED }
  ];

  settingsHolder: SettingsHolder;

  constructor(private elementRef: ElementRef) {}

  show(): void {
    (this.elementRef.nativeElement as HTMLElement).style.display = 'flex';

    if (!this.shown) {
      document.body.addEventListener('click', this.clicker);
      this.shown = true;
    }
  }

  hide(): void {
    (this.elementRef.nativeElement as HTMLElement).style.display = 'none';

    if (this.shown) {
      document.body.removeEventListener('click', this.clicker);
      this.shown = false;
    }
  }

  clicker = (evt: MouseEvent): void => {
    if (!(evt.target as HTMLElement)?.classList?.contains('svg-overlay'))
      return;

    const r = this.elementRef.nativeElement?.getBoundingClientRect();

    if (r && (evt.pageX < r.left || evt.pageX > r.right || evt.pageY < r.top || evt.pageY > r.bottom))
      this.hide();
  }
}
