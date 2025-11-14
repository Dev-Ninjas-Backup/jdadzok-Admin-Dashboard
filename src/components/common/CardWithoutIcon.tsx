interface CardWithoutIconProps {
	title: string;
	value: string;
	subtitle?: string;
	subtitleColor?: string;
	leftIconColor?: string;
	subtitleIcon?: React.ReactNode;
	leftIcon?: React.ReactNode;
	gap?: number;
	gapX?: number;
}

const CardWithoutIcon: React.FC<CardWithoutIconProps> = ({
	title,
	value,
	subtitle,
	subtitleColor = "#4A5565",
	subtitleIcon,
	gap = 0,
	leftIcon,
	leftIconColor = "#4A5565",
	gapX = 0,
}) => {
	return (
		<div
			className="border border-[#0000001a] items-center flex flex-row py-4 ps-4 rounded-xl"
			style={{ gap: `${gapX}px` }}
		>
			{leftIcon && (
				<span className="items-center" style={{ color: leftIconColor }}>
					{leftIcon}
				</span>
			)}
			<div className="flex flex-col " style={{ gap: `${gap}px` }}>
				<p className="text-sm font-normal text-[#4A5565]">{title}</p>
				<p className="text-md font-normal text-[#101828]">{value}</p>
				<div className="flex items-center gap-1">
					{subtitleIcon && (
						<span style={{ color: subtitleColor }}>{subtitleIcon}</span>
					)}
					{subtitle && (
						<p className="text-sm font-normal" style={{ color: subtitleColor }}>
							{subtitle}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
export default CardWithoutIcon;
