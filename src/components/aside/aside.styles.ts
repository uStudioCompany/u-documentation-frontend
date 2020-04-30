import styled from 'styled-components';
import Flex from 'ustudio-ui/components/Flex';

const Aside = styled(Flex)`
  z-index: var(--l-top);
  overflow-y: scroll;
  padding: var(--i-regular);
  background-color: var(--c-lightest);
  color: var(--c-darkest);
  border-right: 1px solid var(--c-light);
  border-radius: 0;
  width: auto;
  min-height: 100%;
  max-width: 30%;
`;

const NavItem = styled.div`
  padding: var(--i-medium) 0;
`;

export default { Aside, NavItem };
