import isEmpty from 'lodash.isempty';
import { defaultColors, defaultScreens, defaultSpacing, defaultVariants } from '../utils';

export class ThemeScanner {
  private readonly tailwindConfig: any;
  private readonly themeConfig: any;

  constructor(tailwindConfig: any) {
    this.tailwindConfig = tailwindConfig;
    this.themeConfig = tailwindConfig.theme;
  }

  getThemeColors = () => {
    const themeColors = isEmpty(this.themeConfig?.colors) ? defaultColors : this.themeConfig?.colors;
    const extendedThemeColors = this.themeConfig?.extend?.colors;
    return extendedThemeColors ? { ...themeColors, ...extendedThemeColors } : themeColors;
  };

  getThemeBreakpoints = () => {
    const themeBreakpoints = isEmpty(this.themeConfig?.screens) ? defaultScreens : this.themeConfig?.screens;
    const extendedThemeBreakpoints = this.themeConfig?.extend?.screens;
    const allConfigBreakpoints = extendedThemeBreakpoints
      ? { ...themeBreakpoints, ...extendedThemeBreakpoints }
      : themeBreakpoints;
    return Object.keys(allConfigBreakpoints);
  };

  getThemeSpacing = () => {
    const themeSpacing = isEmpty(this.themeConfig?.spacing) ? defaultSpacing : this.themeConfig?.spacing;
    const extendedThemeSpacing = this.themeConfig?.extend?.spacing;
    const allConfigSpacing = extendedThemeSpacing ? { ...themeSpacing, ...extendedThemeSpacing } : themeSpacing;

    return {
      spacingKeys: Object.keys(allConfigSpacing),
      spacingValues: Object.values(allConfigSpacing),
    };
  };

  getPseudoclassVariants = () => {
    const themeVariants = isEmpty(this.tailwindConfig?.variants) ? defaultVariants : this.tailwindConfig?.variants;
    Object.keys(themeVariants).map(key => {
      if (Object.keys(defaultVariants).includes(key)) {
        delete defaultVariants[key];
      }
    });
    const allPseudoClassVariants: { [key: string]: string[] } = {
      ...defaultVariants,
      ...themeVariants,
    };

    return {
      classesCategories: Object.keys(allPseudoClassVariants),
      classesVariants: Object.values(allPseudoClassVariants),
    };
  };
}
