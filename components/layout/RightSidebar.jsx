import { suggestedUsers } from '@/mock/users';

function UserAvatar({ name }) {
  return (
    <div className="w-9 h-9 rounded-full bg-[#E2E8F0] flex items-center justify-center text-xs font-bold text-[#64748B] shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

export default function RightSidebar() {
  return (
    <aside className="w-72 min-h-screen border-l border-[#E2E8F0] px-4 py-6 fixed top-0 right-0">
      <h2 className="font-bold text-[#0F172A] mb-4">Comptes suivis</h2>

      <div className="flex flex-col gap-3">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <UserAvatar name={user.name} />
            <div>
              <p className="text-sm font-medium text-[#0F172A]">{user.name}</p>
              <p className="text-xs text-[#64748B]">@{user.username}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
