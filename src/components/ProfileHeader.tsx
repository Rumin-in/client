export default function ProfileHeader() {
  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <div className="text-lg font-semibold">Shristi</div>
        <div className="text-sm text-gray-500">Quick search</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <button className="px-3 py-1 bg-green-500 text-white rounded">+ Add widget</button>
      </div>
    </header>
  );
}
