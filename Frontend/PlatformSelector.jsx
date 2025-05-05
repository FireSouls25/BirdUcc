const platforms = ["WhatsApp", "Discord", "SMS"];

export default function PlatformSelector() {
  return (
    <div className="w-20 bg-purple-100 p-2 flex flex-col items-center">
      {platforms.map(p => (
        <button key={p} className="my-2">{p[0]}</button>
      ))}
    </div>
  );
}
