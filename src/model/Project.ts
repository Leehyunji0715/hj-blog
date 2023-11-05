export type ProjectData = {
    title: string;
    description: string;
    image: string;
    teckStacks: string[];
    link?: {
        github: string;
        deployed?: string;
    }
};
