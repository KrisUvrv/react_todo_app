import styled from 'styled-components';

export const TodoItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 12px;
  margin-bottom: 8px;

  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DateText = styled.span`
  color: #888;
  min-width: 90px;
  text-align: right;
  font-size: 12px;
`;

export const Title = styled.span<{ $completed: boolean }>`
  font-size: 16px;

  text-decoration: ${({$completed}) =>
          $completed ? 'line-through' : 'none'};

  color: ${({$completed}) =>
          $completed ? '#999' : 'inherit'};
`;
