/**
 * Trims a string to a maximum length and appends an ellipsis (`...`) if it exceeds that length.
 * @param str - The input string to trim.
 * @param maxLength - The maximum allowed length before truncation. Defaults to `25`.
 * @returns The original string if within the limit, a truncated string with ellipsis if too long, or `undefined` for empty/falsy input.
 *
 * @example
 * ```ts
 * trimString("Hello this is a long string", 10); // "Hello this..."
 * trimString("Short text", 20); // "Short text"
 * ```
 */
export function trimString(str: string, maxLength: number = 25): string | undefined {
    if (!str) return undefined;
    return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
}