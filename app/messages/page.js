import { MessageCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

export default function MessagesPage() {
  return (
    <MainLayout>
      <div className="px-4 py-6">
        <h1 className="text-xl font-bold text-[#0F172A] mb-6">Messages</h1>

        <div className="flex flex-col items-center justify-center py-24 text-[#64748B]">
          <MessageCircle size={48} className="mb-4 text-[#E2E8F0]" />
          <p className="font-medium">Aucun message pour l'instant</p>
          <p className="text-sm mt-1">Tes conversations privées apparaîtront ici</p>
        </div>
      </div>
    </MainLayout>
  );
}
