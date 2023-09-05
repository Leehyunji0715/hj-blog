type Props = {
    text: string;
    size?: 'normal' | 'small' | 'xSmall';
    round?: boolean;
    highlight?: boolean;
    fill?: boolean;
    baseBackground?: boolean;
    icon?: React.ReactNode;
};

export default function Chip({text, icon, size='normal', round=false, highlight = true, fill=false, baseBackground = false}: Props) {
    return (
        <div 
            data-highlight={highlight} 
            data-round={round} 
            data-size={size} 
            data-fill={fill}
            data-base-bg={baseBackground}
            className="chip"
        >
            {icon}
            {text}
        </div>
    )
}