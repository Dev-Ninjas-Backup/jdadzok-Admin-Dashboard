import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  icon: Icon,
  iconColor,
  bgColor,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-green-600 text-sm font-medium mt-2">{change}</p>
        </div>
        <div className={`${bgColor} p-3 rounded-lg`}>
          <Icon className={`${iconColor} w-6 h-6`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
