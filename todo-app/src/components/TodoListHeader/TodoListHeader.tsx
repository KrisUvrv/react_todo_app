import * as S from '@/components/TodoList/TodoList.styles.ts';
import ThemeSwitcher from '@/theme/ThemeSwitcher.tsx';

export const TodoListHeader = () => {
  return (
    <S.Heading>
      <h3>TODO LIST</h3>
      <ThemeSwitcher />
    </S.Heading>
  );
};
