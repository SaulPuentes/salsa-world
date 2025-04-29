type DiamondLineProps = {
  count: number;
  color?: string;
  size?: string;
  className?: string
};

export const DiamondLine = ({
  count,
  color = 'text-purple',
  size = 'w-4 h-4',
  className
}: DiamondLineProps) => {
  return (
    <div className={`flex space-x-2 items-center ${className || ''}`}>
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={index}
          className={`${color} ${size}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2 C13.2 2 14 2.8 14.6 3.4 L20.6 9.4 C21.2 10 22 10.8 22 12 C22 13.2 21.2 14 20.6 14.6 L14.6 20.6 C14 21.2 13.2 22 12 22 C10.8 22 10 21.2 9.4 20.6
            L3.4 14.6 C2.8 14 2 13.2 2 12 C2 10.8 2.8 10 3.4 9.4 L9.4 3.4 C10 2.8 10.8 2 12 2 Z" />
        </svg>
      ))}
    </div>
  );
};
