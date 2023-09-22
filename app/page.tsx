import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Header } from '@/components/Header/Header';
import { DraggableWindow } from '@/components/DraggableWindow/DraggableWindow';
import { DraggableContext } from '@/components/DraggableContext/DraggableContext';

export default function HomePage() {
  return (
    <>
      <Header />
      <Welcome />
      <ColorSchemeToggle />
      <DraggableContext />
    </>
  );
}
