import { Logo } from '@components/Logo';

export const Header = () => {
  return (
    <header className="flex h-24 items-center gap-4 border-b px-12 py-6">
      <Logo />
      <h1 className="uppercase">Neptune Beer Club</h1>
    </header>
  );
};
