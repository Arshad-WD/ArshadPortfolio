export interface HeroProps {
    scrollToAbout: () => void;
    scrollToProject: () => void;
    scrollToContact: () => void;
}

export interface Quote {
    text: string,
    author: string,
}