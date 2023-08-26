type Props = {
    text: string;
    // background?: string;
    icon?: React.ReactNode;
};

export default function Chip({text, icon}: Props) {
    return <div className="chip">
        {/* <span className="chip-icon">
            {icon}
        </span> */}
        {icon}
        {text}
    </div>
}