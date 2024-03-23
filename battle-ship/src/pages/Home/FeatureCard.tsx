interface Props {
  title: string;
  children: React.ReactNode;
}

export default function FeatureCard({ title, children }: Props) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg glass">
      <h3 className="text-white text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{children}</p>
    </div>
  );
}
