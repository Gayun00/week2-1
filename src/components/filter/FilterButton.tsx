import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import { filterMethod, filterMaterial } from 'store/request';
import store from 'store/store';

type Props = {
  name: string;
  options: string[];
};

type RootState = ReturnType<typeof store.getState>;

function FilterButton({ name, options }: Props) {
  const { methods, materials } = useSelector(
    (state: RootState) => state.requests,
  );
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      if (name === '가공방식') {
        dispatch(filterMethod([...methods, e.target.value]));
      } else if (name === '재료') {
        dispatch(filterMaterial([...materials, e.target.value]));
      }
    } else if (!e.target.checked) {
      if (name === '가공방식') {
        const newOptionList = methods.filter(
          (option: string) => option !== e.target.value,
        );
        dispatch(filterMethod(newOptionList));
      } else if (name === '재료') {
        const newOptionList = materials.filter(
          (option: string) => option !== e.target.value,
        );
        dispatch(filterMaterial(newOptionList));
      }
    }
  };

  const handleClickOutside = (e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    if (
      !target.classList.contains('optionList') &&
      target.tagName !== 'BUTTON' &&
      target.tagName !== 'svg'
    )
      setIsClicked(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (name === '가공방식') {
    return (
      <Wrap>
        <Button
          value="method"
          type="button"
          onClick={handleClick}
          isSelected={methods.length > 0}
        >
          {name}
          {methods.length > 0 && <span>({methods.length})</span>}
          <IoMdArrowDropdown className="icon" size="20" />
        </Button>
        {isClicked && (
          <OptionList>
            {options.map((option) => {
              if (methods.includes(option)) {
                return (
                  <OptionItem key={option}>
                    <input
                      type="checkbox"
                      name={name}
                      value={option}
                      onChange={handleCheck}
                      checked
                    />
                    <p>{option}</p>
                  </OptionItem>
                );
              }
              return (
                <OptionItem key={option}>
                  <input
                    type="checkbox"
                    name={name}
                    value={option}
                    onChange={handleCheck}
                  />
                  <p>{option}</p>
                </OptionItem>
              );
            })}
          </OptionList>
        )}
      </Wrap>
    );
  }
  if (name === '재료') {
    return (
      <Wrap>
        <Button
          value="materials"
          type="button"
          onClick={handleClick}
          isSelected={materials.length > 0}
        >
          {name}
          {materials.length > 0 && <span>({materials.length})</span>}
          <IoMdArrowDropdown className="icon" size="20" />
        </Button>
        {isClicked && (
          <OptionList>
            {options.map((option) => {
              if (materials.includes(option)) {
                return (
                  <OptionItem key={option}>
                    <input
                      type="checkbox"
                      name={name}
                      value={option}
                      onChange={handleCheck}
                      checked
                    />
                    <p>{option}</p>
                  </OptionItem>
                );
              }
              return (
                <OptionItem key={option}>
                  <input
                    type="checkbox"
                    name={name}
                    value={option}
                    onChange={handleCheck}
                  />
                  <p>{option}</p>
                </OptionItem>
              );
            })}
          </OptionList>
        )}
      </Wrap>
    );
  }
  return <h1>오류</h1>;
}

export default FilterButton;

const Wrap = styled.div`
  position: relative;
`;

const Button = styled.button<{ isSelected: boolean }>`
  margin-right: 8px;
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.defaultWhite : theme.color.defaultGray};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.small};
  padding: 4px 12px;
  border: 1px solid ${({ theme }) => theme.color.subGray};
  border-radius: ${({ theme }) => theme.border.radius};
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.color.primaryBlue : theme.color.defaultWhite};
  &:hover {
    border-color: ${({ theme }) => theme.color.accentPrimaryBlue};
    cursor: pointer;
  }
  .icon {
    margin-left: 4px;
    background-color: ${({ isSelected, theme }) =>
      isSelected ? theme.color.primaryBlue : theme.color.defaultWhite};
    color: ${({ isSelected, theme }) =>
      isSelected ? theme.color.defaultWhite : theme.color.subGray};
  }
`;

const OptionList = styled.ul`
  border: 1px solid ${({ theme }) => theme.color.subGray};
  border-radius: ${({ theme }) => theme.border.radius};
  padding: 16px 12px;
  width: 130px;
  position: absolute;
  top: 37px;
  z-index: 5;
  background-color: ${({ theme }) => theme.color.defaultWhite};
`;

const OptionItem = styled.li`
  position: absolute;
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.middle};
  z-index: 6;
  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    margin-right: 10px;
  }
`;
