import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

import { Mixin } from 'ustudio-ui/theme';

const asideWidth = '320px';

const Layout = styled.div`
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  padding-top: 64px;
`;

const Header = styled.header`
  position: fixed;
  top: 0;
  z-index: 10;

  width: 100%;
  height: 64px;

  display: flex;
  align-items: center;

  padding: var(--i-regular) var(--i-large);

  background-color: var(--c-primary);
  box-shadow: var(--s-light);
`;

const LogoLink = styled(Link)`
  max-height: 3rem;

  display: flex;
  align-items: center;

  margin-right: auto;

  &:after {
    content: none;
  }
`;

const LogoImage = styled.img`
  width: 1.5rem;

  margin-right: var(--i-regular);
`;

const LogoText = styled.span`
  display: none;

  ${Mixin.Screen.md(css`
    display: inherit;

    ${Mixin.Font.h3()};

    line-height: 1;

    color: var(--c-darkest);
    user-select: none;
  `)}
`;

const Nav = styled.nav`
  a {
    margin: 0 var(--i-regular);

    color: currentColor;
  }
`;

const OpenDrawerButtonAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    z-index: 801;
    opacity: 0;
  }

  100% {
    z-index: 801;
    opacity: 1;
  }
`;

const CloseDrawerButtonAnimation = keyframes`
  0% {
    opacity: 0;
  }

  50% {
    z-index: 1;
    opacity: 0;
  }

  100% {
    z-index: 1;
    opacity: 1;
  }
`;

const DrawerButton = styled.button<{ drawerIsOpen: boolean }>(
  ({ drawerIsOpen }) => css`
    --delay: calc(var(--transition) * 2);

    width: 2rem;
    height: 22px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-left: var(--i-large);

    border: none;

    background-image: linear-gradient(
      to bottom,
      var(--c-primary) calc(50% - 1px),
      var(--c-darkest) calc(50% - 1px),
      var(--c-darkest) calc(50% + 1px),
      var(--c-primary) calc(50% + 1px)
    );
    background-repeat: no-repeat;
    background-position-x: 0;

    animation-name: ${CloseDrawerButtonAnimation};
    animation-duration: calc(var(--delay) * 2);
    animation-fill-mode: both;

    transition: calc(var(--transition) / 2);
    transition-delay: calc(var(--delay) * 2);

    &:before,
    &:after {
      content: '';
      width: 32px;
      height: 2px;

      background-color: var(--c-darkest);

      transform-origin: right center;

      transition: calc(var(--transition) / 2);
      transition-delay: calc(var(--delay) * 2);
    }

    ${drawerIsOpen
      ? css`
          background-position-x: 32px;
          animation-name: ${OpenDrawerButtonAnimation};
          animation-duration: var(--delay);
          animation-fill-mode: forwards;

          transition-delay: var(--delay);

          &:before,
          &:after {
            transition-delay: var(--delay);
          }

          &:before {
            transform: rotate(-45deg) scale(0.89);
          }

          &:after {
            transform: rotate(45deg) scale(0.89);
          }
        `
      : ''};
  `
);

const Main = styled.main<{ isDocPage: boolean }>(
  ({ isDocPage }) => css`
    min-height: 100%;

    display: flex;
    flex-grow: 1;

    ${isDocPage
      ? Mixin.Screen.md(css`
          width: calc(100vw - ${asideWidth});
          margin-left: auto;
        `)
      : ''}
  `
);

const Footer = styled.footer`
  padding: var(--i-small) 0;
  text-align: center;

  ${Mixin.Font.bodySmall()};

  background-color: var(--c-light);
`;

export default {
  Layout,
  Header,
  LogoLink,
  LogoImage,
  LogoText,
  Nav,
  DrawerButton,
  Main,
  Footer,
};
