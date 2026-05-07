import { useMemo } from 'react';

const Petals = ({ count }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 6 + 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      width: `${Math.random() * 5 + 4}px`,
      height: `${Math.random() * 7 + 6}px`,
      opacity: Math.random() * 0.4 + 0.3,
      background: Math.random() > 0.5 ? 'var(--sakura, #E8A0B0)' : 'var(--sakura-light, #f4c2d0)'
    }));
  }, [count]);

  return (
    <>
      <style>{`
        .comp-petal {
          position: absolute;
          border-radius: 50% 0 50% 0;
          animation: petalFall linear infinite;
          will-change: transform, opacity;
        }
        @keyframes petalFall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.6; }
          100% { transform: translateY(110svh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {petals.map(p => (
        <div key={p.id} className="comp-petal" style={{ ...p }} />
      ))}
    </>
  );
};

export default Petals;