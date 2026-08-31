import React from "react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: string;
  createdAt: string;
}

const NotificationsTable: React.FC<{ data: NotificationItem[] }> = ({
  data,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <h3 className="px-6 pt-6 pb-2 text-base font-medium text-[#101828]">
        Recent Notifications
      </h3>
      <div className="bg-white p-6 pt-2 space-y-4">
        {data.length === 0 ? (
          <p className="text-gray-500 text-sm">No notifications sent yet.</p>
        ) : (
          data.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white border border-[#E5E7EB] hover:bg-gray-50 transition-colors rounded-xl p-4"
            >
              <div className="space-y-1">
                <div className="flex flex-row gap-2 w-full items-center">
                  <div className="text-sm sm:text-base font-medium text-[#101828]">
                    {item.title}
                  </div>
                  {item.type && (
                    <div className="text-[10px] sm:text-xs font-normal rounded-xl border border-[#0000001a] w-fit px-2 py-0.5 text-[#0A0A0A]">
                      {item.type}
                    </div>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#4A5565]">
                  {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="text-xs sm:text-sm text-[#6A7282]">
                  {item.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsTable;
