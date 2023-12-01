import { Logo } from '@components/Logo';

export const Header = () => {
  return (
    <header className="flex h-20 items-center gap-4 border-b border-gray-500 p-4">
      <Logo />
      <h1 className="font-heading text-primary text-4xl tracking-wider">Neptune Beer Club</h1>
    </header>
  );
};
