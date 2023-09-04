type Props = {
    text: string;
    size?: 'normal' | 'small';
    round?: boolean;
    highlight?: boolean;
    fill?: boolean;
    icon?: React.ReactNode;
};

export default function Chip({text, icon, size='normal', round=false, highlight = true, fill=false}: Props) {
    return (
        <div 
            data-highlight={highlight} 
            data-round={round} 
            data-size={size} 
            data-fill={fill} 
            className="chip"
        >
            {icon}
            {text}
        </div>
    )
}