export default function ProfileHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <img
          src="/rumin-logo.png"
          alt="Rumin Logo"
          width={120}
          height={40}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}
