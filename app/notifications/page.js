import { Bell } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

export default function NotificationsPage() {
  return (
    <MainLayout>
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-[#0F172A] mb-6">Notifications</h1>

        <div className="flex flex-col items-center justify-center py-24 text-[#64748B]">
          <Bell size={48} className="mb-4 text-[#E2E8F0]" />
          <p className="font-medium">Aucune notification pour l'instant</p>
          <p className="text-sm mt-1">Les mentions et interactions apparaîtront ici</p>
        </div>
      </div>
    </MainLayout>
  );
}
