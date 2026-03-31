import React from "react";
import { formatValue } from "../../utils/formatValue";

interface StatCardProps {
	label: string;
	value: string | number;
	change: string;
	icon: React.ElementType;
	iconColor: string;
	bgColor: string;
	subtitleColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
	label,
	value,
	change,
	icon: Icon,
	iconColor,
	bgColor,
	subtitleColor = "#00A63E",
}) => {
	return (
		<div className="bg-white rounded-lg border border-gray-200 p-6 ">
			<div className="flex justify-between items-start">
				<div>
					<p className="text-[#4A5565] text-sm ">{label}</p>
					<p className="text-base  text-[#101828] mt-2">{formatValue(value)}</p>
					<p style={{ color: subtitleColor }} className="text-sm  mt-3">
						{change}
					</p>
				</div>
				<div style={{ color: bgColor }} className={` p-3 rounded-lg`}>
					<Icon style={{ color: iconColor }} className={` w-6 h-6`} />
				</div>
			</div>
		</div>
	);
};

export default StatCard;
