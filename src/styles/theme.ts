/**
 * Theme utility for customizing UI library variables
 *
 * This file provides functions for customizing the appearance
 * of the UI components by modifying CSS custom properties.
 */

export type ThemeColors = {
  primary?: string;
  secondary?: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
};

export type ThemeSpacing = {
  unit?: string;
};

export type ThemeTypography = {
  fontFamily?: string;
  headingFontFamily?: string;
};

export type ThemeOptions = {
  colors?: ThemeColors;
  spacing?: ThemeSpacing;
  typography?: ThemeTypography;
  borderRadius?: {
    sm?: string;
    md?: string;
    lg?: string;
  };
};

/**
 * Helper function to darken a color by a percentage
 */
const darkenColor = (color: string, percent: number): string => {
  // Simple implementation for hex colors
  if (!color.startsWith("#") || ![4, 7].includes(color.length)) {
    console.warn("Color must be in hex format (#RGB or #RRGGBB)");
    return color;
  }

  let r = 0,
    g = 0,
    b = 0;

  // Convert hex to RGB
  if (color.length === 4) {
    r = parseInt(color[1] + color[1], 16);
    g = parseInt(color[2] + color[2], 16);
    b = parseInt(color[3] + color[3], 16);
  } else {
    r = parseInt(color.substring(1, 3), 16);
    g = parseInt(color.substring(3, 5), 16);
    b = parseInt(color.substring(5, 7), 16);
  }

  // Reduce each component by the percentage
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

/**
 * Apply custom theme options to the UI library
 * @param options Theme customization options
 */
export const applyTheme = (options: ThemeOptions): void => {
  const root = document.documentElement;

  // Apply color customizations
  if (options.colors) {
    const { colors } = options;

    if (colors.primary) {
      root.style.setProperty("--ui-primary", colors.primary);
      // Also update derived colors
      root.style.setProperty(
        "--ui-primary-hover",
        darkenColor(colors.primary, 10)
      );
      root.style.setProperty(
        "--ui-primary-active",
        darkenColor(colors.primary, 15)
      );
      root.style.setProperty("--ui-primary-05", `${colors.primary}0d`); // 0.05 opacity in hex
      root.style.setProperty("--ui-primary-10", `${colors.primary}1a`); // 0.1 opacity in hex
    }

    if (colors.secondary) {
      root.style.setProperty("--ui-secondary", colors.secondary);
      root.style.setProperty(
        "--ui-secondary-hover",
        darkenColor(colors.secondary, 10)
      );
      root.style.setProperty(
        "--ui-secondary-active",
        darkenColor(colors.secondary, 15)
      );
    }

    if (colors.success) root.style.setProperty("--ui-success", colors.success);
    if (colors.warning) root.style.setProperty("--ui-warning", colors.warning);
    if (colors.error) root.style.setProperty("--ui-error", colors.error);
    if (colors.info) root.style.setProperty("--ui-info", colors.info);
  }

  // Apply spacing customizations
  if (options.spacing) {
    const { spacing } = options;
    if (spacing.unit) root.style.setProperty("--ui-spacing-unit", spacing.unit);
    // The derived spacing values will be automatically calculated via CSS calc()
  }

  // Apply typography customizations
  if (options.typography) {
    const { typography } = options;
    if (typography.fontFamily)
      root.style.setProperty("--ui-font-family-base", typography.fontFamily);
    if (typography.headingFontFamily)
      root.style.setProperty(
        "--ui-font-family-heading",
        typography.headingFontFamily
      );
  }

  // Apply border radius customizations
  if (options.borderRadius) {
    const { borderRadius } = options;
    if (borderRadius.sm)
      root.style.setProperty("--ui-border-radius-sm", borderRadius.sm);
    if (borderRadius.md)
      root.style.setProperty("--ui-border-radius-md", borderRadius.md);
    if (borderRadius.lg)
      root.style.setProperty("--ui-border-radius-lg", borderRadius.lg);
  }
};

/**
 * Reset theme customizations to default values
 */
export const resetTheme = (): void => {
  document.documentElement.removeAttribute("style");
};

/**
 * Usage example:
 *
 * import { applyTheme } from 'your-ui-library';
 *
 * // Apply a custom theme
 * applyTheme({
 *   colors: {
 *     primary: '#FF5733',
 *     secondary: '#C70039',
 *   },
 *   spacing: {
 *     unit: '10px',
 *   },
 *   typography: {
 *     fontFamily: 'Open Sans, sans-serif',
 *   }
 * });
 *
 * // Reset to default theme
 * resetTheme();
 */
