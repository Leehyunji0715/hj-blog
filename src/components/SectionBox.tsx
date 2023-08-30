type Props = {
    title: string;
    children: React.ReactNode;
    direction?: "left" | "right";
    className?: string;
};

export default function SectionBox({ title, direction='left', className, children }: Props) {
    return (
        <section className={`section-box ${className ?? ''}`} data-direction={direction}>
            <h1>{title}</h1>
            {children}
        </section>
    )
};