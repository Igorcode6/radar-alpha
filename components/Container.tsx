interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Largura máxima e margens laterais padrão de todas as páginas.
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-6 sm:px-12 ${className}`}>
      {children}
    </div>
  );
}
