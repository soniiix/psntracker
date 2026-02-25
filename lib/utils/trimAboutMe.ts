export function trimAboutMe(aboutMe: string, maxLength: number = 25): string | undefined {
    if (!aboutMe) return undefined;
    return aboutMe.length > maxLength ? `${aboutMe.substring(0, maxLength)}...` : aboutMe;
}