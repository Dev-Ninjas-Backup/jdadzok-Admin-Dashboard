interface CardWithoutIconProps {
	title: string;
	value: string;
	subtitle?: string;
	subtitleColor?: string;
	subtitleIcon?: React.ReactNode;
	gap?: number;
}

const CardWithoutIcon: React.FC<CardWithoutIconProps> = ({
	title,
	value,
	subtitle,
	subtitleColor = "#4A5565",
	subtitleIcon,
	gap = 32,
}) => {
	return (
		<div
			className="border border-[#0000001a] flex flex-col py-4 ps-4 rounded-xl"
			style={{ gap: `${gap}px` }}
		>
			<p className="text-sm font-normal text-[#4A5565]">{title}</p>
			<p className="text-md font-normal text-[#101828]">{value}</p>
			<div className="flex items-center gap-1">
				{subtitleIcon && (
					<span style={{ color: subtitleColor }}>{subtitleIcon}</span>
				)}
				<p className="text-sm font-normal" style={{ color: subtitleColor }}>
					{subtitle}
				</p>
			</div>
		</div>
	);
};
export default CardWithoutIcon;
