'use client';
import { MessageCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import MainHeader from '@/components/layout/MainHeader';
import { useLang } from '@/context/LanguageContext';

export default function MessagesPage() {
  const { t } = useLang();
  return (
    <MainLayout>
      <MainHeader title={t.messages} />
      <div className="px-4 py-6">
        <div className="flex flex-col items-center justify-center py-24 text-[#64748B]">
          <MessageCircle size={48} className="mb-4 text-[#E2E8F0]" />
          <p className="font-medium">{t.noMessage}</p>
          <p className="text-sm mt-1">{t.msgDesc}</p>
        </div>
      </div>
    </MainLayout>
  );
}
