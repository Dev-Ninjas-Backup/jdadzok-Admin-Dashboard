import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface PopupProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
	size?: "sm" | "md" | "lg" | "xl" | "full";
	closeOnOutsideClick?: boolean;
	showCloseButton?: boolean;
}

const CustomPopup: React.FC<PopupProps> = ({
	isOpen,
	onClose,
	children,
	title,
	size = "md",
	closeOnOutsideClick = true,
	showCloseButton = true,
}) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};
		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const sizeClasses: Record<string, string> = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
		xl: "max-w-xl",
		full: "max-w-full mx-4",
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-gray-50/30 backdrop-blur-none"
				onClick={closeOnOutsideClick ? onClose : undefined}
			/>
			{/* Modal */}
			<div
				className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden animate-popup`}
			>
				{/* Header */}
				{(title || showCloseButton) && (
					<div className="flex items-center justify-between p-6 border-b border-slate-200">
						{title && (
							<h2 className="text-xl font-bold text-slate-800">{title}</h2>
						)}
						{showCloseButton && (
							<button
								onClick={onClose}
								className="ml-auto p-2 hover:bg-slate-100 rounded-lg transition-colors"
							>
								<X className="w-5 h-5 text-slate-600" />
							</button>
						)}
					</div>
				)}

				{/* Content */}
				<div className="overflow-y-auto max-h-[calc(90vh-80px)]">
					{children}
				</div>
			</div>
		</div>
	);
};

export default CustomPopup;
